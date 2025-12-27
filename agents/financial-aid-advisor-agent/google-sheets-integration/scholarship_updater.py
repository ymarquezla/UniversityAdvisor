"""
Scholarship Tracker - Google Sheets Integration
Update scholarship data programmatically via Google Sheets API
"""

import os
from datetime import datetime, timedelta
from typing import List, Dict, Optional
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# ===== CONFIGURATION =====
# UPDATE THESE VALUES WITH YOUR INFORMATION
SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE"  # Get from your Google Sheets URL
SHEET_NAME = "Sheet1"  # Or your sheet tab name
CREDENTIALS_FILE = "credentials.json"  # Path to your service account JSON file

# Google Sheets API scopes
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

# Column mapping (A=0, B=1, C=2, etc.)
COLUMNS = {
    'deadline': 0,      # A
    'name': 1,          # B
    'amountMin': 2,     # C
    'amountMax': 3,     # D
    'priority': 4,      # E
    'status': 5,        # F
    'category': 6,      # G
    'requirements': 7,  # H
    'link': 8,          # I
    'notes': 9          # J
}


class ScholarshipTracker:
    """Google Sheets integration for scholarship tracking"""

    def __init__(self, credentials_file=CREDENTIALS_FILE, spreadsheet_id=SPREADSHEET_ID, sheet_name=SHEET_NAME):
        """
        Initialize the tracker with Google Sheets credentials

        Args:
            credentials_file: Path to service account JSON file
            spreadsheet_id: Google Sheets spreadsheet ID
            sheet_name: Name of the sheet tab (default: Sheet1)
        """
        self.spreadsheet_id = spreadsheet_id
        self.sheet_name = sheet_name

        # Authenticate
        try:
            credentials = service_account.Credentials.from_service_account_file(
                credentials_file, scopes=SCOPES)
            self.service = build('sheets', 'v4', credentials=credentials)
            self.sheet = self.service.spreadsheets()
            print("✅ Successfully connected to Google Sheets!")
        except Exception as e:
            print(f"❌ Error connecting to Google Sheets: {e}")
            raise

    def _get_range(self, range_name):
        """Helper to get data from a range"""
        try:
            result = self.sheet.values().get(
                spreadsheetId=self.spreadsheet_id,
                range=f"{self.sheet_name}!{range_name}"
            ).execute()
            return result.get('values', [])
        except HttpError as error:
            print(f"Error reading from sheet: {error}")
            return []

    def _update_range(self, range_name, values):
        """Helper to update data in a range"""
        try:
            body = {'values': values}
            self.sheet.values().update(
                spreadsheetId=self.spreadsheet_id,
                range=f"{self.sheet_name}!{range_name}",
                valueInputOption='USER_ENTERED',
                body=body
            ).execute()
            return True
        except HttpError as error:
            print(f"Error updating sheet: {error}")
            return False

    def _append_row(self, values):
        """Helper to append a new row"""
        try:
            body = {'values': [values]}
            self.sheet.values().append(
                spreadsheetId=self.spreadsheet_id,
                range=f"{self.sheet_name}!A:J",
                valueInputOption='USER_ENTERED',
                insertDataOption='INSERT_ROWS',
                body=body
            ).execute()
            return True
        except HttpError as error:
            print(f"Error appending row: {error}")
            return False

    def get_all_scholarships(self) -> List[Dict]:
        """
        Get all scholarships from the sheet

        Returns:
            List of scholarship dictionaries
        """
        data = self._get_range("A2:J")  # Skip header row

        scholarships = []
        for row in data:
            # Pad row with empty strings if needed
            while len(row) < 10:
                row.append('')

            scholarships.append({
                'deadline': row[0],
                'name': row[1],
                'amountMin': row[2],
                'amountMax': row[3],
                'priority': row[4],
                'status': row[5],
                'category': row[6],
                'requirements': row[7],
                'link': row[8],
                'notes': row[9]
            })

        print(f"📊 Found {len(scholarships)} scholarships")
        return scholarships

    def add_scholarship(self, name: str, deadline: str = "TBD", amount_min: str = "",
                       amount_max: str = "", priority: str = "MEDIUM", status: str = "Not Started",
                       category: str = "", requirements: str = "", link: str = "", notes: str = ""):
        """
        Add a new scholarship to the tracker

        Args:
            name: Scholarship name (required)
            deadline: Deadline date (YYYY-MM-DD format or TBD)
            amount_min: Minimum award amount (e.g., "$1000")
            amount_max: Maximum award amount (e.g., "$5000")
            priority: HIGH, MEDIUM, or LOW
            status: Not Started, In Progress, Applied, Awarded, etc.
            category: Category (e.g., "Women in STEM")
            requirements: Application requirements
            link: Application URL
            notes: Additional notes
        """
        row = [deadline, name, amount_min, amount_max, priority, status,
               category, requirements, link, notes]

        if self._append_row(row):
            print(f"✅ Added scholarship: {name}")
            return True
        else:
            print(f"❌ Failed to add scholarship: {name}")
            return False

    def update_status(self, scholarship_name: str, new_status: str):
        """
        Update the status of a scholarship

        Args:
            scholarship_name: Name of the scholarship to update
            new_status: New status value
        """
        data = self._get_range("A2:J")

        for i, row in enumerate(data, start=2):  # start=2 because row 1 is header
            if len(row) > 1 and row[1] == scholarship_name:
                # Update status in column F (index 5)
                range_name = f"F{i}"
                if self._update_range(range_name, [[new_status]]):
                    print(f"✅ Updated {scholarship_name} to: {new_status}")
                    return True

        print(f"❌ Scholarship not found: {scholarship_name}")
        return False

    def update_scholarship(self, scholarship_name: str, updates: Dict):
        """
        Update any fields of a scholarship

        Args:
            scholarship_name: Name of the scholarship to update
            updates: Dictionary of fields to update (e.g., {'deadline': '2025-06-30', 'status': 'Applied'})
        """
        data = self._get_range("A2:J")

        for i, row in enumerate(data, start=2):
            if len(row) > 1 and row[1] == scholarship_name:
                # Pad row if needed
                while len(row) < 10:
                    row.append('')

                # Update fields
                for field, value in updates.items():
                    if field in COLUMNS:
                        col_index = COLUMNS[field]
                        row[col_index] = value

                # Update entire row
                range_name = f"A{i}:J{i}"
                if self._update_range(range_name, [row]):
                    print(f"✅ Updated {scholarship_name}")
                    return True

        print(f"❌ Scholarship not found: {scholarship_name}")
        return False

    def get_by_status(self, status: str) -> List[Dict]:
        """
        Get scholarships by status

        Args:
            status: Status to filter by (e.g., "Not Started", "Applied", "Awarded")

        Returns:
            List of scholarships with matching status
        """
        all_scholarships = self.get_all_scholarships()
        filtered = [s for s in all_scholarships if s['status'] == status]
        print(f"📊 Found {len(filtered)} scholarships with status: {status}")
        return filtered

    def get_by_priority(self, priority: str) -> List[Dict]:
        """
        Get scholarships by priority

        Args:
            priority: Priority to filter by (HIGH, MEDIUM, LOW)

        Returns:
            List of scholarships with matching priority
        """
        all_scholarships = self.get_all_scholarships()
        filtered = [s for s in all_scholarships if s['priority'] == priority]
        print(f"📊 Found {len(filtered)} scholarships with priority: {priority}")
        return filtered

    def get_upcoming_deadlines(self, days: int = 30) -> List[Dict]:
        """
        Get scholarships with deadlines in the next X days

        Args:
            days: Number of days to look ahead (default: 30)

        Returns:
            List of scholarships with upcoming deadlines, sorted by date
        """
        all_scholarships = self.get_all_scholarships()
        upcoming = []
        now = datetime.now()
        future = now + timedelta(days=days)

        for scholarship in all_scholarships:
            deadline_str = scholarship['deadline']
            if deadline_str and deadline_str != 'TBD':
                try:
                    # Try parsing date
                    deadline = datetime.strptime(deadline_str, '%Y-%m-%d')
                    if now <= deadline <= future:
                        days_until = (deadline - now).days
                        scholarship['daysUntil'] = days_until
                        upcoming.append(scholarship)
                except ValueError:
                    # Skip if date can't be parsed
                    pass

        # Sort by deadline
        upcoming.sort(key=lambda x: x['deadline'])

        print(f"📊 Found {len(upcoming)} scholarships due in next {days} days")
        return upcoming

    def get_statistics(self) -> Dict:
        """
        Get summary statistics

        Returns:
            Dictionary with statistics
        """
        all_scholarships = self.get_all_scholarships()

        stats = {
            'total': len(all_scholarships),
            'byStatus': {},
            'byPriority': {},
            'byCategory': {},
            'upcoming30days': 0
        }

        # Count by status, priority, category
        for scholarship in all_scholarships:
            # Status
            status = scholarship['status']
            stats['byStatus'][status] = stats['byStatus'].get(status, 0) + 1

            # Priority
            priority = scholarship['priority']
            stats['byPriority'][priority] = stats['byPriority'].get(priority, 0) + 1

            # Category
            category = scholarship['category']
            if category:
                stats['byCategory'][category] = stats['byCategory'].get(category, 0) + 1

        # Count upcoming
        upcoming = self.get_upcoming_deadlines(30)
        stats['upcoming30days'] = len(upcoming)

        return stats

    def delete_scholarship(self, scholarship_name: str):
        """
        Delete a scholarship (use carefully!)

        Args:
            scholarship_name: Name of scholarship to delete
        """
        print(f"⚠️ Warning: This will permanently delete {scholarship_name}")
        print("This feature is not implemented for safety. Use the Google Sheets UI to delete rows.")
        return False


# ===== EXAMPLE USAGE =====
if __name__ == "__main__":
    try:
        # Initialize tracker
        tracker = ScholarshipTracker()

        # Test: Get all scholarships
        scholarships = tracker.get_all_scholarships()
        print(f"\nCurrent scholarships: {len(scholarships)}")

        # Test: Get upcoming deadlines
        print("\n=== Upcoming Deadlines (Next 30 Days) ===")
        upcoming = tracker.get_upcoming_deadlines(30)
        for s in upcoming[:5]:  # Show first 5
            print(f"  - {s['name']}: {s['deadline']} ({s['daysUntil']} days)")

        # Test: Get statistics
        print("\n=== Statistics ===")
        stats = tracker.get_statistics()
        print(f"Total: {stats['total']}")
        print(f"By Status: {stats['byStatus']}")
        print(f"By Priority: {stats['byPriority']}")
        print(f"Upcoming (30 days): {stats['upcoming30days']}")

        print("\n✅ All tests passed!")

    except FileNotFoundError:
        print("\n❌ Error: credentials.json not found!")
        print("Please follow the setup guide in python-api-setup.md")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("Please check your configuration and try again.")
