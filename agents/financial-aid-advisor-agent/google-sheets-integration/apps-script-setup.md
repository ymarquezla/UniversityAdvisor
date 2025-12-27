# Google Apps Script Webhook Setup Guide

**Set up a webhook to update your scholarship tracker from anywhere without manual imports.**

---

## Overview

This creates a web endpoint that accepts JSON data and updates your Google Sheet automatically.

**Advantages:**
- ✅ No local setup required
- ✅ No API keys to manage
- ✅ Works from any device
- ✅ Claude can trigger via HTTP requests
- ✅ Runs in Google's cloud (free)

---

## Step 1: Open Your Google Sheet

1. Go to your scholarship tracker Google Sheet
2. Make sure you've already imported the CSV (if not, do that first)
3. Note the sheet name (usually "Sheet1" or you can rename it to "Scholarships")

---

## Step 2: Open Apps Script Editor

1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete any existing code in the editor
3. You'll see a file called `Code.gs`

---

## Step 3: Copy the Apps Script Code

Copy the code from [google_apps_script.js](./google_apps_script.js) and paste it into the Apps Script editor.

**Or copy this code directly:**

```javascript
// Replace 'Sheet1' with your actual sheet name if different
const SHEET_NAME = 'Sheet1';

/**
 * Add a new scholarship to the tracker
 */
function addScholarship(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  const row = [
    data.deadline || 'TBD',
    data.name || '',
    data.amountMin || '',
    data.amountMax || '',
    data.priority || 'MEDIUM',
    data.status || 'Not Started',
    data.category || '',
    data.requirements || '',
    data.link || '',
    data.notes || ''
  ];

  sheet.appendRow(row);
  return { success: true, message: 'Scholarship added successfully' };
}

/**
 * Update scholarship status by name
 */
function updateStatus(scholarshipName, newStatus) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === scholarshipName) { // Column B = Scholarship Name
      sheet.getRange(i + 1, 6).setValue(newStatus); // Column F = Status
      return { success: true, message: `Updated ${scholarshipName} to ${newStatus}` };
    }
  }

  return { success: false, message: `Scholarship "${scholarshipName}" not found` };
}

/**
 * Get all scholarships with a specific status
 */
function getScholarshipsByStatus(status) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const scholarships = [];

  for (let i = 1; i < data.length; i++) {
    if (data[i][5] === status) { // Column F = Status
      scholarships.push({
        deadline: data[i][0],
        name: data[i][1],
        amountMin: data[i][2],
        amountMax: data[i][3],
        priority: data[i][4],
        status: data[i][5],
        category: data[i][6],
        requirements: data[i][7],
        link: data[i][8],
        notes: data[i][9]
      });
    }
  }

  return scholarships;
}

/**
 * Get upcoming deadlines (next 30 days)
 */
function getUpcomingDeadlines() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const upcoming = [];
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));

  for (let i = 1; i < data.length; i++) {
    const deadlineStr = data[i][0];
    if (deadlineStr && deadlineStr !== 'TBD') {
      const deadline = new Date(deadlineStr);
      if (deadline >= now && deadline <= thirtyDaysFromNow) {
        upcoming.push({
          deadline: deadlineStr,
          name: data[i][1],
          daysUntil: Math.ceil((deadline - now) / (1000 * 60 * 60 * 24)),
          priority: data[i][4],
          status: data[i][5]
        });
      }
    }
  }

  // Sort by deadline
  upcoming.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  return upcoming;
}

/**
 * Web app endpoint - handles POST requests
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    let result;

    switch(action) {
      case 'addScholarship':
        result = addScholarship(data.scholarship);
        break;

      case 'updateStatus':
        result = updateStatus(data.scholarshipName, data.newStatus);
        break;

      case 'getByStatus':
        result = { success: true, data: getScholarshipsByStatus(data.status) };
        break;

      case 'getUpcoming':
        result = { success: true, data: getUpcomingDeadlines() };
        break;

      default:
        result = { success: false, message: 'Unknown action' };
    }

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Web app endpoint - handles GET requests
 */
function doGet(e) {
  const action = e.parameter.action;

  let result;

  switch(action) {
    case 'getUpcoming':
      result = { success: true, data: getUpcomingDeadlines() };
      break;

    case 'getByStatus':
      result = { success: true, data: getScholarshipsByStatus(e.parameter.status || 'Not Started') };
      break;

    default:
      result = {
        success: true,
        message: 'Scholarship Tracker API',
        endpoints: {
          'POST /': 'Main endpoint for actions',
          'GET /?action=getUpcoming': 'Get upcoming deadlines',
          'GET /?action=getByStatus&status=Applied': 'Get scholarships by status'
        }
      };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## Step 4: Update Sheet Name (if needed)

At the top of the code, update this line if your sheet has a different name:

```javascript
const SHEET_NAME = 'Sheet1'; // Change to your sheet name
```

---

## Step 5: Deploy the Web App

1. Click the **Deploy** button (top right) → **New deployment**
2. Click the gear icon ⚙️ → Select **Web app**
3. Fill in the deployment settings:
   - **Description:** "Scholarship Tracker API"
   - **Execute as:** Me ([your email])
   - **Who has access:** Anyone (or "Anyone with the link" for privacy)
4. Click **Deploy**
5. **Authorize** the script (Google will ask for permissions)
   - Click "Review Permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to [Project Name] (unsafe)"
   - Click "Allow"
6. **Copy the Web App URL** that appears (looks like: `https://script.google.com/macros/s/XXXXX/exec`)

**IMPORTANT:** Save this URL! You'll need it to send updates.

---

## Step 6: Test the Webhook

### Test in Browser (GET request):

Open this URL in your browser:
```
https://script.google.com/macros/s/YOUR_WEB_APP_ID/exec?action=getUpcoming
```

You should see JSON response with upcoming deadlines!

### Test with curl (POST request):

```bash
curl -X POST \
  https://script.google.com/macros/s/YOUR_WEB_APP_ID/exec \
  -H 'Content-Type: application/json' \
  -d '{
    "action": "addScholarship",
    "scholarship": {
      "deadline": "2025-05-15",
      "name": "Test Scholarship",
      "amountMin": "$1000",
      "amountMax": "$5000",
      "priority": "LOW",
      "status": "Research Needed",
      "category": "Test",
      "requirements": "Test requirements",
      "link": "https://example.com",
      "notes": "This is a test"
    }
  }'
```

Check your Google Sheet - you should see a new row!

---

## Step 7: Use from Claude Code

Now Claude can update your sheet directly! Here are example commands:

### Add New Scholarship:

```python
import requests
import json

WEBHOOK_URL = "https://script.google.com/macros/s/YOUR_WEB_APP_ID/exec"

def add_scholarship(name, deadline, amount_min, amount_max, priority="MEDIUM"):
    payload = {
        "action": "addScholarship",
        "scholarship": {
            "deadline": deadline,
            "name": name,
            "amountMin": amount_min,
            "amountMax": amount_max,
            "priority": priority,
            "status": "Not Started",
            "category": "New",
            "requirements": "TBD",
            "link": "",
            "notes": ""
        }
    }

    response = requests.post(WEBHOOK_URL, json=payload)
    return response.json()

# Example usage
result = add_scholarship(
    name="New Women in Tech Scholarship",
    deadline="2025-06-30",
    amount_min="$2000",
    amount_max="$5000",
    priority="MEDIUM"
)
print(result)
```

### Update Scholarship Status:

```python
def update_scholarship_status(scholarship_name, new_status):
    payload = {
        "action": "updateStatus",
        "scholarshipName": scholarship_name,
        "newStatus": new_status
    }

    response = requests.post(WEBHOOK_URL, json=payload)
    return response.json()

# Example usage
result = update_scholarship_status("Society of Women Engineers (SWE)", "Applied")
print(result)
```

### Get Upcoming Deadlines:

```python
def get_upcoming_deadlines():
    response = requests.get(f"{WEBHOOK_URL}?action=getUpcoming")
    return response.json()

# Example usage
deadlines = get_upcoming_deadlines()
for scholarship in deadlines['data']:
    print(f"{scholarship['name']} - Due in {scholarship['daysUntil']} days")
```

### Get Scholarships by Status:

```python
def get_scholarships_by_status(status):
    response = requests.get(f"{WEBHOOK_URL}?action=getByStatus&status={status}")
    return response.json()

# Example usage
not_started = get_scholarships_by_status("Not Started")
print(f"Found {len(not_started['data'])} scholarships to apply to")
```

---

## Available Actions

### POST Actions:

| Action | Description | Parameters |
|--------|-------------|------------|
| `addScholarship` | Add new scholarship | `scholarship` object |
| `updateStatus` | Update scholarship status | `scholarshipName`, `newStatus` |
| `getByStatus` | Get scholarships by status | `status` |
| `getUpcoming` | Get upcoming deadlines | None |

### GET Actions:

| URL Parameter | Description |
|--------------|-------------|
| `?action=getUpcoming` | Get deadlines in next 30 days |
| `?action=getByStatus&status=Applied` | Get scholarships by status |

---

## Troubleshooting

**Q: "Authorization required" error?**
- Re-deploy the web app
- Make sure "Who has access" is set to "Anyone"

**Q: Changes not appearing in sheet?**
- Check the sheet name in the script matches your actual sheet
- Refresh your Google Sheet
- Check the script execution logs (View → Logs in Apps Script editor)

**Q: "Script timeout" error?**
- Your sheet might be too large
- Try reducing the number of rows or optimizing the script

**Q: How do I update the script?**
- Edit the code in Apps Script editor
- Click **Deploy → Manage deployments**
- Click the pencil icon ✏️ to edit
- Change "Version" to "New version"
- Click **Deploy**

---

## Security Notes

- ✅ The webhook URL is secret - don't share it publicly
- ✅ Consider using "Anyone with the link" instead of "Anyone" for better privacy
- ✅ You can add authentication if needed (see advanced setup)

---

## Next Steps

1. ✅ Save your webhook URL in a secure place
2. ✅ Test all the actions to make sure they work
3. ✅ Create helper functions in Python (or other languages)
4. ✅ Integrate with Claude Code for automatic updates

---

**You're all set! Your scholarship tracker can now be updated from anywhere without manual CSV imports!** 🎉
