# 🔘 Button Guide - What Each Button Does

## Quick Reference

```
┌──────────────────────────────────────────────────────────────┐
│  Scholarship Tracker Buttons                                 │
└──────────────────────────────────────────────────────────────┘

🔄 Sync to Git      Push your local edits TO GitHub
⬇️ Pull from Git    Pull latest changes FROM GitHub
📥 Export           Download as CSV file
+ (green circle)    Add new scholarship
```

---

## Button Comparison

### 🔄 Sync to Git (Push)

**What it does:**
- Takes your LOCAL data (what's in your browser)
- Sends it TO the sync server
- Commits and pushes TO GitHub

**Direction:** You → GitHub

**Use when:**
- You edited scholarships and want to save to GitHub immediately
- Usually happens automatically, but you can force it manually

**Example:**
```
You have: 31 scholarships (edited 3 today)
GitHub has: 31 scholarships (old data)

Click "Sync to Git" →

GitHub now has: 31 scholarships (with your 3 edits)
```

---

### ⬇️ Pull from Git (NEW!)

**What it does:**
- Fetches LATEST data FROM GitHub
- Runs `git pull` on the server
- Replaces your LOCAL data with GitHub's data

**Direction:** GitHub → You

**Use when:**
- Someone else updated the CSV in GitHub
- You want to get their changes
- You want to "reset" to what's in GitHub
- You're on a different device and want to sync down

**Example:**
```
You have: 31 scholarships (local edits)
GitHub has: 35 scholarships (teammate added 4)

Click "Pull from Git" → Confirms first! →

You now have: 35 scholarships (includes teammate's 4)
⚠️ Your local-only edits are REPLACED
```

**Important:** Asks for confirmation before replacing your data!

---

## Visual Flow

### Sync to Git Flow (Upload ⬆️)

```
┌─────────────────┐
│   Your Browser  │
│                 │
│ 31 scholarships │
│ (edited SWE to  │
│  "Applied")     │
└────────┬────────┘
         │
         │ Click "🔄 Sync to Git"
         ▼
┌─────────────────┐
│  Sync Server    │
│                 │
│ Receives data   │
│ Writes CSV      │
│ git add/commit  │
│ git push        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     GitHub      │
│                 │
│ New commit!     │
│ "Update from    │
│  web app"       │
└─────────────────┘
```

---

### Pull from Git Flow (Download ⬇️)

```
┌─────────────────┐
│     GitHub      │
│                 │
│ 35 scholarships │
│ (latest data)   │
└────────┬────────┘
         │
         │ Click "⬇️ Pull from Git"
         ▼
┌─────────────────┐
│  Sync Server    │
│                 │
│ git pull        │
│ Read CSV        │
│ Send JSON       │
└────────┬────────┘
         │
         │ Confirm? (Yes/No)
         ▼
┌─────────────────┐
│   Your Browser  │
│                 │
│ 35 scholarships │
│ (GitHub's data) │
└─────────────────┘
```

---

## Common Scenarios

### Scenario 1: Working Alone
**You:** Edit scholarship on laptop
**Action:** Auto-syncs (or click "🔄 Sync to Git")
**Result:** GitHub updated

**Later, on phone:**
**Action:** Click "⬇️ Pull from Git"
**Result:** Phone has laptop's edits

---

### Scenario 2: Multiple People
**Person A:** Adds 3 new scholarships
**Person A:** Clicks "🔄 Sync to Git"
**GitHub:** Now has 3 new scholarships

**Person B (you):** Has old data (missing the 3 new ones)
**You:** Click "⬇️ Pull from Git"
**You:** Now have all scholarships including Person A's 3

---

### Scenario 3: Made a Mistake
**You:** Deleted 10 scholarships by accident!
**You:** Don't click "Sync to Git" - that would save the deletion!
**You:** Instead, click "⬇️ Pull from Git"
**Result:** Restores the 10 scholarships from GitHub

---

### Scenario 4: Testing/Experimenting
**You:** Want to try different scholarship categorizations
**You:** Make experimental edits
**You:** Don't like the result
**You:** Click "⬇️ Pull from Git" to reset
**Result:** Back to original data

---

## When Auto-Sync Happens

The **🔄 Sync to Git** happens AUTOMATICALLY when you:
- ✅ Add a new scholarship
- ✅ Edit a scholarship
- ✅ Delete a scholarship
- ✅ Change a status via dropdown

You DON'T need to click it manually unless:
- Auto-sync failed (shows "Sync failed")
- You want to force an immediate sync

---

## Safety Features

### Pull from Git Confirmation

When you click "⬇️ Pull from Git", you see:

```
┌────────────────────────────────────────────────┐
│  Pull 35 scholarships from Git?                │
│                                                 │
│  ⚠️ This will REPLACE your current data with   │
│  what's in GitHub.                              │
│                                                 │
│  Current local: 31 scholarships                 │
│  GitHub has: 35 scholarships                    │
│                                                 │
│           [Cancel]    [OK]                      │
└────────────────────────────────────────────────┘
```

This prevents accidental data loss!

---

## Data Flow Summary

```
Your Edits
    ↓
localStorage (Instant save - always happens)
    ↓
Auto-sync (Background - 3 seconds)
    ↓
GitHub
    ↓
Pull from Git (When you need latest from GitHub)
    ↓
Your Browser (Replaces localStorage)
```

---

## Button States

### 🔄 Sync to Git

**Normal:**
```
[🔄 Sync to Git]  ← Clickable
```

**During sync:**
```
[⏳ Syncing...]  ← Disabled
```

**After sync:**
```
[🔄 Sync to Git]  ← Back to normal
                   Sync Status: "Synced ✅"
```

---

### ⬇️ Pull from Git

**Normal:**
```
[⬇️ Pull from Git]  ← Clickable, blue color
```

**During pull:**
```
[⏳ Pulling...]  ← Disabled
                  Sync Status: "Pulling from Git..."
```

**After pull (success):**
```
[⬇️ Pull from Git]  ← Back to normal
                     Sync Status: "Pulled 35 scholarships"
                     Alert: "✅ Successfully pulled..."
```

**After pull (cancelled):**
```
[⬇️ Pull from Git]  ← Back to normal
                     Sync Status: "Pull cancelled"
```

---

## Best Practices

### ✅ DO

- Click "⬇️ Pull from Git" when starting work on a new device
- Click "⬇️ Pull from Git" if you know someone else updated the data
- Let auto-sync handle pushing your changes (don't need to click "Sync")
- Click "🔄 Sync to Git" if sync failed and you want to retry

### ❌ DON'T

- Click "⬇️ Pull from Git" if you have unsaved edits you want to keep
- Click "🔄 Sync to Git" repeatedly - once is enough
- Ignore the confirmation when pulling - read it first!

---

## Troubleshooting

### Pull Button Shows "Sync not configured"

**Problem:** Server settings not configured

**Solution:**
1. Press `Ctrl+,`
2. Enter server URL and token
3. Click Save Settings
4. Try again

---

### Pull Fails with "Pull failed"

**Possible causes:**
- Server not running (`npm start`)
- Wrong token in settings
- Git error on server (check server logs)
- Network issue

**Solution:**
1. Check server is running
2. Verify settings (Ctrl+,)
3. Check server terminal for errors

---

### After Pull, Data Looks Wrong

**Problem:** You pulled old data by accident

**Solution:**
1. Click "⬇️ Pull from Git" again - make sure you're getting latest
2. Or click "🔄 Sync to Git" to push your correct data back up

---

## Summary

| Button | Direction | Speed | Confirmation | When to Use |
|--------|-----------|-------|--------------|-------------|
| 🔄 Sync to Git | You → GitHub | 3s | No | Save your edits to GitHub |
| ⬇️ Pull from Git | GitHub → You | 2s | Yes | Get latest from GitHub |
| 📥 Export | Browser → File | Instant | No | Download CSV backup |

---

**Key Difference:**
- **Sync** = "Save MY changes TO GitHub"
- **Pull** = "Get THEIR changes FROM GitHub"

Both work together to keep everything synchronized! 🔄

---

**Version**: 3.2
**Updated**: December 27, 2024
