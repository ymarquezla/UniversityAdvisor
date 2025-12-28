/**
 * Scholarship Tracker - Two-Way Sync Server
 * Receives updates from web app and commits to Git
 */

const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== CONFIGURATION =====
const REPO_PATH = path.join(__dirname, '..', '..');
const CSV_PATH = path.join(__dirname, '..', 'scholarship-deadline-calendar.csv');
const SECRET_TOKEN = process.env.SYNC_SECRET || 'your-secret-token-here'; // CHANGE THIS!

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware
function authenticate(req, res, next) {
    const token = req.headers['authorization']?.replace('Bearer ', '');

    if (!token || token !== SECRET_TOKEN) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized - Invalid or missing token'
        });
    }

    next();
}

// Helper: Execute git command
function gitCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, { cwd: REPO_PATH }, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stderr });
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}

// Helper: Convert scholarships to CSV
function scholarshipsToCSV(scholarships) {
    const headers = 'Deadline Date,Scholarship Name,Amount Min,Amount Max,Priority,Status,Category,Requirements,Application Link,Notes\n';

    const rows = scholarships.map(s => {
        return `${s.deadline},"${s.name}",${s.amountMin},${s.amountMax},${s.priority},${s.status},"${s.category}","${s.requirements}","${s.link}","${s.notes}"`;
    }).join('\n');

    return headers + rows;
}

// ===== API ENDPOINTS =====

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        version: '1.0',
        message: 'Scholarship Tracker Sync Server'
    });
});

// Sync scholarships to Git
app.post('/sync', authenticate, async (req, res) => {
    try {
        const { scholarships, message } = req.body;

        if (!scholarships || !Array.isArray(scholarships)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid scholarships data'
            });
        }

        // Convert to CSV
        const csvContent = scholarshipsToCSV(scholarships);

        // Write to file
        await fs.writeFile(CSV_PATH, csvContent, 'utf-8');

        // Git operations
        await gitCommand('git add agents/financial-aid-advisor-agent/scholarship-deadline-calendar.csv');

        const commitMessage = message || `Update scholarships from web app

${scholarships.length} scholarships synced

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>`;

        await gitCommand(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);

        // Push to remote
        await gitCommand('git push origin main');

        res.json({
            success: true,
            message: 'Scholarships synced to Git',
            count: scholarships.length,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Sync error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to sync to Git',
            details: error.message
        });
    }
});

// Get current scholarships from Git
app.get('/scholarships', authenticate, async (req, res) => {
    try {
        // Pull latest changes
        await gitCommand('git pull origin main');

        // Read CSV
        const csvContent = await fs.readFile(CSV_PATH, 'utf-8');
        const lines = csvContent.trim().split('\n');

        const scholarships = [];
        for (let i = 1; i < lines.length; i++) {
            const parts = parseCSVLine(lines[i]);
            if (parts.length >= 10) {
                scholarships.push({
                    deadline: parts[0],
                    name: parts[1],
                    amountMin: parts[2],
                    amountMax: parts[3],
                    priority: parts[4],
                    status: parts[5],
                    category: parts[6],
                    requirements: parts[7],
                    link: parts[8],
                    notes: parts[9]
                });
            }
        }

        res.json({
            success: true,
            scholarships,
            count: scholarships.length,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch scholarships',
            details: error.message
        });
    }
});

// Helper: Parse CSV line
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
}

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Scholarship Sync Server running on port ${PORT}`);
    console.log(`📁 Repository path: ${REPO_PATH}`);
    console.log(`📊 CSV path: ${CSV_PATH}`);
    console.log(`🔒 Authentication: ${SECRET_TOKEN !== 'your-secret-token-here' ? 'Enabled' : '⚠️  WARNING: Using default token!'}`);
});
