# 🔧 Git Sync Setup Guide

## Current Status
✅ Sync server is running on port 3000
❌ Web app needs to be configured with authentication token

## Quick Setup (2 steps)

### Step 1: Open Settings in the Web App

**Option A - Keyboard Shortcut (Fastest):**
- Press **Ctrl+,** (or **Cmd+,** on Mac)

**Option B - Look for Settings Button:**
- Look for a ⚙️ icon or "Settings" button in the scholarship tracker interface
- Usually located in the top-right corner or header area

### Step 2: Enter Configuration

When the settings modal opens, enter these values **exactly**:

**Server URL:**
```
http://localhost:3000
```

**Sync Token:**
```
795dd2a87579337c0c181f67994775dca0512941a15be80c188906e101b4117a
```

Then click **Save Settings**.

---

## Testing the Sync

After saving settings:

1. Click the **🔄 Sync to Git** button
2. Watch the sync status indicator (top-right corner)
3. It should change: "Not configured" → "Syncing..." → "Synced ✅"

---

## Troubleshooting

### Still getting "401 Unauthorized"?

1. **Check token was copied correctly** - Make sure there are no extra spaces
2. **Check server is running** - Look for the terminal window running `npm start`
3. **Refresh the page** - Sometimes settings need a page refresh to take effect
4. **Check browser console** - Press F12 and look for error messages

### Sync button doesn't appear?

- Make sure you're using the file: `scholarship-tracker.html`
- Not the old version: `scholarship-tracker-old.html`

---

## What Happens After Sync Works?

Once configured, every time you:
- ✅ Add a scholarship → Auto-synced to Git in 3 seconds
- ✅ Edit a scholarship → Auto-synced to Git
- ✅ Delete a scholarship → Auto-synced to Git
- ✅ Change status → Auto-synced to Git

All changes automatically appear on GitHub!

---

**Need help?** The sync server is already running correctly. You just need to configure the web app with the token above.
