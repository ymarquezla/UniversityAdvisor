# Gmail MCP Integration for University Advisor

Connect your University Advisor agents to Gmail using the Model Context Protocol (MCP).

## Overview

This integration enables your University Advisor and Financial Aid Advisor to:
- Search and read emails from universities
- Track application confirmations and deadlines
- Send emails to university admissions offices
- Auto-categorize university correspondence
- Download application forms and attachments

## Quick Start

Follow the [SETUP.md](./SETUP.md) guide for detailed installation instructions.

### TL;DR Setup

```bash
# 1. Create Google Cloud project and enable Gmail API
# 2. Download OAuth credentials as gcp-oauth.keys.json

# 3. Install and authenticate
mkdir -p ~/.gmail-mcp
move gcp-oauth.keys.json ~/.gmail-mcp/
npx @gongrzhe/server-gmail-autoauth-mcp auth

# 4. Test
npx @gongrzhe/server-gmail-autoauth-mcp
```

## Features

### Email Search
Search your Gmail for university-related emails:
- Application confirmations
- Deadline reminders
- Interview invitations
- Admission decisions

### Email Management
- Label emails automatically
- Archive old correspondence
- Mark important deadlines
- Download attachments

### Email Sending
- Draft emails to admissions offices
- Send application follow-ups
- Request information
- Confirm enrollment

## Integration with Agents

### University Advisor Agent
The University Advisor can now:
- Check if you received confirmation emails after applying
- Search for application deadline reminders
- Track communication with specific universities

### Financial Aid Advisor Agent
The Financial Aid Advisor can now:
- Search for scholarship notification emails
- Track award letters
- Monitor financial aid deadlines
- Find FAFSA/CSS Profile confirmations

## Example Use Cases

### 1. Track Applications
"Check my Gmail for confirmation emails from universities I applied to"

### 2. Monitor Deadlines
"Search for emails mentioning deadlines from .edu domains in the next 30 days"

### 3. Follow Up
"Draft an email to University of Passau asking about my application status"

### 4. Organize Inbox
"Label all emails from universities with 'University Applications'"

### 5. Download Forms
"Find and download the I-20 form email from Maastricht University"

## Architecture

```
User Request
    ↓
University Advisor Agent
    ↓
Gmail MCP Server (localhost)
    ↓
Google Gmail API (OAuth 2.0)
    ↓
Your Gmail Account
```

## Security

- OAuth 2.0 authentication (industry standard)
- Credentials stored locally in `~/.gmail-mcp/`
- No passwords stored
- Revocable access via Google Account settings
- Test user scope limits API access

## Files

- `SETUP.md` - Detailed setup instructions
- `package.json` - Node.js dependencies
- `~/.gmail-mcp/gcp-oauth.keys.json` - OAuth client credentials (DO NOT COMMIT)
- `~/.gmail-mcp/credentials.json` - OAuth tokens (DO NOT COMMIT)

## Support

For issues with:
- **Gmail MCP Server:** https://github.com/GongRzhe/Gmail-MCP-Server/issues
- **University Advisor Integration:** Open an issue in this repo

## Resources

- [Gmail MCP Server GitHub](https://github.com/GongRzhe/Gmail-MCP-Server)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io)
- [Google Gmail API](https://developers.google.com/gmail/api)
- [Medium Tutorial: Create a Gmail Agent with MCP](https://medium.com/@jason.summer/create-a-gmail-agent-with-model-context-protocol-mcp-061059c07777)

## License

MIT
