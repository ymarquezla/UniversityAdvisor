# University Advisor Agent

An AI agent designed to help Sophia navigate European university applications for AI, Data Science, and Data Engineering undergraduate programs.

## 🎯 Purpose

This agent helps build a comprehensive, personalized shortlist of universities that:
- Align with Sophia's academic profile (GPA, math level, coding experience)
- Leverage her unique advantages (EU citizenship, C1 Spanish, trilingual skills)
- Fit her preferences (country, city size, language, cost)
- Position her optimally for admission using the REACH/MATCH/SAFETY framework

## 👤 Sophia's Profile

**Academic:**
- GPA: 3.2
- Highest Math: Pre-Calculus
- Coding: Python, REACT
- Test Scores: 1200

**Languages & Citizenship:**
- German: Intermediate (Native speaker)
- English: Fluent
- Spanish: Advanced (C1 level) ← MAJOR ADVANTAGE
- EU Citizenship: Yes (German passport) ← MAJOR ADVANTAGE
- US Citizenship: Yes (US passport)

**Key Advantages:**
1. **EU Citizenship** - Access to €350-2,500/yr tuition vs €15k+ for non-EU
2. **C1 Spanish** - Access to top Spanish universities (competitive advantage)
3. **Trilingual** - German + English + Spanish = rare and marketable combination
4. **Dual citizenship** - Maximum flexibility

## 📚 University Database

The agent has knowledge of **37+ European universities** across 9 countries:

- **Germany** (9 universities) - Nearly free (€350/yr)
- **Netherlands** (6 universities) - Moderate cost (€2,314/yr)
- **Spain** (12 universities) - Low-moderate cost (€1,200-2,800/yr)
- **France** (3 universities) - Nearly free to moderate
- **Austria** (1 university) - Low cost (€1,452/yr)
- **Italy** (3 universities) - Low-moderate cost
- **Sweden** (1 university) - Nearly free for EU (€100/yr)
- **Belgium** (1 university) - Low cost (€1,157/yr)
- **Portugal** (1 university) - Very low cost (€697/yr)

## 🎓 REACH/MATCH/SAFETY Framework

**REACH Schools:**
- Admission difficulty > profile + 1-2 levels
- Examples: PSL Paris, UPM Madrid, UPC Barcelona, TU Berlin
- Worth applying if prestige/PhD pathway desired

**MATCH Schools:**
- Admission difficulty ≈ profile
- Examples: Maastricht, UC3M, Passau, Leiden
- Most likely to get in - bulk of applications

**SAFETY Schools:**
- Admission difficulty < profile - 1-2 levels
- Examples: UPNA Pamplona, Groningen, Valencia, Zaragoza, Karlstad
- Very likely to get in - apply to 2-3 for peace of mind

## 🚀 How to Use This Agent

### In Claude Desktop (Project Mode)

1. **Create a new Project** named "University Advisor"
2. **Add Custom Instructions** from `instructions.md`
3. **Add Project Memory** from `memory.md`
4. **Start conversation** - the agent will greet you and ask clarifying questions

### In Claude API

Use the agent with the API by:
1. Loading the system prompt from `instructions.md`
2. Including context from `memory.md` in the conversation
3. Maintaining conversation history for continuity

### Key Conversation Starters

**For Sophia:**
- "Help me understand which universities are best for my profile"
- "Compare Germany vs Spain universities for me"
- "What are my safety schools?"
- "Help me prepare my application for [University Name]"

**For Parents:**
- "What's the cost comparison between countries?"
- "Help me understand the ROI of each option"
- "What's the risk assessment for Sophia's shortlist?"

## 📁 Files in This Folder

- **README.md** (this file) - Overview and usage guide
- **instructions.md** - Complete agent instructions (Custom Instructions for Claude)
- **memory.md** - Project context and knowledge base (Project Memory for Claude)
- **university-database.md** - Full list of 37 universities with details
- **examples.md** - Sample conversations and use cases

## 🔄 Updating the Agent

As new information emerges:

1. **Update university-database.md** with new schools or corrected info
2. **Update memory.md** with new context about Sophia's progress
3. **Sync to Claude Desktop** by updating the Project Memory
4. **Commit changes** to version control

## 📊 Related Resources

- **Live Web App:** https://ymarquezla.github.io/UniversityAdvisor/
- **Repository:** https://github.com/ymarquezla/UniversityAdvisor
- **Source Code:** `university-shortlist-explorer-v4.html`

## 🎯 Success Criteria

The agent is successful when:
- Sophia has a balanced shortlist (2-3 Reach, 4-5 Match, 2-3 Safety)
- Total costs are understood and affordable
- Application timeline is clear
- Sophia feels confident about her choices
- Unique advantages (EU citizenship, languages) are leveraged

## 📝 License

MIT License - Free to use and modify for educational purposes.

---

**Created:** December 2025
**Maintained by:** Yomar Marquez
**For:** Sophia's European University Search
