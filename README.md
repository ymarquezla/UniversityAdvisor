# 🎓 University Advisor

An interactive web application and AI agent for exploring and comparing 37 European undergraduate programs in AI, Data Science, and Computer Science.

## 🌐 Live Demo

**https://ymarquezla.github.io/UniversityAdvisor/**

## 🤖 AI Agent

This project includes a comprehensive AI agent designed to help students navigate European university applications. The agent provides personalized guidance on:
- Building a balanced REACH/MATCH/SAFETY application portfolio
- Leveraging unique advantages (EU citizenship, language skills)
- Understanding costs, deadlines, and requirements
- Comparing universities and programs

**[View Agent Documentation →](agents/university-advisor-agent/)**

## Features

### 🔍 Smart Filtering
- Filter by country (9 countries across Europe)
- Filter by classification (Safety/Match/Reach)
- Filter by teaching language
- Adjust cost range slider
- Set minimum fit score
- Real-time search

### 📊 Multiple Views
- **Card View**: Beautiful cards with all details at a glance
- **Table View**: Compact spreadsheet-style for quick scanning
- Toggle between views instantly

### ⚖️ Comparison Mode
- Select up to 4 universities to compare side-by-side
- See programs, costs, classifications, and highlights aligned
- Direct links to program websites

### 🎯 Smart Sorting
- Sort by cost (cheapest first)
- Sort by fit score (best matches first)
- Sort by name or country alphabetically

### 📈 Dashboard
- Quick stats showing total universities
- Breakdown by classification
- Average cost and cheapest option
- Number of English-taught programs

## 📚 University Database

The app includes **37 universities** across **9 countries**:

- **Germany** (9): Nearly free tuition (€350/yr), English-taught options
- **Netherlands** (6): High-quality programs, international focus
- **Spain** (12): Affordable options, Spanish/English programs
- **Belgium** (1): KdG Antwerp - excellent value
- **Austria** (1): JKU Linz - excellent value
- **France** (3): Paris programs, elite options
- **Italy** (3): English-taught AI programs
- **Sweden** (1): Nearly free tuition for EU students
- **Portugal** (1): NOVA IMS - most affordable option

### Cost Range
- **Cheapest**: NOVA IMS Lisbon (Portugal) - €24-31k total
- **Most expensive**: IE University (Spain) - €147-160k total
- **Best value**: Germany (€40-45k), UPNA Pamplona (€38-44k), Karlstad (€36-40k)

### Classification Breakdown
- **Safety schools**: High acceptance probability
- **Match schools**: Realistic targets (bulk of applications)
- **Reach schools**: Competitive stretch goals

## 🚀 How to Use

### Interactive Web App
1. **Visit the live site**: https://ymarquezla.github.io/UniversityAdvisor/
2. **Explore the map**: View all universities on an interactive map of Europe
3. **Filter your options**: Use filters for country, language, cost, duration, Erasmus+
4. **Compare universities**: Select up to 4 universities for side-by-side comparison
5. **Switch views**: Toggle between card view, table view, and map view

### AI Agent
1. **Set up in Claude Desktop**: Follow instructions in [agents/university-advisor-agent/](agents/university-advisor-agent/)
2. **Get personalized guidance**: Ask questions about specific universities, application strategy, or cost comparisons
3. **Build your shortlist**: Work with the agent to create a balanced REACH/MATCH/SAFETY portfolio

## 🛠️ Technical Details

### Web Application
- **Built with**: React 18, Tailwind CSS, Leaflet.js
- **Map features**: Interactive map with clustered markers, auto-focus on country selection
- **No installation required**: Runs entirely in the browser
- **No backend needed**: All data is client-side
- **Mobile responsive**: Works on phones, tablets, and desktops

### AI Agent
- **Platform**: Claude Desktop (Projects)
- **Files**: Custom instructions, project memory, university database, examples
- **Capabilities**: Personalized guidance, application strategy, cost analysis

## Student Profile

This shortlist is optimized for students with:
- **EU citizenship** (German passport) - access to free/low tuition
- **Native German** fluency
- **English fluency**
- **C1 Spanish** proficiency
- Interested in **AI, Data Science, or Computer Science**

## 🎯 Key Advantages Highlighted

- 🇪🇺 **EU citizenship benefits** - Save €40-60k vs international student rates
- 🗣️ **C1 Spanish advantage** - Access top Spanish universities competitively
- 💰 **Affordable options** - Many programs under €40k total cost
- 🌍 **Trilingual opportunities** - Programs in German, English, and Spanish
- 📊 **Strategic approach** - REACH/MATCH/SAFETY framework for balanced applications

## 📋 Features

### Web Application
- Interactive Leaflet map showing all 37 universities across Europe
- Color-coded markers by classification (Reach/Match/Safety/Expensive)
- Map clustering and auto-focus on country selection
- Side-by-side map and results view
- Advanced filtering (country, language, cost, duration, Erasmus+, search)
- Compare up to 4 universities side-by-side
- Card view and table view
- Direct links to all official program websites

### AI Agent
- Personalized university recommendations based on profile
- REACH/MATCH/SAFETY application strategy
- Cost-benefit analysis and comparisons
- Application timeline and deadline tracking
- Motivation letter guidance
- Parent ROI and risk assessment support

## 📦 Repository Structure

```
UniversityAdvisor/
├── index.html                          # Main web app (v4 with map)
├── university-shortlist-explorer-v3.html # Previous version (no map)
├── university-shortlist-explorer-v4.html # Latest version with map
├── agents/
│   └── university-advisor-agent/       # AI agent documentation
│       ├── README.md                   # Agent overview
│       ├── instructions.md             # Custom instructions
│       ├── memory.md                   # Project context
│       ├── university-database.md      # Full database
│       └── examples.md                 # Sample conversations
└── README.md                           # This file

## 🔗 Links

- **Live Web App**: https://ymarquezla.github.io/UniversityAdvisor/
- **AI Agent Docs**: [agents/university-advisor-agent/](agents/university-advisor-agent/)
- **Support**: https://www.buymeacoffee.com/smarquez

## 📝 License

MIT License - Free to use and modify for educational purposes.

---

## 💡 About This Project

Created to help Sophia navigate European undergraduate applications for AI, Data Science, and Data Engineering programs. Leverages her unique advantages:
- EU citizenship (German passport) = €40-60k savings
- C1 Spanish proficiency = competitive advantage in Spanish universities
- Trilingual skills (German + English + Spanish) = highly marketable

**Good luck with your applications! 🍀**

*Your unique advantages open amazing opportunities across Europe!* 🌍

---

**Created**: December 2024
**Maintained by**: Yomar Marquez
**Built with**: 🤖 Claude Code assistance
