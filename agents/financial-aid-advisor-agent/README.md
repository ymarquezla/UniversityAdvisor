# Financial Aid Advisor Agent

**AI agent for finding scholarships, grants, and optimal loan strategies to fund Sophia's European university education.**

---

## Purpose

This agent helps Sophia and her family:
- **Find scholarships and grants** she's eligible for (merit, need-based, women in STEM, study abroad)
- **Calculate true cost of attendance** for European universities (tuition + living + travel + fees)
- **Build funding packages** combining scholarships, savings, and minimal loans
- **Minimize debt** while maximizing educational opportunities
- **Compare ROI** across different universities and funding scenarios
- **Navigate FAFSA** and US federal aid for study abroad

---

## Key Features

### 1. Comprehensive Cost Analysis
- Breaks down total 3-4 year cost (tuition, living, travel, fees)
- Accounts for country-specific costs (Germany €350/yr vs Netherlands €2,314/yr)
- Calculates true cost of attendance beyond just tuition

### 2. Scholarship Discovery
- **Women in STEM scholarships** (Google, Palantir, Adobe, SWE, NCWIT, etc.)
- **Study abroad scholarships** (Benjamin Gilman, Boren, Fund for Education Abroad)
- **Merit-based scholarships** (university-specific, academic excellence)
- **Need-based scholarships** (US federal Pell Grant, private foundations)
- **Field-specific scholarships** (AI/Data Science programs)
- **Local scholarships** (Rotary, community foundations, employer programs)

### 3. Funding Package Builder
Creates realistic funding plans showing:
- Family savings and contributions
- Scholarship opportunities (applied, pending, awarded)
- Part-time work income (student jobs, internships)
- Federal grants (Pell Grant up to $7,395/year)
- Federal loans (subsidized and unsubsidized)
- NET DEBT at graduation

### 4. Loan Optimization
- Prioritizes federal subsidized loans (lowest cost)
- Avoids private loans (higher interest, less flexible)
- Calculates monthly payments and payback periods
- Provides debt minimization strategies

### 5. ROI Comparison
Compares universities on:
- Total cost of attendance
- Scholarship potential
- Expected post-graduation salary
- Payback period
- Career opportunities and alumni network

### 6. FAFSA Guidance
- Explains US federal aid for study abroad
- Walks through FAFSA completion process
- Identifies eligible European universities
- Calculates Pell Grant eligibility

---

## Sophia's Unique Advantages for Scholarships

This agent leverages Sophia's strengths:

1. **EU Citizenship** → Saves €43,000+ vs non-EU tuition rates
2. **Woman in STEM** → Hundreds of women-in-tech scholarships available
3. **Trilingual** → German + English + Spanish (C1) = unique selling point
4. **Dual Citizenship** → Eligible for both US and EU funding sources
5. **US Citizen Studying Abroad** → Qualifies for study-abroad scholarships (Gilman, etc.)
6. **AI/Data Science Field** → High-demand field with industry scholarships

---

## Agent Files

### [instructions.md](./instructions.md)
Complete agent instructions including:
- Core mission and goals
- Sophia's profile (academic, financial, citizenship)
- Financial aid categories (scholarships, grants, work, loans)
- Cost analysis framework
- Scholarship search strategy
- Timeline and action plan
- ROI analysis methods
- Tone and interaction guidelines

### [memory.md](./memory.md)
Tracks across conversations:
- Family financial profile (income, savings, monthly contributions)
- Scholarship applications (applied, pending, awarded)
- Funding packages for each university
- FAFSA status and federal aid eligibility
- Work opportunities and income
- ROI comparisons
- Deadlines and action items

### [examples.md](./examples.md)
Sample conversations demonstrating:
- Initial financial situation assessment
- Cost of attendance calculations
- Scholarship search (women in STEM focus)
- Complete funding package building
- University cost and ROI comparisons
- Loan strategy and minimization
- FAFSA walkthrough

---

## How to Use This Agent

### For Sophia & Family:
1. **Share financial situation** (income, savings, loan tolerance)
2. **Review cost breakdowns** for target universities
3. **Get personalized scholarship lists** based on her profile
4. **Build funding packages** showing how to cover costs
5. **Compare universities** by net cost after aid
6. **Create action plan** with scholarship deadlines

### For Development:
- Use [instructions.md](./instructions.md) as the custom instructions in Claude
- Reference [memory.md](./memory.md) to maintain context across conversations
- Use [examples.md](./examples.md) to train response style

---

## Example Use Cases

**"How much will University of Passau cost for 3 years?"**
→ Agent provides detailed breakdown: tuition (€1,050), living (€33,840), travel (€2,400), fees (€450) = **€38,740 total**

**"What scholarships can I apply for as a woman studying AI?"**
→ Agent lists 7+ women-in-STEM scholarships (Google, Palantir, Adobe, SWE, etc.) with amounts, deadlines, and application tips

**"We can contribute $15k savings + $300/month. How do we cover the rest?"**
→ Agent builds complete funding package: family contribution + scholarships + part-time work + Pell Grant + minimal loans = **ZERO DEBT or low debt**

**"Should I choose cheap University of Passau or more expensive Maastricht?"**
→ Agent compares: cost difference (€10k), scholarship potential, post-graduation salary, ROI, career outcomes → helps make informed decision

**"What's the smartest way to borrow €15,000?"**
→ Agent recommends: federal subsidized loans first (no interest in school), then unsubsidized, avoid private loans → monthly payment €159, payback <10 years

---

## Target Outcome

**Goal:** Help Sophia graduate with **minimal or ZERO debt** while attending a high-quality AI/Data Science program in Europe.

**Success Metrics:**
- Total debt at graduation: **€0-€15,000** (vs €100k+ at US universities)
- Scholarship awards: **€8,000-€20,000+** over 3-4 years
- Family financial stress: **Low** (clear plan, realistic budget)
- ROI: **Excellent** (low cost, strong career outcomes)

---

## Integration with University Advisor Agent

This Financial Aid Advisor works in tandem with the **University Advisor Agent**:

- **University Advisor** helps Sophia find the right schools (fit, programs, reach/match/safety)
- **Financial Aid Advisor** helps Sophia afford those schools (scholarships, cost analysis, funding packages)

Together, they create a **comprehensive university planning system** covering both academic fit and financial feasibility.

---

## Updates & Maintenance

**To update this agent:**
1. Revise [instructions.md](./instructions.md) with new scholarship opportunities, cost data, or strategies
2. Update [memory.md](./memory.md) with Sophia's latest financial profile and scholarship applications
3. Add new conversation examples to [examples.md](./examples.md) as use cases evolve

**Key data to refresh annually:**
- FAFSA Pell Grant maximum amounts
- Federal loan interest rates
- University tuition rates (especially EU statutory rates)
- Scholarship deadlines and amounts
- Living cost estimates for European cities

---

## Created By

**Ymarquez** - December 2024

Part of the **UniversityAdvisor** project helping Sophia navigate European university applications and financial planning.

---

## License & Usage

Free to use and adapt. If you find this agent helpful, consider:
- Sharing it with other students navigating study abroad financing
- Contributing new scholarship opportunities or cost-saving strategies
- Providing feedback on what worked (or didn't) in your financial planning journey

---

**Remember:** Sophia's EU citizenship alone saves her €43,000+ in tuition. Combined with scholarships and smart financial planning, a debt-free European education in AI is absolutely achievable! 🎓💰✨
