# How to Set Up Your Scholarship Tracker in Google Sheets

**Follow these steps to create a professional, interactive scholarship deadline calendar in Google Sheets**

---

## METHOD 1: Import the CSV File (Recommended)

### Step 1: Download the CSV File
1. Go to: https://github.com/ymarquezla/UniversityAdvisor/blob/main/agents/financial-aid-advisor-agent/scholarship-deadline-calendar.csv
2. Click the **"Raw"** button (top right of file view)
3. Right-click → **Save As** → Save to your computer as `scholarship-deadline-calendar.csv`

### Step 2: Create New Google Sheet
1. Go to: https://sheets.google.com
2. Click **"Blank"** to create a new spreadsheet
3. Name it: **"Sophia's Scholarship Tracker 2025-2026"**

### Step 3: Import the CSV
1. In your new Google Sheet, click **File → Import**
2. Click **Upload** tab
3. **Drag and drop** the CSV file or click **Browse** to select it
4. Import settings:
   - Import location: **Replace spreadsheet**
   - Separator type: **Detect automatically** (or select "Comma")
   - Convert text to numbers: **Yes**
5. Click **Import data**

### Step 4: Format the Spreadsheet

**A. Freeze Header Row:**
1. Click on **row 1** (the header row)
2. Click **View → Freeze → 1 row**
3. Now you can scroll and the headers stay visible!

**B. Auto-Resize Columns:**
1. Select all columns (click the square between A and 1)
2. Double-click between any two column letters to auto-fit
3. Or: Right-click column header → **Resize columns → Fit to data**

**C. Format Deadline Date Column:**
1. Select column **A** (Deadline Date)
2. Click **Format → Number → Date**
3. This makes dates sortable!

**D. Color-Code Priority Levels:**
1. Select the entire sheet (Ctrl+A or Cmd+A)
2. Click **Format → Conditional formatting**
3. Add three rules:

**Rule 1 - HIGH Priority (Red):**
- Format cells if: **Text contains** → `HIGH`
- Formatting style: Background color → **Light red** (#f4c7c3)
- Click **Done**

**Rule 2 - MEDIUM Priority (Yellow):**
- Click **+ Add another rule**
- Format cells if: **Text contains** → `MEDIUM`
- Formatting style: Background color → **Light yellow** (#fff2cc)
- Click **Done**

**Rule 3 - LOW Priority (Green):**
- Click **+ Add another rule**
- Format cells if: **Text contains** → `LOW`
- Formatting style: Background color → **Light green** (#d9ead3)
- Click **Done**

**E. Make Headers Bold:**
1. Select row 1 (the header row)
2. Click the **Bold** button (or Ctrl+B / Cmd+B)
3. Optional: Change background to dark blue and text to white
   - Background: **Dark blue** (#4a86e8)
   - Text color: **White**

**F. Add Filters:**
1. Select any cell in your data
2. Click **Data → Create a filter**
3. Now you can filter by priority, status, category, etc.!

**G. Sort by Deadline:**
1. Click the filter icon in column A (Deadline Date)
2. Select **Sort A → Z** (earliest deadlines first)
3. TBD deadlines will be at the bottom

---

## METHOD 2: Create from Scratch (If CSV Import Doesn't Work)

### Step 1: Create Column Headers
In row 1, create these column headers:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Deadline Date | Scholarship Name | Amount Min | Amount Max | Priority | Status | Category | Requirements | Application Link | Notes |

### Step 2: Add Sample Data
Copy data from the CSV file or manually enter scholarships from the timeline document.

### Step 3: Follow formatting steps from Method 1 (Step 4 A-G above)

---

## BONUS: Advanced Features

### Add a Summary Dashboard

**At the top of your sheet, add these summary formulas:**

**Row 2 (above your data - insert a row):**

**A2:** `Total Scholarships:`
**B2:** `=COUNTA(B4:B30)` (counts number of scholarships)

**A3:** `High Priority:`
**B3:** `=COUNTIF(E4:E30,"HIGH")` (counts HIGH priority scholarships)

**A4:** `Applied:`
**B4:** `=COUNTIF(F4:F30,"Applied")` (counts applied scholarships)

**A5:** `Awarded:`
**B5:** `=COUNTIF(F4:F30,"Awarded")` (counts won scholarships)

**A6:** `Total Potential (Min):`
**B6:** `=SUM(C4:C30)` (sums all minimum amounts)

**A7:** `Total Potential (Max):`
**B7:** `=SUM(D4:D30)` (sums all maximum amounts)

### Add Status Dropdown

**Make status column a dropdown:**
1. Select column **F** (Status)
2. Click **Data → Data validation**
3. Criteria: **List of items**
4. Enter: `Not Started,Research Needed,In Progress,Applied,Pending,Awarded,Denied`
5. Check **Show dropdown list in cell**
6. Click **Save**

Now you can click cells in Status column to select from dropdown!

### Add Conditional Formatting for Status

**Highlight awarded scholarships in green:**
1. Select column **F** (Status)
2. Click **Format → Conditional formatting**
3. Format cells if: **Text contains** → `Awarded`
4. Formatting style: Background → **Bright green** (#00ff00)
5. Click **Done**

**Highlight denied scholarships in gray:**
1. Add another rule
2. Format cells if: **Text contains** → `Denied`
3. Formatting style: Background → **Light gray** (#cccccc)
4. Click **Done**

### Add Checkboxes for Applied Column

1. Insert a new column after Status (column G)
2. Name it **"Applied?"**
3. Select cells in that column (G4:G30)
4. Click **Insert → Checkbox**
5. Now you can check off scholarships as you apply!

---

## SUGGESTED VIEWS (Filters)

### View 1: Upcoming Deadlines
1. Click filter on **Deadline Date** column
2. Sort **A → Z** (earliest first)
3. See what's due next!

### View 2: High Priority Only
1. Click filter on **Priority** column
2. Uncheck **MEDIUM** and **LOW**
3. Check only **HIGH**
4. See your most important scholarships!

### View 3: Not Started Applications
1. Click filter on **Status** column
2. Check only **Not Started** and **Research Needed**
3. See what you need to work on!

### View 4: Women in STEM Scholarships
1. Click filter on **Category** column
2. Check only **Women in STEM**
3. See all women-focused opportunities!

---

## SHARING THE SHEET

### Share with Family
1. Click **Share** button (top right)
2. Enter parent's email
3. Give them **Editor** access
4. They can update status and help track!

### Make a Copy for Backup
1. Click **File → Make a copy**
2. Name it: **"Scholarship Tracker BACKUP"**
3. Keep the backup in case something goes wrong!

---

## MOBILE ACCESS

### Use Google Sheets App
1. Download **Google Sheets** app (iOS/Android)
2. Sign in with your Google account
3. Open your scholarship tracker
4. Update on the go!

**Pro tip:** Pin the sheet to your home screen for quick access!

---

## WEEKLY MAINTENANCE

**Every Sunday evening:**
1. ✅ Review upcoming deadlines (sort by date)
2. ✅ Update status for applications in progress
3. ✅ Add new scholarships you discover
4. ✅ Check off completed applications
5. ✅ Celebrate awarded scholarships! 🎉

---

## TROUBLESHOOTING

**Q: CSV won't import?**
- Try Method 2 (create from scratch)
- Or copy/paste data from CSV into Google Sheets

**Q: Dates showing as text?**
- Select date column → Format → Number → Date

**Q: Formulas not working?**
- Make sure cell references match your data (adjust row numbers)

**Q: Can't see all columns?**
- Zoom out: View → Zoom → 75%
- Or hide columns you don't need

**Q: Want to print?**
- File → Print
- Set orientation to **Landscape**
- Fit to **1 page wide**

---

## EXAMPLE SCREENSHOT LAYOUT

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Sophia's Scholarship Tracker 2025-2026                           [Share]    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│ SUMMARY DASHBOARD:                                                           │
│ Total Scholarships: 26        High Priority: 7        Applied: 0             │
│ Awarded: 0                    Total Potential: $75,000-$150,000             │
│                                                                               │
├──────────────┬──────────────────────┬─────────┬─────────┬──────────┬────────┤
│ Deadline ▼   │ Scholarship Name ▼   │ Amount  │ Amount  │ Priority │ Status │
│              │                      │ Min     │ Max     │ ▼        │ ▼      │
├──────────────┼──────────────────────┼─────────┼─────────┼──────────┼────────┤
│ 2025-01-31   │ SWE Scholarships     │ $1,000  │ $15,000 │ HIGH 🔴  │ ☐      │
│ 2026-02-04   │ Fund for Ed Abroad   │ $1,250  │ $10,000 │ HIGH 🔴  │ ☐      │
│ 2025-03-01   │ Palantir Women Tech  │ $7,000  │ $7,000  │ HIGH 🔴  │ ☐      │
│ 2026-03-05   │ Gilman Scholarship   │ $5,000  │ $8,000  │ HIGH 🔴  │ ☐      │
│ ...          │ ...                  │ ...     │ ...     │ ...      │ ...    │
└──────────────┴──────────────────────┴─────────┴─────────┴──────────┴────────┘
```

---

## GOOGLE SHEETS LINK

**Once you create your sheet, the URL will look like:**
```
https://docs.google.com/spreadsheets/d/[YOUR-SHEET-ID]/edit
```

**Bookmark this link for quick access!**

---

## NEED HELP?

**Google Sheets Help Center:**
https://support.google.com/docs/answer/6000292

**Video Tutorial on Importing CSV:**
https://www.youtube.com/results?search_query=import+csv+to+google+sheets

---

**You're all set! Now you have a powerful, interactive scholarship tracker to organize your applications and never miss a deadline!** 🎓✨

**Next Step:** Start applying to scholarships! First deadline: **SWE - January 31, 2025** 🚀
