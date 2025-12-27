# Google Sheets Integration for Scholarship Tracker

Two methods to update the scholarship tracker directly from Claude without manual CSV imports.

---

## Method 1: Python + Google Sheets API (Local)

**Best for:** Direct control, running locally, batch updates

**Features:**
- ✅ Read current scholarship data
- ✅ Add new scholarships
- ✅ Update deadlines, amounts, status
- ✅ Generate reports
- ✅ Full CRUD operations

**Setup time:** 10-15 minutes

---

## Method 2: Google Apps Script Webhook (Cloud)

**Best for:** Simple updates, no local setup, web-based

**Features:**
- ✅ HTTP endpoint for updates
- ✅ Runs in Google's cloud
- ✅ No API keys needed locally
- ✅ Easy to trigger from anywhere

**Setup time:** 5-10 minutes

---

## Quick Start

### For Method 1 (Python API):
1. Follow [python-api-setup.md](./python-api-setup.md)
2. Run `python scholarship_updater.py`
3. Use the provided functions to update your sheet

### For Method 2 (Apps Script Webhook):
1. Follow [apps-script-setup.md](./apps-script-setup.md)
2. Deploy the web app
3. Send HTTP requests to update the sheet

---

## Which Should I Use?

| Feature | Python API | Apps Script |
|---------|------------|-------------|
| Setup complexity | Medium | Easy |
| Requires local code | Yes | No |
| Claude can trigger | Via Python script | Via HTTP/webhook |
| Batch operations | Excellent | Good |
| Real-time updates | Yes | Yes |
| Offline access | Yes | No |
| Cost | Free | Free |

**Recommendation:** Start with **Apps Script** (easier), then add **Python API** if you need advanced features.

---

## Files in This Folder

```
google-sheets-integration/
├── README.md (this file)
├── python-api-setup.md (Python setup guide)
├── apps-script-setup.md (Apps Script setup guide)
├── scholarship_updater.py (Python script)
├── google_apps_script.js (Apps Script code)
├── requirements.txt (Python dependencies)
└── config.example.json (Configuration template)
```

---

## Support

Questions? Check the detailed setup guides or open an issue in the repository.
