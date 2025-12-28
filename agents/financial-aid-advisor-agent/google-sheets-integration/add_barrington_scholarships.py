"""
Script to add Barrington, RI scholarships to Google Sheets
Uses the Google Apps Script webhook method
"""

import requests
import json

# UPDATE THIS with your deployed Google Apps Script webhook URL
WEBHOOK_URL = "YOUR_WEBHOOK_URL_HERE"  # Get this from deploying google_apps_script.js

# Barrington, RI scholarships to add
barrington_scholarships = [
    {
        "deadline": "2025-02-24",
        "name": "Community Scholarship Fund of Barrington",
        "amountMin": "$1,000",
        "amountMax": "$10,000",
        "priority": "HIGH",
        "status": "Not Started",
        "category": "Local/Community",
        "requirements": "Application, Essays, Transcripts, Financial docs, Recommendations",
        "link": "https://csfofbarrington.com/apply/",
        "notes": "Barrington RI residents - based on need + merit - DEADLINE FEB 24!"
    },
    {
        "deadline": "TBD",
        "name": "RI PBS & Public Radio Journalism Scholarship",
        "amountMin": "$15,000",
        "amountMax": "$60,000",
        "priority": "HIGH",
        "status": "Research Needed",
        "category": "Field-Specific",
        "requirements": "Broadcasting/Communications/Journalism focus",
        "link": "https://rifoundation.org/",
        "notes": "Up to $60k renewable for 4 years - could angle toward AI/tech journalism"
    },
    {
        "deadline": "TBD",
        "name": "Rhode Island Foundation Scholarships",
        "amountMin": "$500",
        "amountMax": "$5,000",
        "priority": "MEDIUM",
        "status": "Research Needed",
        "category": "State/Regional",
        "requirements": "Varies by scholarship",
        "link": "https://rifoundation.org/",
        "notes": "Multiple RI-specific scholarships available"
    },
    {
        "deadline": "TBD",
        "name": "Barrington Rotary Club Scholarship",
        "amountMin": "$1,000",
        "amountMax": "$5,000",
        "priority": "MEDIUM",
        "status": "Research Needed",
        "category": "Local/Community",
        "requirements": "Application, Interview",
        "link": "Contact Barrington Rotary",
        "notes": "Local Barrington Rotary scholarships - requires interview"
    }
]


def add_scholarship_via_webhook(scholarship_data):
    """Add a single scholarship via webhook"""
    payload = {
        "action": "addScholarship",
        "scholarship": scholarship_data
    }

    try:
        response = requests.post(WEBHOOK_URL, json=payload)
        response.raise_for_status()
        result = response.json()
        if result.get('success'):
            print(f"✅ Added: {scholarship_data['name']}")
        else:
            print(f"❌ Failed: {scholarship_data['name']} - {result.get('message')}")
    except Exception as e:
        print(f"❌ Error adding {scholarship_data['name']}: {e}")


def main():
    if WEBHOOK_URL == "YOUR_WEBHOOK_URL_HERE":
        print("⚠️  Please update WEBHOOK_URL with your deployed Google Apps Script URL")
        print("\nTo get your webhook URL:")
        print("1. Open your Google Sheet")
        print("2. Go to Extensions → Apps Script")
        print("3. Deploy → New deployment → Web app")
        print("4. Copy the deployment URL")
        print("5. Update WEBHOOK_URL in this script")
        return

    print("📝 Adding Barrington, RI scholarships to Google Sheets...\n")

    for scholarship in barrington_scholarships:
        add_scholarship_via_webhook(scholarship)

    print(f"\n✅ Done! Added {len(barrington_scholarships)} Barrington scholarships")
    print("\nNext steps:")
    print("1. Open your Google Sheet to verify")
    print("2. Sort by deadline to prioritize Feb 24 deadline")
    print("3. Start applying!")


if __name__ == "__main__":
    main()
