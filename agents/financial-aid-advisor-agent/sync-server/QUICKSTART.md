# 🚀 Quick Start - 2 Minutes to Two-Way Sync

Get your scholarship tracker syncing to Git in 2 minutes!

## Windows Users

1. **Open terminal** in the `sync-server` folder
2. **Run setup**:
   ```bash
   setup.bat
   ```
3. **Copy the secret token** that appears
4. **Start server**:
   ```bash
   npm start
   ```
5. **Open** `scholarship-tracker-with-sync.html` in your browser
6. **Press Ctrl+,** to open settings
7. **Enter**:
   - Server URL: `http://localhost:3000`
   - Token: (paste the token from step 3)
8. **Click Save Settings**

**That's it!** Now every edit automatically syncs to Git! 🎉

---

## Mac/Linux Users

1. **Open terminal** in the `sync-server` folder
2. **Make setup executable**:
   ```bash
   chmod +x setup.sh
   ```
3. **Run setup**:
   ```bash
   ./setup.sh
   ```
4. **Copy the secret token** that appears
5. **Start server**:
   ```bash
   npm start
   ```
6. **Open** `scholarship-tracker-with-sync.html` in your browser
7. **Press Ctrl+,** to open settings
8. **Enter**:
   - Server URL: `http://localhost:3000`
   - Token: (paste the token from step 4)
9. **Click Save Settings**

**That's it!** Now every edit automatically syncs to Git! 🎉

---

## ✅ Verify It's Working

1. **Edit a scholarship** in the web app (change status to "Applied")
2. **Watch top-right corner** - should show "Syncing..." then "Synced"
3. **Check your Git repo**:
   ```bash
   git log -1
   ```
   You should see a new commit!

---

## 🎯 What Happens Now?

Every time you:
- ✅ Add a scholarship
- ✅ Edit a scholarship
- ✅ Delete a scholarship
- ✅ Change a status

The change is **automatically**:
1. Saved to localStorage (instant)
2. Committed to Git (2 seconds)
3. Pushed to GitHub (3 seconds)

**No more manual CSV imports!** 🎉

---

## 🔄 Keep Server Running

### Option 1: Manual (Simple)
Leave the terminal open with `npm start` running

### Option 2: Background (Recommended)

**Windows:**
```bash
npm install -g pm2-windows-startup
pm2-startup install
pm2 start server.js --name scholarship-sync
pm2 save
```

**Mac/Linux:**
```bash
npm install -g pm2
pm2 start server.js --name scholarship-sync
pm2 startup
pm2 save
```

Now the server runs automatically, even after reboot!

---

## 🌐 Access from Phone/Tablet

Want to edit scholarships from your phone? Deploy to the cloud!

**Easiest option - Railway.app (Free):**

1. Go to https://railway.app
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub"
4. Select UniversityAdvisor repo
5. Set root directory: `agents/financial-aid-advisor-agent/sync-server`
6. Add environment variables:
   - `SYNC_SECRET`: (your token)
   - `ALLOWED_ORIGINS`: `https://ymarquezla.github.io`
7. Deploy!

Railway gives you a URL like: `https://scholarship-sync.up.railway.app`

Update web app settings with this URL and you can edit from anywhere!

---

## 🆘 Troubleshooting

**Server won't start:**
- Make sure Node.js is installed: `node --version`
- Check port 3000 is available
- Try a different port in `.env`: `PORT=3001`

**"Unauthorized" error:**
- Token mismatch - check `.env` and web app settings match exactly

**"Sync failed" error:**
- Make sure Git is configured: `git config user.name`
- Check you're logged into GitHub: `git remote -v`

---

## 📖 Full Documentation

See [README.md](README.md) for:
- Detailed setup instructions
- Deployment options
- API documentation
- Advanced configuration
- Security best practices

---

**Created**: December 27, 2024
**Version**: 1.0
