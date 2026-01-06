import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load credentials
const CREDENTIALS_PATH = path.join(process.env.HOME || process.env.USERPROFILE, '.gmail-mcp', 'credentials.json');
const OAUTH_KEYS_PATH = path.join(process.env.HOME || process.env.USERPROFILE, '.gmail-mcp', 'gcp-oauth.keys.json');

async function searchEmails(query) {
  try {
    // Load OAuth keys
    const oauthKeys = JSON.parse(fs.readFileSync(OAUTH_KEYS_PATH, 'utf8'));
    const { client_id, client_secret } = oauthKeys.installed || oauthKeys.web;

    // Load saved credentials
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

    // Create OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      'http://localhost:3000/oauth2callback'
    );

    oauth2Client.setCredentials(credentials);

    // Create Gmail API client
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Search for messages
    const res = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults: 10
    });

    const messages = res.data.messages || [];

    if (messages.length === 0) {
      console.log('No emails found matching:', query);
      return;
    }

    console.log(`Found ${messages.length} email(s) matching: ${query}\n`);

    // Get details for each message
    for (const message of messages) {
      const msg = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
        format: 'full'
      });

      const headers = msg.data.payload.headers;
      const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
      const from = headers.find(h => h.name === 'From')?.value || 'Unknown';
      const date = headers.find(h => h.name === 'Date')?.value || 'Unknown';

      // Get snippet
      const snippet = msg.data.snippet;

      console.log('━'.repeat(80));
      console.log('From:', from);
      console.log('Date:', date);
      console.log('Subject:', subject);
      console.log('Preview:', snippet);
      console.log();
    }

  } catch (error) {
    console.error('Error searching emails:', error.message);
  }
}

// Get search query from command line
const searchQuery = process.argv[2] || 'from:mytripabroad';
searchEmails(searchQuery);
