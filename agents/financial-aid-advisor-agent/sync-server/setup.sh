#!/bin/bash
# Scholarship Tracker Sync Server - Quick Setup (Mac/Linux)

echo ""
echo "========================================"
echo " Scholarship Tracker - Git Sync Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo ""
    echo "Please install Node.js from: https://nodejs.org/"
    echo "Then run this script again."
    exit 1
fi

echo "[1/4] Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo ""
echo "[2/4] Generating secret token..."
SECRET_TOKEN=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

echo ""
echo "[3/4] Creating .env file..."
if [ -f .env ]; then
    echo ".env already exists. Skipping creation."
else
    cat > .env <<EOF
# Scholarship Tracker Sync Server Configuration
# Generated on $(date)

PORT=3000
SYNC_SECRET=$SECRET_TOKEN
REPO_PATH=$(cd ../../.. && pwd)
ALLOWED_ORIGINS=https://ymarquezla.github.io
EOF
    echo ".env file created successfully!"
fi

echo ""
echo "[4/4] Configuration complete!"
echo ""
echo "========================================"
echo " IMPORTANT - Save This Information:"
echo "========================================"
echo ""
echo "Your Secret Token:"
echo "$SECRET_TOKEN"
echo ""
echo "Server URL (for web app):"
echo "http://localhost:3000"
echo ""
echo "========================================"
echo ""
echo "NEXT STEPS:"
echo ""
echo "1. Start the server:"
echo "   npm start"
echo ""
echo "2. Open scholarship-tracker-with-sync.html"
echo ""
echo "3. Press Ctrl+, to open settings"
echo ""
echo "4. Enter:"
echo "   - Server URL: http://localhost:3000"
echo "   - Token: $SECRET_TOKEN"
echo ""
echo "5. Click Save Settings"
echo ""
echo "========================================"
echo ""
