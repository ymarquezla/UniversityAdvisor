// Google Apps Script for Scholarship Tracker Webhook
// Copy this code into your Google Sheet: Extensions → Apps Script

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
 * Update any field of a scholarship by name
 */
function updateScholarship(scholarshipName, updates) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  const columnMap = {
    'deadline': 0,
    'name': 1,
    'amountMin': 2,
    'amountMax': 3,
    'priority': 4,
    'status': 5,
    'category': 6,
    'requirements': 7,
    'link': 8,
    'notes': 9
  };

  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === scholarshipName) {
      for (const [field, value] of Object.entries(updates)) {
        if (columnMap.hasOwnProperty(field)) {
          sheet.getRange(i + 1, columnMap[field] + 1).setValue(value);
        }
      }
      return { success: true, message: `Updated ${scholarshipName}` };
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
 * Get all scholarships (for export/backup)
 */
function getAllScholarships() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const scholarships = [];

  for (let i = 1; i < data.length; i++) {
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

  return scholarships;
}

/**
 * Get statistics/summary
 */
function getStatistics() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  const stats = {
    total: data.length - 1, // Exclude header
    byStatus: {},
    byPriority: {},
    upcoming: 0,
    totalPotentialMin: 0,
    totalPotentialMax: 0
  };

  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));

  for (let i = 1; i < data.length; i++) {
    // Count by status
    const status = data[i][5];
    stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;

    // Count by priority
    const priority = data[i][4];
    stats.byPriority[priority] = (stats.byPriority[priority] || 0) + 1;

    // Count upcoming
    const deadlineStr = data[i][0];
    if (deadlineStr && deadlineStr !== 'TBD') {
      const deadline = new Date(deadlineStr);
      if (deadline >= now && deadline <= thirtyDaysFromNow) {
        stats.upcoming++;
      }
    }

    // Sum potential amounts (if numeric)
    const minStr = String(data[i][2]).replace(/[$,€]/g, '');
    const maxStr = String(data[i][3]).replace(/[$,€]/g, '');
    const min = parseFloat(minStr);
    const max = parseFloat(maxStr);

    if (!isNaN(min)) stats.totalPotentialMin += min;
    if (!isNaN(max)) stats.totalPotentialMax += max;
  }

  return stats;
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

      case 'updateScholarship':
        result = updateScholarship(data.scholarshipName, data.updates);
        break;

      case 'getByStatus':
        result = { success: true, data: getScholarshipsByStatus(data.status) };
        break;

      case 'getUpcoming':
        result = { success: true, data: getUpcomingDeadlines() };
        break;

      case 'getAll':
        result = { success: true, data: getAllScholarships() };
        break;

      case 'getStats':
        result = { success: true, data: getStatistics() };
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

    case 'getAll':
      result = { success: true, data: getAllScholarships() };
      break;

    case 'getStats':
      result = { success: true, data: getStatistics() };
      break;

    default:
      result = {
        success: true,
        message: 'Scholarship Tracker API v1.0',
        endpoints: {
          'POST /': 'Main endpoint for actions',
          'GET /?action=getUpcoming': 'Get upcoming deadlines (next 30 days)',
          'GET /?action=getByStatus&status=Applied': 'Get scholarships by status',
          'GET /?action=getAll': 'Get all scholarships',
          'GET /?action=getStats': 'Get statistics and summary'
        },
        actions: {
          'addScholarship': 'Add new scholarship',
          'updateStatus': 'Update scholarship status',
          'updateScholarship': 'Update any scholarship field',
          'getByStatus': 'Get scholarships by status',
          'getUpcoming': 'Get upcoming deadlines',
          'getAll': 'Get all scholarships',
          'getStats': 'Get statistics'
        }
      };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
