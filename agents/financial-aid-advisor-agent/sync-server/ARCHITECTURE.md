# Two-Way Git Sync Architecture

Visual guide to how the scholarship tracker sync system works.

## 📊 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER INTERFACE                              │
│                                                                 │
│  scholarship-tracker-with-sync.html                            │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  🎓 Sophia's Scholarship Tracker                        │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │   │
│  │  │ Total: 31│ │ High: 12 │ │ Applied: │ │ Due: 5   │  │   │
│  │  └──────────┘ └──────────┘ │    3     │ └──────────┘  │   │
│  │                             └──────────┘               │   │
│  │  ┌───────────────────────────────────────────────────┐ │   │
│  │  │ [SWE Scholarship] [Status: ▼ Applied] [Edit] [X] │ │   │
│  │  │ [Barrington Fund]  [Status: ▼ Started] [Edit] [X]│ │   │
│  │  └───────────────────────────────────────────────────┘ │   │
│  │                                                         │   │
│  │  🔄 Sync Status: Synced ✅                             │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                 │
│  localStorage (Instant Save)                                   │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ { scholarships: [...31 items...] }                     │   │
│  └────────────────────────────────────────────────────────┘   │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ HTTP POST /sync
                  │ Authorization: Bearer {token}
                  │ Body: { scholarships: [...] }
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SYNC SERVER                                 │
│                     (Node.js + Express)                         │
│                                                                 │
│  server.js - Port 3000                                         │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  1. Authenticate request (verify token)                │   │
│  │  2. Convert JSON to CSV format                         │   │
│  │  3. Write to CSV file                                  │   │
│  │  4. Git add → commit → push                            │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Environment (.env)                                            │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ SYNC_SECRET=abc123...                                  │   │
│  │ REPO_PATH=/path/to/repo                                │   │
│  │ ALLOWED_ORIGINS=https://...                            │   │
│  └────────────────────────────────────────────────────────┘   │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ Git Commands
                  │ git add scholarship-deadline-calendar.csv
                  │ git commit -m "Update scholarships..."
                  │ git push origin main
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                     GIT REPOSITORY                              │
│                     (GitHub)                                    │
│                                                                 │
│  UniversityAdvisor/                                            │
│  └── agents/                                                   │
│      └── financial-aid-advisor-agent/                          │
│          └── scholarship-deadline-calendar.csv                 │
│              ┌──────────────────────────────────────────┐      │
│              │ Deadline,Name,Amount,...                 │      │
│              │ 2025-01-31,SWE,$1000,$15000,...         │      │
│              │ 2025-02-24,Barrington,$1000,$10000,...  │      │
│              │ ...                                      │      │
│              └──────────────────────────────────────────┘      │
│                                                                 │
│  Commit History:                                               │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ 7bcd073 Update scholarships from web app               │   │
│  │ 1945fdd Add two-way Git sync server                    │   │
│  │ 919c42a Update scholarship tracker to v3.0             │   │
│  └────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow - Edit a Scholarship

### Timeline of Events:

```
Time    Action                          Location              State
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0ms     User clicks status dropdown     Browser
        and selects "Applied"

10ms    updateStatusInline() called     JavaScript
        scholarships[5].status = 'Applied'

15ms    saveToStorage() writes to       localStorage          ✅ SAVED LOCALLY
        localStorage                                          (INSTANT)

20ms    syncToGit() triggered           JavaScript
        automatically

50ms    HTTP POST to /sync              Network               🔄 SYNCING...

100ms   Server receives request         Sync Server
        Validates token

150ms   Server writes CSV               File System
        scholarship-deadline-calendar.csv

500ms   Git add command                 Git
        Stages CSV file

1000ms  Git commit command              Git
        Creates commit with message

2000ms  Git push command                Git
        Pushes to GitHub

3000ms  HTTP 200 response               Network               ✅ SYNCED!

3010ms  UI updates sync status          Browser
        "Synced (31 scholarships)"
```

**Total time: ~3 seconds from edit to GitHub**

**Key point**: Data is saved locally instantly (15ms), so there's no delay in the UI. Git sync happens in the background.

---

## 🔒 Security Layers

```
┌──────────────────────────────────────────────────────────────┐
│                    Security Layers                           │
└──────────────────────────────────────────────────────────────┘

Layer 1: CORS (Cross-Origin Resource Sharing)
┌────────────────────────────────────────────────────────────┐
│ Only requests from allowed domains can access the API     │
│ ✅ https://ymarquezla.github.io                           │
│ ✅ http://localhost:8000                                  │
│ ❌ https://evil-site.com                                  │
└────────────────────────────────────────────────────────────┘
                          │
                          ▼
Layer 2: Token Authentication
┌────────────────────────────────────────────────────────────┐
│ Every request must include:                               │
│ Authorization: Bearer {64-char-random-token}              │
│ ❌ Missing token → 401 Unauthorized                       │
│ ❌ Wrong token → 401 Unauthorized                         │
│ ✅ Correct token → Request processed                      │
└────────────────────────────────────────────────────────────┘
                          │
                          ▼
Layer 3: Environment Variables
┌────────────────────────────────────────────────────────────┐
│ Secrets stored in .env (NOT committed to Git)             │
│ SYNC_SECRET={secret}                                      │
│ .gitignore prevents accidental commits                    │
└────────────────────────────────────────────────────────────┘
                          │
                          ▼
Layer 4: Local Network (Optional)
┌────────────────────────────────────────────────────────────┐
│ Server runs on localhost by default                       │
│ Not exposed to internet                                   │
│ Only accessible from same computer                        │
└────────────────────────────────────────────────────────────┘
```

---

## 📡 API Endpoints Detail

### POST /sync

**Purpose**: Sync scholarship data to Git

```
Request:
POST http://localhost:3000/sync
Headers:
  Content-Type: application/json
  Authorization: Bearer abc123xyz789...

Body:
{
  "scholarships": [
    {
      "deadline": "2025-01-31",
      "name": "Society of Women Engineers",
      "amountMin": "$1,000",
      "amountMax": "$15,000",
      "priority": "HIGH",
      "status": "Applied",
      "category": "Women in STEM",
      "requirements": "Transcripts, Resume, Essays",
      "link": "https://swe.org/apply-for-a-swe-scholarship/",
      "notes": "330+ scholarships!"
    },
    // ...30 more scholarships
  ],
  "message": "Updated SWE status to Applied"
}

Response (Success):
{
  "success": true,
  "message": "Scholarships synced to Git",
  "count": 31,
  "timestamp": "2024-12-27T15:30:00.000Z"
}

Response (Error):
{
  "success": false,
  "error": "Unauthorized - Invalid token"
}
```

**Server Actions:**
1. Validate token ✓
2. Convert JSON to CSV ✓
3. Write CSV file ✓
4. `git add` ✓
5. `git commit` ✓
6. `git push` ✓
7. Return success ✓

---

### GET /scholarships

**Purpose**: Fetch current scholarship data from Git

```
Request:
GET http://localhost:3000/scholarships
Headers:
  Authorization: Bearer abc123xyz789...

Response:
{
  "success": true,
  "scholarships": [...31 items...],
  "count": 31,
  "timestamp": "2024-12-27T15:30:00.000Z"
}
```

**Server Actions:**
1. Validate token ✓
2. `git pull origin main` ✓
3. Read CSV file ✓
4. Parse CSV to JSON ✓
5. Return scholarships ✓

---

### GET /health

**Purpose**: Check if server is running

```
Request:
GET http://localhost:3000/health

Response:
{
  "status": "ok",
  "version": "1.0",
  "message": "Scholarship Tracker Sync Server"
}
```

**No authentication required** - Public health check

---

## 🗂️ File Structure

```
UniversityAdvisor/
│
├── agents/
│   └── financial-aid-advisor-agent/
│       │
│       ├── scholarship-tracker.html              # v3.0 (no sync)
│       ├── scholarship-deadline-calendar.csv     # Data file (synced)
│       │
│       └── sync-server/                          # ← Sync infrastructure
│           ├── server.js                         # Main server code
│           ├── package.json                      # Dependencies
│           ├── .env                              # Secrets (NOT in Git)
│           ├── .env.example                      # Template
│           │
│           ├── scholarship-tracker-with-sync.html # v3.1 (with sync)
│           │
│           ├── README.md                         # Full documentation
│           ├── QUICKSTART.md                     # 2-minute setup
│           ├── ARCHITECTURE.md                   # This file
│           │
│           ├── setup.bat                         # Windows setup
│           └── setup.sh                          # Mac/Linux setup
│
└── .gitignore                                    # Protects .env
```

---

## 🚀 Deployment Architectures

### Local Setup (Development/Personal Use)

```
┌────────────────────────────────────┐
│  Your Computer                     │
│  ┌──────────────┐  ┌────────────┐ │
│  │   Browser    │  │   Server   │ │
│  │              │  │            │ │
│  │ Web App      │──│ Node.js    │─┼──► GitHub
│  │ localhost:   │  │ :3000      │ │
│  │ 8000         │  │            │ │
│  └──────────────┘  └────────────┘ │
└────────────────────────────────────┘

Pros:
✅ Most secure (not exposed to internet)
✅ Free
✅ Simple setup

Cons:
❌ Computer must stay on
❌ Only accessible from this computer
```

---

### Cloud Setup (Remote Access)

```
┌────────────────┐         ┌──────────────────┐         ┌──────────┐
│  Your Phone    │         │  Cloud Server    │         │ GitHub   │
│  ┌──────────┐  │         │  ┌────────────┐  │         │          │
│  │ Browser  │──┼────────►│  │ Sync Server│──┼────────►│ Your     │
│  │          │  │ HTTPS   │  │ (Railway)  │  │ Git     │ Repo     │
│  └──────────┘  │         │  │ :443       │  │ Push    │          │
└────────────────┘         │  └────────────┘  │         └──────────┘
                           └──────────────────┘
         ▲
         │
         │
┌────────┴───────┐
│  Your Laptop   │
│  ┌──────────┐  │
│  │ Browser  │──┘
│  │          │
│  └──────────┘
└────────────────┘

Pros:
✅ Access from anywhere
✅ Multiple devices
✅ Always available

Cons:
❌ Requires cloud hosting
❌ More complex setup
```

**Recommended Cloud Providers:**
- **Railway.app** - Free tier, easy setup, GitHub integration
- **Render.com** - Free tier, simple deployment
- **Heroku** - $7/month, reliable, well-documented

---

## 🔧 Technology Stack

```
Frontend:
┌─────────────────────────────────────┐
│ HTML5 + CSS3 + Vanilla JavaScript   │
│ - No frameworks required            │
│ - localStorage for local data       │
│ - Fetch API for HTTP requests       │
└─────────────────────────────────────┘

Backend:
┌─────────────────────────────────────┐
│ Node.js v18+                        │
│ └─ Express.js (web framework)       │
│ └─ cors (CORS middleware)           │
│ └─ child_process (Git commands)     │
│ └─ crypto (token generation)        │
└─────────────────────────────────────┘

Version Control:
┌─────────────────────────────────────┐
│ Git (local repository)              │
│ └─ GitHub (remote hosting)          │
└─────────────────────────────────────┘

Data Storage:
┌─────────────────────────────────────┐
│ Browser: localStorage (JSON)        │
│ Server:  CSV file                   │
│ Git:     CSV file history           │
└─────────────────────────────────────┘
```

---

## 💡 Design Decisions

### Why CSV instead of Database?

**Chosen**: CSV file in Git
**Alternative**: PostgreSQL/MongoDB database

**Reasoning**:
- ✅ Human-readable in GitHub
- ✅ Full version history via Git
- ✅ Easy to edit manually
- ✅ No database setup needed
- ✅ Portable (just a file)
- ✅ Works with existing scholarship-tracker.html

---

### Why Node.js instead of Python?

**Chosen**: Node.js + Express
**Alternative**: Python + Flask

**Reasoning**:
- ✅ Same language as frontend (JavaScript)
- ✅ npm ecosystem for easy deployment
- ✅ Express is minimal and fast
- ✅ Better cloud hosting support
- ✅ Async operations natural in Node.js

---

### Why localStorage instead of Database?

**Chosen**: Browser localStorage
**Alternative**: PostgreSQL/MySQL

**Reasoning**:
- ✅ Works offline
- ✅ Instant saves (no network latency)
- ✅ No database setup
- ✅ Privacy (data stays on device)
- ✅ Simple implementation

---

### Why Token Auth instead of OAuth?

**Chosen**: Simple Bearer token
**Alternative**: OAuth 2.0 / JWT

**Reasoning**:
- ✅ Simple setup (one token)
- ✅ No user accounts needed
- ✅ Single user (Sophia) use case
- ✅ Easy to revoke (just change token)
- ❌ Less secure for multi-user (but not needed here)

---

## 🎯 Future Enhancements

Possible improvements for the future:

1. **Real-time Collaboration**
   - WebSockets for live sync between devices
   - See changes from other devices instantly

2. **Conflict Resolution**
   - Handle edits from multiple devices
   - Merge strategies for concurrent changes

3. **Backup/Restore**
   - Auto-backup before sync
   - Rollback to previous versions

4. **Mobile App**
   - Native iOS/Android app
   - Push notifications for deadlines

5. **Advanced Analytics**
   - Success rate tracking
   - Amount won vs. applied
   - Time spent per scholarship

---

**Last Updated**: December 27, 2024
**Version**: 1.0
