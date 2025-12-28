# 🎓 University Advisor AI Chat - MVP

A standalone chat interface powered by Claude AI to help students research European universities and find scholarships.

## ✨ Features

- **Two Specialized AI Agents:**
  - 🎓 University Advisor - Find and compare universities
  - 💰 Financial Aid Advisor - Discover scholarships and funding

- **Smart Conversation:**
  - Context-aware responses
  - Conversation history saved locally
  - Switch between agents seamlessly

- **User-Friendly:**
  - Clean, modern interface
  - Mobile-responsive design
  - Quick action buttons for common queries
  - Export conversations as text files

- **Privacy-Focused:**
  - Your API key stored locally only
  - No backend servers
  - No data collection

## 🚀 Quick Start

### 1. Get Claude API Key

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to "API Keys"
4. Create a new API key
5. Copy the key (starts with `sk-ant-...`)

**Pricing:** Claude API is pay-as-you-go:
- ~$0.01-0.05 per conversation
- First $5 credit often free for new users
- Very affordable for personal use

### 2. Open the App

Simply open `index.html` in your web browser:

```bash
# From the chat-app directory
open index.html        # Mac
start index.html       # Windows
xdg-open index.html    # Linux
```

Or drag and drop the file into your browser.

### 3. Configure Settings

1. Click the **⚙️ Settings** button
2. Paste your Claude API key
3. (Optional) Add your student profile in JSON format:

```json
{
  "budget": "€30-45k",
  "countries": ["Germany", "Austria", "Netherlands"],
  "program": "Data Science",
  "language": "English",
  "priorities": ["Low cost", "Research opportunities"]
}
```

4. Click **Save Settings**

### 4. Start Chatting!

Try these example queries:

**University Research:**
- "Find me universities in Germany with Data Science programs under €40k"
- "Compare TU Berlin, University of Passau, and Maastricht University"
- "What are the cheapest English-taught AI programs in Europe?"
- "Tell me about Erasmus+ opportunities in Spain"

**Scholarship Research:**
- "What scholarships are available for studying in Austria?"
- "Find women in STEM scholarships for European universities"
- "Calculate total cost for JKU Linz including scholarships"
- "Build me a funding package for studying in Germany"

## 📱 How to Use

### Agent Selector
Switch between agents using the buttons at the top:
- **🎓 University Advisor** - For university research and comparisons
- **💰 Financial Aid Advisor** - For scholarships and funding

### Quick Actions
Click the suggested questions to get started quickly.

### Settings
- **API Key**: Required - your Claude API key
- **Student Profile**: Optional - helps personalize recommendations

### Export
Save your conversation history as a text file for reference.

## 💰 Monetization Path (Future)

### Current: Free MVP
- Users provide their own Claude API key
- No payment processing
- Perfect for testing and validation

### Phase 1: One-Time Purchase ($29)
- Pre-configured API access (no user API key needed)
- Unlimited queries for application season (6 months)
- Enhanced features:
  - Save favorite universities
  - Application deadline tracking
  - Export to PDF/Excel
  - Email reminders

### Phase 2: Premium Features ($49)
- Everything in Phase 1, plus:
  - Custom agent instructions
  - Multi-student support (for counselors)
  - Direct integration with existing web apps
  - Priority support

## 🔒 Privacy & Security

- **API Key Storage**: Stored in browser's localStorage only
- **No Backend**: All processing happens in your browser
- **No Tracking**: No analytics or data collection
- **Conversation History**: Saved locally, never sent to servers

## 🛠️ Technical Details

### Technology Stack
- Pure HTML/CSS/JavaScript
- No build process required
- Anthropic Claude API
- localStorage for persistence

### API Usage
- Model: `claude-3-5-sonnet-20241022`
- Max tokens per response: 2048
- Conversation context: Last 10 messages
- Estimated cost: ~$0.01-0.05 per conversation

### Browser Compatibility
- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ✅

## 📊 Adding to Your Website

To integrate with your existing University Advisor website:

1. **Add navigation link:**
```html
<a href="agents/chat-app/index.html">
    💬 AI Chat
</a>
```

2. **Or embed as modal:**
Use iframe to embed the chat interface as a popup.

## 🔧 Customization

### Modify Agent Prompts
Edit the `getSystemPrompt()` function in `index.html` to customize agent behavior.

### Add More Quick Actions
Edit the `.quick-actions` section in HTML to add new suggested queries.

### Styling
All styles are in the `<style>` tag - easy to customize colors, fonts, spacing.

## 📝 Future Enhancements

**Short-term:**
- [ ] Copy code for individual messages
- [ ] Dark mode toggle
- [ ] Markdown rendering for better formatting
- [ ] Image/chart generation for comparisons

**Medium-term:**
- [ ] Save favorite universities/scholarships
- [ ] Share conversations via link
- [ ] PDF export with branding
- [ ] Integration with main web apps (add universities directly)

**Long-term:**
- [ ] Backend with user accounts
- [ ] Payment integration (Stripe)
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

## 🐛 Troubleshooting

**"API request failed" error:**
- Check your API key is correct
- Ensure you have credits in your Anthropic account
- Check browser console for detailed error

**Conversation history not saving:**
- Check browser's localStorage is enabled
- Try a different browser
- Clear cache and reload

**Slow responses:**
- Normal - AI takes 2-10 seconds to respond
- Longer prompts = longer processing time
- Check your internet connection

## 📄 License

This is a personal project. Feel free to use as reference or customize for your own needs.

## 🤝 Contributing

This is an MVP for validation. Feedback welcome!

## 📧 Support

For questions or issues, contact: [your email or GitHub]

---

**Built with 🤖 AI assistance | Powered by Claude API | For students, by students**
