# Google Apps Script Webhook - Step-by-Step Setup

Follow these steps exactly to set up your scholarship tracker webhook in 5 minutes.

---

## ✅ STEP 1: Open Your Google Sheet

1. Go to your scholarship tracker Google Sheet
2. Make sure your sheet has these column headers in Row 1:
   - **A:** Deadline Date
   - **B:** Scholarship Name
   - **C:** Amount Min
   - **D:** Amount Max
   - **E:** Priority
   - **F:** Status
   - **G:** Category
   - **H:** Requirements
   - **I:** Application Link
   - **J:** Notes

3. Note your sheet tab name (usually "Sheet1")

---

## ✅ STEP 2: Open Apps Script Editor

1. In your Google Sheet menu, click: **Extensions → Apps Script**
2. A new tab opens with the Apps Script editor
3. You'll see some default code - we'll replace this

---

## ✅ STEP 3: Copy the Webhook Code

1. **Delete all existing code** in the Apps Script editor
2. **Copy ALL the code** from the file below
3. **Paste it** into the Apps Script editor

**File to copy:** `google_apps_script.js`

Or copy from here: https://github.com/ymarquezla/UniversityAdvisor/blob/main/agents/financial-aid-advisor-agent/google-sheets-integration/google_apps_script.js

**Important:** If your sheet tab is NOT named "Sheet1", change line 5:
```javascript
const SHEET_NAME = 'Sheet1';  // ← Change 'Sheet1' to your actual tab name
```

---

## ✅ STEP 4: Save the Script

1. Click the **Save** icon (💾) or press `Ctrl+S` / `Cmd+S`
2. Name your project: **"Scholarship Tracker Webhook"**
3. Click **OK**

---

## ✅ STEP 5: Deploy as Web App

1. Click the **Deploy** button (top right) → **New deployment**
2. Click the **gear icon ⚙️** next to "Select type"
3. Choose **Web app**

**Configure the deployment:**

4. **Description:** "Scholarship Tracker API v1"
5. **Execute as:** Me (your email)
6. **Who has access:** Anyone ← **IMPORTANT! Must select "Anyone"**
7. Click **Deploy**

---

## ✅ STEP 6: Authorize the Script

1. A permission dialog appears
2. Click **Authorize access**
3. Choose your Google account
4. Google warns: "This app isn't verified"
   - Click **Advanced**
   - Click **Go to Scholarship Tracker Webhook (unsafe)** ← It's safe, it's YOUR script!
5. Click **Allow**

---

## ✅ STEP 7: Copy Your Webhook URL

1. After authorization, a **"Deployment"** dialog appears
2. **COPY THE WEBHOOK URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycby...long-string.../exec
   ```
3. Click **Done**

**⚠️ SAVE THIS URL! You'll need it in the next step.**

---

## ✅ STEP 8: Test the Webhook

### Test with Browser (Quick Test):

1. Paste your webhook URL into a browser
2. You should see JSON response:
   ```json
   {
     "success": true,
     "message": "Scholarship Tracker API v1.0",
     "endpoints": { ... }
   }
   ```

If you see this, **your webhook is working!** 🎉

---

## ✅ STEP 9: Configure Python Script

Now let's add the Barrington scholarships using Python:

1. Open this file: `add_barrington_scholarships.py`
2. Find line 9:
   ```python
   WEBHOOK_URL = "YOUR_WEBHOOK_URL_HERE"
   ```
3. Replace `"YOUR_WEBHOOK_URL_HERE"` with your actual webhook URL:
   ```python
   WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby.../exec"
   ```
4. Save the file

---

## ✅ STEP 10: Run the Script to Add Barrington Scholarships

Open your terminal/command prompt and run:

```bash
cd agents/financial-aid-advisor-agent/google-sheets-integration
python add_barrington_scholarships.py
```

You should see:
```
📝 Adding Barrington, RI scholarships to Google Sheets...

✅ Added: Community Scholarship Fund of Barrington
✅ Added: RI PBS & Public Radio Journalism Scholarship
✅ Added: Rhode Island Foundation Scholarships
✅ Added: Barrington Rotary Club Scholarship

✅ Done! Added 4 Barrington scholarships
```

---

## ✅ STEP 11: Verify in Google Sheets

1. Go back to your Google Sheet
2. Refresh the page
3. You should see **4 new rows** with the Barrington scholarships!
4. Sort by deadline to see the **Feb 24 deadline** at the top

---

## 🎯 YOU'RE DONE!

Your webhook is now set up and working! You can:

✅ Add scholarships via Python script
✅ Update statuses programmatically
✅ Query upcoming deadlines
✅ Get statistics

---

## 📝 Future Use

**To add more scholarships later:**

1. Edit `add_barrington_scholarships.py`
2. Add new scholarship data to the `barrington_scholarships` list
3. Run `python add_barrington_scholarships.py`

**Or create custom scripts** using the webhook URL:

```python
import requests

WEBHOOK_URL = "your_webhook_url_here"

# Add a scholarship
requests.post(WEBHOOK_URL, json={
    "action": "addScholarship",
    "scholarship": {
        "deadline": "2025-03-15",
        "name": "New Scholarship",
        "amountMin": "$1,000",
        "amountMax": "$5,000",
        "priority": "MEDIUM",
        "status": "Not Started",
        "category": "STEM",
        "requirements": "Essay, Transcript",
        "link": "https://example.com",
        "notes": "Cool scholarship"
    }
})

# Update status
requests.post(WEBHOOK_URL, json={
    "action": "updateStatus",
    "scholarshipName": "SWE Scholarship",
    "newStatus": "Applied"
})

# Get upcoming deadlines
response = requests.get(WEBHOOK_URL + "?action=getUpcoming")
print(response.json())
```

---

## ⚠️ Troubleshooting

### "Requested entity was not found" error:
- Check that your sheet tab name matches `SHEET_NAME` in the script
- Verify your sheet has the header row with all 10 columns

### "Authorization required" error:
- Go back to Step 6 and authorize the script
- Make sure you selected "Anyone" for "Who has access"

### Python script says "Please update WEBHOOK_URL":
- Make sure you updated line 9 with your actual webhook URL
- Don't forget the quotes around the URL

### Scholarships not appearing in sheet:
- Refresh the Google Sheet page
- Check the Apps Script execution log: View → Executions

---

## 🔒 Security Note

Your webhook URL is public, but:
- ✅ It only accesses YOUR specific Google Sheet
- ✅ Only you can modify the script
- ✅ You can revoke access anytime (Manage deployments → Archive)

For extra security, you can add a secret token to the script (see advanced setup in `apps-script-setup.md`).

---

**Need help? Check the detailed setup guide:** `apps-script-setup.md`

**Ready to add scholarships?** Continue to Step 9!

