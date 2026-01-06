import express from 'express';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// Load credentials
const CREDENTIALS_PATH = path.join(process.env.HOME || process.env.USERPROFILE, '.gmail-mcp', 'credentials.json');
const OAUTH_KEYS_PATH = path.join(process.env.HOME || process.env.USERPROFILE, '.gmail-mcp', 'gcp-oauth.keys.json');

// Initialize Gmail client
function getGmailClient() {
    const oauthKeys = JSON.parse(fs.readFileSync(OAUTH_KEYS_PATH, 'utf8'));
    const { client_id, client_secret } = oauthKeys.installed || oauthKeys.web;
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

    const oauth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        'http://localhost:3000/oauth2callback'
    );

    oauth2Client.setCredentials(credentials);
    return google.gmail({ version: 'v1', auth: oauth2Client });
}

// Helper function to categorize emails
function categorizeEmail(subject, from, body) {
    const text = `${subject} ${from} ${body}`.toLowerCase();

    if (text.includes('university') || text.includes('admission') || text.includes('application')) {
        return 'university';
    }
    if (text.includes('scholarship') || text.includes('financial aid')) {
        return 'scholarship';
    }
    return 'other';
}

// Helper function to detect urgency
function isUrgent(subject, body) {
    const text = `${subject} ${body}`.toLowerCase();
    return text.includes('urgent') || text.includes('deadline') || text.includes('asap') ||
           text.includes('immediately') || text.includes('reminder');
}

// Helper function to decode email body
function decodeEmailBody(payload) {
    let body = '';

    if (payload.body.data) {
        body = Buffer.from(payload.body.data, 'base64').toString('utf-8');
    } else if (payload.parts) {
        for (const part of payload.parts) {
            if (part.mimeType === 'text/plain' && part.body.data) {
                body = Buffer.from(part.body.data, 'base64').toString('utf-8');
                break;
            } else if (part.mimeType === 'text/html' && part.body.data && !body) {
                body = Buffer.from(part.body.data, 'base64').toString('utf-8');
            }
        }
    }

    return body;
}

// API: Search emails
app.post('/api/gmail/search', async (req, res) => {
    try {
        const { query } = req.body;
        const gmail = getGmailClient();

        const response = await gmail.users.messages.list({
            userId: 'me',
            q: query,
            maxResults: 50
        });

        const messages = response.data.messages || [];
        const emails = [];

        for (const message of messages) {
            const msg = await gmail.users.messages.get({
                userId: 'me',
                id: message.id,
                format: 'full'
            });

            const headers = msg.data.payload.headers;
            const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
            const from = headers.find(h => h.name === 'From')?.value || 'Unknown';
            const date = headers.find(h => h.name === 'Date')?.value || '';
            const snippet = msg.data.snippet || '';

            const body = decodeEmailBody(msg.data.payload);
            const category = categorizeEmail(subject, from, body);
            const urgent = isUrgent(subject, body);
            const unread = msg.data.labelIds?.includes('UNREAD') || false;

            emails.push({
                id: message.id,
                subject,
                from,
                date,
                preview: snippet,
                category,
                urgent,
                unread
            });
        }

        res.json(emails);
    } catch (error) {
        console.error('Error searching emails:', error);
        res.status(500).json({ error: error.message });
    }
});

// API: Get email details
app.get('/api/gmail/message/:id', async (req, res) => {
    try {
        const gmail = getGmailClient();
        const msg = await gmail.users.messages.get({
            userId: 'me',
            id: req.params.id,
            format: 'full'
        });

        const headers = msg.data.payload.headers;
        const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
        const from = headers.find(h => h.name === 'From')?.value || 'Unknown';
        const to = headers.find(h => h.name === 'To')?.value || 'Unknown';
        const date = headers.find(h => h.name === 'Date')?.value || '';

        const body = decodeEmailBody(msg.data.payload);

        res.json({
            id: req.params.id,
            subject,
            from,
            to,
            date,
            body: body.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')
        });
    } catch (error) {
        console.error('Error getting email:', error);
        res.status(500).json({ error: error.message });
    }
});

// API: Send reply
app.post('/api/gmail/reply', async (req, res) => {
    try {
        const { emailId, message } = req.body;
        const gmail = getGmailClient();

        // Get original email
        const original = await gmail.users.messages.get({
            userId: 'me',
            id: emailId,
            format: 'full'
        });

        const headers = original.data.payload.headers;
        const subject = headers.find(h => h.name === 'Subject')?.value || '';
        const to = headers.find(h => h.name === 'From')?.value || '';
        const messageId = headers.find(h => h.name === 'Message-ID')?.value || '';

        // Create reply
        const replySubject = subject.startsWith('Re:') ? subject : `Re: ${subject}`;
        const email = [
            `To: ${to}`,
            `Subject: ${replySubject}`,
            `In-Reply-To: ${messageId}`,
            `References: ${messageId}`,
            '',
            message
        ].join('\n');

        const encodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

        await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedEmail,
                threadId: original.data.threadId
            }
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error sending reply:', error);
        res.status(500).json({ error: error.message });
    }
});

// API: Generate AI-assisted reply
app.post('/api/gmail/ai-reply', async (req, res) => {
    try {
        const { emailId } = req.body;
        const gmail = getGmailClient();

        // Get original email
        const msg = await gmail.users.messages.get({
            userId: 'me',
            id: emailId,
            format: 'full'
        });

        const headers = msg.data.payload.headers;
        const subject = headers.find(h => h.name === 'Subject')?.value || '';
        const from = headers.find(h => h.name === 'From')?.value || '';
        const body = decodeEmailBody(msg.data.payload);

        // Generate AI reply based on context
        let aiReply = '';

        // Check for common patterns and generate appropriate replies
        if (body.toLowerCase().includes('complete') && body.toLowerCase().includes('webform')) {
            aiReply = `Dear ${from.split('<')[0].trim()},\n\nThank you for the reminder. I will log in to the portal and complete the required webform as soon as possible.\n\nBest regards,\nAnnabelle Marquez`;
        } else if (body.toLowerCase().includes('deadline')) {
            aiReply = `Dear ${from.split('<')[0].trim()},\n\nThank you for notifying me about the deadline. I am working on completing all required materials and will submit them before the deadline.\n\nBest regards,\nAnnabelle Marquez`;
        } else if (body.toLowerCase().includes('application')) {
            aiReply = `Dear ${from.split('<')[0].trim()},\n\nThank you for your email regarding my application. I would like to confirm my continued interest in this opportunity.\n\nPlease let me know if you need any additional information from me.\n\nBest regards,\nAnnabelle Marquez`;
        } else {
            aiReply = `Dear ${from.split('<')[0].trim()},\n\nThank you for your email. I appreciate the information provided.\n\nBest regards,\nAnnabelle Marquez`;
        }

        res.json({ reply: aiReply });
    } catch (error) {
        console.error('Error generating AI reply:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`📧 Email Manager Server running on http://localhost:${PORT}`);
    console.log(`📱 Open http://localhost:${PORT}/index.html in your browser`);
});
