# Scholarship Tracker - Two-Way Git Sync Server

Automatically sync scholarship changes from the web app back to your Git repository.

## 🎯 What This Does

When you edit, add, or delete scholarships in the web app, the changes are automatically:
1. Saved to localStorage (instant)
2. Sent to this sync server
3. Written to the CSV file
4. Committed to Git
5. Pushed to GitHub

**Result**: Your web edits are automatically saved to GitHub!

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies

Open terminal in this directory (`sync-server/`) and run:

```bash
npm install
```

### Step 2: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Generate a secure secret token:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. Edit `.env` file with your values:
   ```
   PORT=3000
   SYNC_SECRET=<paste-your-generated-token-here>
   REPO_PATH=C:\Users\Ymarquez\Documents\GitHub\UniversityAdvisor
   ALLOWED_ORIGINS=https://ymarquezla.github.io
   ```

### Step 3: Start the Server

**Option A - Local Development:**
```bash
npm start
```

**Option B - Keep Running in Background (Windows):**
```bash
npm install -g pm2
pm2 start server.js --name scholarship-sync
pm2 save
```

**Option C - Keep Running in Background (Mac/Linux):**
```bash
nohup npm start > sync-server.log 2>&1 &
```

### Step 4: Configure the Web App

1. Open the web app: `scholarship-tracker-with-sync.html`
2. Press **Ctrl+,** (or wait for settings modal to auto-open)
3. Enter:
   - **Sync Server URL**: `http://localhost:3000`
   - **Secret Token**: (paste the token from your `.env` file)
4. Click **Save Settings**

### Step 5: Test It!

1. In the web app, edit a scholarship status
2. You should see "Syncing..." then "Synced" in the top-right corner
3. Check your Git repository - there should be a new commit!

---

## 🔒 Security

- **Token Authentication**: Every request requires the secret token
- **CORS Protection**: Only allowed origins can access the API
- **Local Network**: By default, server runs on `localhost` (not exposed to internet)

### Important Security Notes:

1. **NEVER commit your `.env` file** (it's in `.gitignore`)
2. **Change the default token** before deploying
3. **Use HTTPS** if deploying to a public server (see deployment options below)

---

## 🌐 Deployment Options

### Option 1: Run Locally (Recommended for Personal Use)

**Pros:**
- ✅ Most secure (server never exposed to internet)
- ✅ Free
- ✅ No setup complexity

**Cons:**
- ❌ Computer must be running for sync to work
- ❌ Can only sync from same computer (or local network)

**Best for**: Personal use when editing from home computer

---

### Option 2: Deploy to Cloud (For Remote Access)

If you want to edit from multiple devices (phone, laptop, etc.), deploy to a cloud service:

#### Option 2A: Railway.app (Free Tier)

1. Sign up at https://railway.app
2. Create new project → Deploy from GitHub
3. Select this repository
4. Set environment variables in Railway dashboard:
   - `SYNC_SECRET`
   - `REPO_PATH` = `/app` (Railway default)
   - `ALLOWED_ORIGINS` = `https://ymarquezla.github.io`
5. Railway will provide a public URL (e.g., `https://your-app.railway.app`)
6. Update web app settings with Railway URL

#### Option 2B: Render.com (Free Tier)

1. Sign up at https://render.com
2. New → Web Service → Connect Repository
3. Set environment variables
4. Deploy
5. Update web app with Render URL

#### Option 2C: Heroku (Paid - $7/month)

1. Create Heroku app
2. Set environment variables
3. Deploy via Git
4. Update web app with Heroku URL

---

## 📡 API Endpoints

### `GET /health`
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "version": "1.0",
  "message": "Scholarship Tracker Sync Server"
}
```

### `POST /sync`
Sync scholarships to Git

**Headers:**
- `Authorization: Bearer YOUR_SECRET_TOKEN`

**Body:**
```json
{
  "scholarships": [...],
  "message": "Optional commit message"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Scholarships synced to Git",
  "count": 31,
  "timestamp": "2024-12-27T10:30:00.000Z"
}
```

### `GET /scholarships`
Fetch current scholarships from Git

**Headers:**
- `Authorization: Bearer YOUR_SECRET_TOKEN`

**Response:**
```json
{
  "success": true,
  "scholarships": [...],
  "count": 31,
  "timestamp": "2024-12-27T10:30:00.000Z"
}
```

---

## 🐛 Troubleshooting

### "Unauthorized" Error
- Check that your secret token matches between `.env` and web app settings
- Token is case-sensitive

### "Failed to sync to Git"
- Ensure Git is installed: `git --version`
- Ensure you're logged into Git: `git config user.name`
- Check that REPO_PATH is correct in `.env`
- Make sure you have write access to the repository

### Sync Status Shows "Not Configured"
- Press **Ctrl+,** to open settings
- Enter server URL and token
- Click Save Settings

### Server Won't Start
- Check that port 3000 is available: `netstat -ano | findstr :3000` (Windows) or `lsof -i :3000` (Mac/Linux)
- Change PORT in `.env` if needed

### CORS Errors in Browser Console
- Add your domain to ALLOWED_ORIGINS in `.env`
- Restart the server after changing `.env`

---

## 🔄 How Auto-Sync Works

```
Web App Edit → localStorage → HTTP POST → Sync Server → CSV File → Git Commit → GitHub Push
     ↓                                                                              ↑
 Instant Save                                                            Synced to Cloud
```

**Timeline:**
- **0ms**: Change saved to localStorage (instant)
- **~500ms**: HTTP request sent to server
- **~2s**: Git commit and push complete
- **✅ Done**: Change is in GitHub!

---

## 📊 Monitoring

### View Sync Server Logs

**If using pm2:**
```bash
pm2 logs scholarship-sync
```

**If running directly:**
Check the terminal where you ran `npm start`

### Check Git History

```bash
cd ../../..
git log --oneline -10
```

You should see commits like:
```
abc1234 Update scholarships from web app
```

---

## 🔧 Advanced Configuration

### Custom Commit Message Format

Edit `server.js` line 80 to customize commit messages:

```javascript
const commitMessage = `Update: ${scholarships.length} scholarships

Changes made via web app on ${new Date().toLocaleDateString()}`;
```

### Auto-Pull Before Sync

Add this to prevent conflicts (edit `server.js`):

```javascript
// Before writing CSV
await gitCommand('git pull origin main --rebase');
```

### Sync to Different Branch

Change `server.js` line 85:

```javascript
await gitCommand('git push origin your-branch-name');
```

---

## 🎓 For Sophia

Once set up, you can:
- ✅ Edit scholarships from your phone/laptop
- ✅ Changes automatically save to GitHub
- ✅ Share the GitHub link with counselors/parents
- ✅ No manual CSV imports needed
- ✅ Full edit history in Git

---

## 📝 Development

**File Structure:**
```
sync-server/
├── server.js                          # Main server code
├── package.json                       # Dependencies
├── .env                               # Your secrets (not committed)
├── .env.example                       # Example configuration
├── README.md                          # This file
└── scholarship-tracker-with-sync.html # Web app with sync enabled
```

**Test the API:**
```bash
# Health check
curl http://localhost:3000/health

# Sync (with auth)
curl -X POST http://localhost:3000/sync \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"scholarships": [...], "message": "Test sync"}'
```

---

## 🆘 Support

If you encounter issues:

1. Check logs: `pm2 logs` or terminal output
2. Verify `.env` configuration
3. Test API with curl (see above)
4. Check Git status: `git status` in repository
5. Ensure GitHub authentication is working: `git push` manually

---

**Version**: 1.0
**Created**: December 27, 2024
**License**: MIT
