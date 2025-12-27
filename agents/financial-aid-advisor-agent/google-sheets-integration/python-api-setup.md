# Python + Google Sheets API Setup Guide

**Set up direct Python integration with your Google Sheets scholarship tracker.**

---

## Overview

This method uses the official Google Sheets API to read and write data directly from Python.

**Advantages:**
- ✅ Full control over data
- ✅ Batch operations
- ✅ Offline capabilities
- ✅ Type-safe operations
- ✅ Can integrate with Claude Code

---

## Step 1: Enable Google Sheets API

1. Go to: https://console.cloud.google.com/
2. Create a new project (or select existing):
   - Click "Select a project" → "New Project"
   - Name it: "Scholarship Tracker"
   - Click "Create"

3. Enable Google Sheets API:
   - In the search bar, type "Google Sheets API"
   - Click "Google Sheets API"
   - Click **"Enable"**

4. Enable Google Drive API (also needed):
   - Search for "Google Drive API"
   - Click "Google Drive API"
   - Click **"Enable"**

---

## Step 2: Create Service Account Credentials

1. Go to **APIs & Services → Credentials**
2. Click **"Create Credentials"** → **"Service Account"**
3. Fill in details:
   - Service account name: `scholarship-tracker-bot`
   - Service account ID: (auto-generated)
   - Description: "Bot to update scholarship tracker"
4. Click **"Create and Continue"**
5. Skip the optional steps (click **"Continue"** → **"Done"**)

---

## Step 3: Create and Download JSON Key

1. Click on the service account you just created
2. Go to the **"Keys"** tab
3. Click **"Add Key"** → **"Create new key"**
4. Select **JSON** format
5. Click **"Create"**
6. A JSON file will download automatically

**IMPORTANT:**
- Rename the file to: `credentials.json`
- Move it to: `c:\Users\Ymarquez\Documents\GitHub\UniversityAdvisor\agents\financial-aid-advisor-agent\google-sheets-integration\`
- **DO NOT** commit this file to GitHub (it's in .gitignore)

---

## Step 4: Share Your Google Sheet with Service Account

1. Open the downloaded `credentials.json` file
2. Find the `client_email` field (looks like: `scholarship-tracker-bot@...iam.gserviceaccount.com`)
3. Copy that email address
4. Open your Google Sheet at: https://docs.google.com/spreadsheets/
5. Click the **"Share"** button
6. Paste the service account email
7. Give it **"Editor"** access
8. Uncheck "Notify people"
9. Click **"Share"**

---

## Step 5: Get Your Sheet ID

Your Google Sheet URL looks like:
```
https://docs.google.com/spreadsheets/d/1ABC123XYZ456-SHEET-ID-HERE/edit
```

The Sheet ID is the long string between `/d/` and `/edit`.

**Copy your Sheet ID** - you'll need it for the Python script.

---

## Step 6: Install Python Dependencies

Open a terminal in the `google-sheets-integration` folder and run:

```bash
pip install -r requirements.txt
```

Or install manually:
```bash
pip install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client
```

---

## Step 7: Configure the Python Script

1. Open `scholarship_updater.py`
2. Update these lines at the top:

```python
# UPDATE THESE VALUES
SPREADSHEET_ID = "YOUR_SHEET_ID_HERE"  # From Step 5
SHEET_NAME = "Sheet1"  # Or your sheet tab name
CREDENTIALS_FILE = "credentials.json"  # Path to your JSON file
```

---

## Step 8: Test the Integration

Run the test script:

```bash
python scholarship_updater.py
```

You should see:
```
✅ Successfully connected to Google Sheets!
Current scholarships: 26
```

---

## Step 9: Use the Functions

### Example Usage:

```python
from scholarship_updater import ScholarshipTracker

# Initialize
tracker = ScholarshipTracker()

# Add a new scholarship
tracker.add_scholarship(
    name="New AI Scholarship",
    deadline="2025-08-15",
    amount_min="$3000",
    amount_max="$8000",
    priority="HIGH",
    category="AI/Data Science",
    requirements="GPA 3.0+, AI major",
    link="https://example.com/scholarship",
    notes="Deadline is firm"
)

# Update status
tracker.update_status("Society of Women Engineers (SWE)", "Applied")

# Get upcoming deadlines
upcoming = tracker.get_upcoming_deadlines(days=30)
for scholarship in upcoming:
    print(f"{scholarship['name']} - Due in {scholarship['daysUntil']} days")

# Get scholarships by status
not_started = tracker.get_by_status("Not Started")
print(f"Scholarships to apply to: {len(not_started)}")

# Get statistics
stats = tracker.get_statistics()
print(f"Total: {stats['total']}")
print(f"Applied: {stats['byStatus'].get('Applied', 0)}")
print(f"Awarded: {stats['byStatus'].get('Awarded', 0)}")
```

---

## Available Functions

### Read Operations:

| Function | Description |
|----------|-------------|
| `get_all_scholarships()` | Get all scholarships as list of dicts |
| `get_by_status(status)` | Filter by status (Applied, Awarded, etc.) |
| `get_by_priority(priority)` | Filter by priority (HIGH, MEDIUM, LOW) |
| `get_upcoming_deadlines(days=30)` | Get deadlines in next X days |
| `get_statistics()` | Get summary statistics |

### Write Operations:

| Function | Description |
|----------|-------------|
| `add_scholarship(...)` | Add new scholarship row |
| `update_status(name, status)` | Update scholarship status |
| `update_scholarship(name, updates)` | Update any fields |
| `delete_scholarship(name)` | Remove scholarship (use carefully!) |

---

## Integration with Claude Code

Once setup is complete, Claude Code can run these commands directly:

```python
# In Claude Code
from scholarship_updater import ScholarshipTracker

tracker = ScholarshipTracker()

# Add scholarship found during research
tracker.add_scholarship(
    name="XYZ Foundation Scholarship",
    deadline="2025-09-01",
    amount_min="$5000",
    amount_max="$10000",
    priority="MEDIUM",
    category="Women in STEM",
    requirements="Female, STEM major, GPA 3.0+",
    link="https://xyzfoundation.org/scholarship",
    notes="Found via web search on 2024-12-27"
)

# Mark scholarship as applied
tracker.update_status("Benjamin Gilman Scholarship", "Applied")

# Check what's due soon
upcoming = tracker.get_upcoming_deadlines(days=7)
if upcoming:
    print(f"⚠️ {len(upcoming)} deadlines in next 7 days!")
    for s in upcoming:
        print(f"  - {s['name']}: {s['deadline']}")
```

---

## Troubleshooting

**Q: "credentials.json not found"**
- Make sure the file is in the correct directory
- Check the path in `CREDENTIALS_FILE` variable

**Q: "Permission denied" error**
- Make sure you shared the sheet with the service account email
- Give it Editor access, not just Viewer

**Q: "Sheet not found" error**
- Check your `SPREADSHEET_ID` is correct
- Check your `SHEET_NAME` matches the tab name exactly

**Q: "API not enabled" error**
- Go back to Google Cloud Console
- Enable both Google Sheets API and Google Drive API

**Q: How do I keep credentials secure?**
- Never commit `credentials.json` to Git
- It's already in `.gitignore`
- Store it securely on your local machine only

---

## Security Best Practices

1. ✅ Never share your `credentials.json` file
2. ✅ Don't commit credentials to GitHub
3. ✅ Use read-only access if only reading data
4. ✅ Rotate credentials periodically (create new key, delete old)
5. ✅ Limit service account permissions to only what's needed

---

## Next Steps

1. ✅ Test all functions to make sure they work
2. ✅ Create custom functions for your workflow
3. ✅ Integrate with Claude Code for automated updates
4. ✅ Set up scheduled tasks (e.g., daily deadline reminders)

---

**You're all set! Your scholarship tracker can now be updated programmatically from Python!** 🎉
