# Gmail MCP Integration Setup Guide

This guide will help you connect Gmail to your University Advisor agents using the Model Context Protocol (MCP).

## What You'll Be Able to Do

Once set up, your University Advisor agents can:
- ✅ Search emails from universities
- ✅ Get application confirmation emails
- ✅ Track deadline reminders
- ✅ Send application emails
- ✅ Auto-label university correspondence
- ✅ Download attachments (application forms, etc.)

## Prerequisites

- Node.js installed (you already have this)
- A Google account (Gmail)
- Google Cloud Console access

---

## Step 1: Create Google Cloud Project & Enable Gmail API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Create Project"**
   - Name: `University Advisor Gmail`
   - Click **Create**

3. Enable Gmail API:
   - In the search bar, type **"Gmail API"**
   - Click **"Gmail API"** from results
   - Click **"Enable"**

## Step 2: Create OAuth Credentials

1. In Google Cloud Console, go to **"APIs & Services"** → **"Credentials"**

2. Click **"Create Credentials"** → **"OAuth client ID"**

3. If prompted, configure the OAuth consent screen:
   - User Type: **External**
   - App name: `University Advisor`
   - User support email: Your email
   - Developer contact: Your email
   - Add scope: `https://www.googleapis.com/auth/gmail.readonly`
   - Add scope: `https://www.googleapis.com/auth/gmail.send`
   - Add scope: `https://www.googleapis.com/auth/gmail.modify`
   - Add test users: Your email and Sophia's email
   - Click **Save and Continue**

4. Back in Credentials, click **"Create Credentials"** → **"OAuth client ID"**
   - Application type: **Desktop app**
   - Name: `University Advisor Desktop`
   - Click **Create**

5. **Download the JSON file**:
   - Click the download icon next to your newly created OAuth client
   - Rename the downloaded file to: `gcp-oauth.keys.json`

## Step 3: Authenticate Gmail MCP Server

Open your terminal and run these commands:

```bash
# Create Gmail MCP directory
mkdir -p ~/.gmail-mcp

# Move your credentials file there
# (Replace the path with where you downloaded the file)
move "C:\Users\Ymarquez\Downloads\gcp-oauth.keys.json" "%USERPROFILE%\.gmail-mcp\gcp-oauth.keys.json"

# Authenticate (this will open your browser)
npx @gongrzhe/server-gmail-autoauth-mcp auth
```

**What happens next:**
1. A browser window will open
2. Sign in with your Google account
3. Click **"Allow"** to grant permissions
4. You'll see a success message
5. Credentials are saved to `~/.gmail-mcp/credentials.json`

## Step 4: Test the Connection

Run this command to verify it's working:

```bash
npx @gongrzhe/server-gmail-autoauth-mcp
```

You should see the MCP server start successfully.

## Step 5: Connect to University Advisor Agents

Now we'll create a custom agent that can interact with Gmail.

### Option A: Use with Claude Desktop

If you have Claude Desktop installed, add this to your config file:

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "gmail": {
      "command": "npx",
      "args": ["@gongrzhe/server-gmail-autoauth-mcp"]
    }
  }
}
```

### Option B: Use with Your Web-Based Agents

We'll create a simple integration that your University Advisor and Financial Aid Advisor can use.

---

## Use Cases for University Applications

### 1. Email Search
**Example:** "Search my Gmail for emails from University of Passau about application deadlines"

### 2. Application Tracking
**Example:** "Check if I received confirmation emails from the universities I applied to"

### 3. Deadline Monitoring
**Example:** "Find all emails mentioning deadlines in the next 30 days from universities"

### 4. Auto-Labeling
**Example:** "Label all emails from .edu domains with 'University Applications'"

### 5. Send Applications
**Example:** "Draft an email to ai-admissions@uni-passau.de asking about application status"

---

## Security Notes

⚠️ **Important:**
- Your OAuth tokens are stored in `~/.gmail-mcp/credentials.json`
- Keep this file secure and never commit it to Git
- The tokens give access to your Gmail, so treat them like passwords
- You can revoke access anytime in [Google Account Security](https://myaccount.google.com/permissions)

---

## Troubleshooting

### "Authentication failed"
- Make sure you moved `gcp-oauth.keys.json` to `~/.gmail-mcp/`
- Check that you enabled the Gmail API in Google Cloud Console
- Verify you added your email as a test user

### "Permission denied"
- Make sure you granted all scopes during OAuth consent
- Check that the OAuth client type is "Desktop app"

### "Server won't start"
- Run `npm cache clean --force`
- Try `npx -y @gongrzhe/server-gmail-autoauth-mcp auth` again

---

## Next Steps

Once Gmail MCP is set up, I can help you:
1. Create a "University Email Assistant" agent
2. Build automated email monitoring for deadlines
3. Set up email notifications for application updates
4. Create email templates for university inquiries

Let me know when you're ready to proceed!
