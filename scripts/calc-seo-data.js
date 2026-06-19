/** SEO content blocks for calculator pages — used by inject-calc-seo.js */
module.exports = {
  emi: {
    guide: '/guides/emi-guide/', guideTitle: 'Home Loan EMI Guide',
    intro: 'An Equated Monthly Instalment (EMI) is the fixed amount you repay each month on a home, car, or personal loan in India. Banks use the reducing-balance method: interest is charged on the outstanding principal, so early EMIs contain a larger interest component. For a typical ₹50 lakh home loan at 8.5% over 20 years, your EMI is approximately ₹43,391 — but total interest paid exceeds ₹54 lakh. Understanding EMI before you sign a loan agreement helps you choose the right tenure, compare lenders, and plan your monthly budget alongside SIP and tax-saving investments.',
    formula: 'EMI = P × R × (1+R)^N / ((1+R)^N − 1), where P = loan principal, R = monthly interest rate (annual rate ÷ 12 ÷ 100), N = tenure in months.',
    example: 'For a ₹30,00,000 home loan at 8.5% p.a. for 15 years (180 months): monthly rate R = 0.7083%, EMI ≈ ₹29,542, total payment ≈ ₹53.2 lakh, total interest ≈ ₹23.2 lakh. Extending tenure to 25 years drops EMI to ~₹24,180 but total interest rises to ~₹42.5 lakh — almost double the interest cost for a lower monthly outflow.',
    factors: ['Loan tenure — longer tenure lowers EMI but increases total interest significantly', 'Interest rate — even 0.25% difference saves lakhs on large home loans', 'Processing fee & insurance — add to effective cost beyond EMI', 'Prepayment — partial prepayment reduces outstanding principal and future interest', 'Fixed vs floating rate — floating rates change with RBI repo cycles'],
    extraFaqs: [
      { q: 'What is a good EMI to salary ratio in India?', a: 'Most banks prefer total EMIs (all loans combined) to stay within 40–50% of net monthly income. If your in-hand salary is ₹50,000, keep EMIs under ₹20,000–25,000. Use our salary calculator to estimate in-hand pay, then plan loan size accordingly.' },
      { q: 'How much interest will I pay on a ₹50 lakh home loan?', a: 'At 8.5% for 20 years, total interest is roughly ₹54.1 lakh on top of ₹50 lakh principal. At 20 years vs 15 years, you pay approximately ₹15 lakh more in interest for the same loan amount — always compare total cost, not just EMI.' },
      { q: 'Does car loan EMI work the same as home loan EMI?', a: 'Yes, the formula is identical. Car loans typically carry 9–11% interest and shorter tenures (3–7 years). A ₹10 lakh car loan at 9% for 5 years gives EMI around ₹20,758. Default risk is higher, so rates exceed home loans.' }
    ]
  },
  sip: {
    guide: '/guides/sip-investment-guide/', guideTitle: 'SIP Investment Guide',
    intro: 'A Systematic Investment Plan (SIP) lets you invest a fixed amount in mutual funds every month. In India, most AMCs accept SIPs from ₹500/month. Returns compound over time: ₹5,000/month at 12% CAGR grows to roughly ₹11.6 lakh in 10 years, ₹49.5 lakh in 20 years, and ₹1.76 crore in 30 years. SIPs benefit from rupee cost averaging — you buy more units when markets fall and fewer when they rise, smoothing volatility over long horizons.',
    formula: 'Future Value = P × [((1+r)^n − 1) / r] × (1+r), where P = monthly SIP, r = monthly return (derived from annual CAGR), n = number of months.',
    example: 'Investing ₹10,000/month for 10 years at 12% expected return: total invested = ₹12 lakh, estimated corpus ≈ ₹22.4 lakh, wealth gained ≈ ₹10.4 lakh. To reach ₹50 lakh in 10 years at 12%, you need roughly ₹21,500/month SIP.',
    factors: ['Investment horizon — SIP works best for 5+ year goals', 'Expected return — equity funds historically 10–12% long term; not guaranteed', 'Fund category — equity for long term, debt for short term', 'Step-up SIP — increasing SIP 10% annually accelerates corpus significantly', 'Market timing — SIP removes need to time the market'],
    extraFaqs: [
      { q: 'Can I start SIP with ₹500 per month in India?', a: 'Yes. Most mutual fund houses allow minimum SIP of ₹500/month. Popular direct platforms include Groww, Zerodha Coin, and AMC websites. Start small and increase as income grows.' },
      { q: 'What return rate should I use in a SIP calculator?', a: 'For equity mutual funds, 10–12% annual return is commonly used for long-term projections. Debt funds: 6–8%. These are estimates — actual returns vary with market conditions. Never treat calculator output as guaranteed returns.' },
      { q: 'Is SIP better than lump sum investment?', a: 'SIP suits salaried investors with regular income and reduces timing risk. Lump sum can outperform if invested at market lows but requires large capital upfront. Many investors combine both strategies.' }
    ]
  },
  salary: {
    guide: '/guides/salary-guide/', guideTitle: 'Salary & CTC Guide',
    intro: 'CTC (Cost to Company) is not your in-hand salary. It includes employer PF, gratuity accrual, insurance, and gross pay. For a ₹6 LPA package with 40% basic in Karnataka, expect roughly ₹47,000–48,000 in-hand under the new tax regime after PF (₹1,800), professional tax (₹200), and TDS. Comparing job offers on CTC alone can mislead by ₹3,000–5,000 per month.',
    formula: 'In-Hand = Gross Salary − Employee PF − Professional Tax − TDS − Other deductions. Gross = Basic + HRA + Allowances + Bonus (as applicable).',
    example: '₹8 LPA CTC, basic 40% (₹3.2L/year), HRA 40% of basic, Karnataka employment: gross ~₹66,667/month, PF ₹1,800, PT ₹200, TDS varies by regime — in-hand often ₹58,000–62,000 with new regime and minimal deductions.',
    factors: ['Basic salary percentage — drives PF, gratuity, and HRA calculations', 'Tax regime — old vs new significantly changes TDS', 'HRA exemption — requires rent receipts under old regime', 'Variable pay — may not be guaranteed monthly', 'State professional tax — ₹0 to ₹250/month depending on state'],
    extraFaqs: [
      { q: 'What percentage of CTC is in-hand salary in India?', a: 'Typically 75–85% of monthly gross, or 65–75% of CTC divided by 12, depending on structure and tax regime. High basic % increases PF but may increase tax under old regime.' },
      { q: 'Is employer PF part of my in-hand salary?', a: 'No. Employer PF is part of CTC but not credited to your bank account — it goes to your EPF account. Only employee PF (max ₹1,800/month) is deducted from payslip.' }
    ]
  },
  'income-tax': {
    guide: '/guides/tax-saving-guide/', guideTitle: 'Tax Saving Guide',
    intro: 'India offers two tax regimes for FY 2026-27. The new regime provides a ₹75,000 standard deduction and rebate making income up to ₹12 lakh effectively zero tax for many salaried employees. The old regime allows deductions under 80C (₹1.5L), 80D, HRA, and home loan interest — beneficial if you have high rent, home loan, or disciplined tax-saving investments.',
    formula: 'Tax = apply slab rates on taxable income after deductions. New regime slabs: 0–4L nil, 4–8L 5%, 8–12L 10%, 12–16L 15%, 16–20L 20%, 20–24L 25%, above 24L 30% (plus cess).',
    example: '₹12 lakh annual salary, new regime, no other income: taxable after ₹75K standard deduction = ₹11.25L, tax after rebate often ₹0. Same salary, old regime with ₹1.5L 80C + ₹25K 80D + ₹2L HRA exemption: taxable income can drop by ₹3–4 lakh, saving ₹30,000–50,000 tax.',
    factors: ['Regime selection — choose at start of FY, switchable in some cases', '80C investments — ELSS, PPF, EPF, LIC, tuition fees', 'HRA — only under old regime with valid rent proof', 'NPS 80CCD(1B) — extra ₹50,000 beyond 80C', 'Home loan — 80C principal + 24(b) interest deductions'],
    extraFaqs: [
      { q: 'Which tax regime is better for ₹8 LPA salary?', a: 'If you claim less than ₹2–2.5 lakh in total deductions (80C + HRA + 80D), new regime often wins. With home loan + HRA + full 80C, old regime may save ₹20,000–40,000 annually. Use this calculator to compare side by side.' },
      { q: 'What is zero tax up to ₹12 lakh in new regime?', a: 'Combination of revised slabs, ₹75,000 standard deduction, and Section 87A rebate can reduce tax to zero for many salaried taxpayers with income around ₹12 lakh. Exact outcome depends on your full income and surcharge applicability.' }
    ]
  },
  hra: {
    guide: '/guides/hra-exemption-guide/', guideTitle: 'HRA Exemption Guide',
    intro: 'House Rent Allowance (HRA) exemption under Section 10(13A) reduces taxable salary if you pay rent and receive HRA from your employer. Exemption is the least of: (1) actual HRA received, (2) rent paid minus 10% of basic salary, (3) 50% of basic for metro cities (Mumbai, Delhi, Kolkata, Chennai) or 40% for non-metro. Available only under the old tax regime.',
    formula: 'Exemption = min(Actual HRA, Rent − 10% of Basic, 50%/40% of Basic). Taxable HRA = HRA received − exemption.',
    example: 'Basic ₹25,000/month, HRA ₹12,000, rent ₹15,000 in Bangalore (non-metro): (1) ₹12,000, (2) ₹15,000 − ₹2,500 = ₹12,500, (3) 40% × ₹25,000 = ₹10,000. Exemption = ₹10,000/month = ₹1.2 lakh/year tax saved at 30% slab ≈ ₹36,000.',
    factors: ['Metro vs non-metro — 50% vs 40% of basic rule', 'Rent receipts — mandatory; landlord PAN if rent > ₹1L/year', 'Old regime only — no HRA exemption in new regime', 'Basic salary definition — must match Form 16', 'Living with parents — rent agreement required for legitimate claims'],
    extraFaqs: [
      { q: 'Can I claim HRA if I live with my parents?', a: 'Yes, if you pay rent to parents and have a valid rent agreement and bank transfer records. Parents must declare rental income in their ITR. The arrangement must be genuine — tax authorities scrutinise sham agreements.' },
      { q: 'Is Bangalore a metro city for HRA?', a: 'For HRA purposes, only Mumbai, Delhi, Kolkata, and Chennai are metros (50% rule). Bangalore, Hyderabad, Pune use the 40% of basic rule despite being large cities.' }
    ]
  },
  gratuity: {
    guide: '/guides/gratuity-guide/', guideTitle: 'Gratuity Guide',
    intro: 'Gratuity is a statutory benefit under the Payment of Gratuity Act for employees who complete 5+ years of continuous service. Formula: (Last drawn salary × 15 × years of service) / 26, where salary = basic + DA. Maximum gratuity is capped at ₹20 lakh. Employers often include gratuity accrual in CTC without it appearing in monthly in-hand pay.',
    formula: 'Gratuity = (Basic + DA) × 15 × Years of Service / 26. For employees not covered under the Act, companies may use their own policy.',
    example: 'Basic + DA = ₹30,000/month, 10 years service: Gratuity = 30,000 × 15 × 10 / 26 = ₹1,73,077. If basic is ₹1,00,000/month for 20 years: ₹11,53,846 — below ₹20L cap.',
    factors: ['5-year minimum service — except death/disablement', '₹20 lakh cap — applies to private sector since 2019 amendment', 'Tax exemption — up to ₹20 lakh on gratuity received', 'Included in CTC — not part of monthly salary', 'Last drawn salary — basic + DA only, not full CTC'],
    extraFaqs: [
      { q: 'Is gratuity taxable in India?', a: 'Government employees have separate rules. Private sector employees: gratuity up to ₹20 lakh is exempt under Section 10(10). Amount above cap is taxable as salary income.' },
      { q: 'Can I get gratuity before 5 years?', a: 'Generally no, except in case of death or disablement. Resigning before 5 years forfeits gratuity at most companies, though some employers pay ex-gratia voluntarily.' }
    ]
  },
  epf: {
    guide: '/guides/epf-guide/', guideTitle: 'EPF Complete Guide',
    intro: 'Employees Provident Fund (EPF) is mandatory for establishments with 20+ employees where basic salary is up to ₹15,000 (optional above). Employee contributes 12% of basic; employer contributes 12% (3.67% to EPF, 8.33% to EPS pension). EPF interest rate for FY 2025-26 is 8.25%. Contributions earn tax-free interest and qualify for 80C deduction.',
    formula: 'Monthly EPF (employee) = 12% × min(Basic, ₹15,000). Corpus grows with compound interest at declared rate (8.25% for FY 2025-26).',
    example: 'Basic ₹20,000/month for 10 years at 8.25%: employee contributes ₹1,800/month (capped), employer ₹1,800 to EPF — combined corpus approximately ₹6–7 lakh depending on wage ceiling rules applied by employer.',
    factors: ['₹15,000 basic cap — maximum ₹1,800/month employee contribution', 'UAN — links all EPF accounts across employers', 'Withdrawal rules — full withdrawal after 2 months unemployment', 'EPS pension — 8.33% of employer share for pension scheme', 'VPF — voluntary higher contribution allowed'],
    extraFaqs: [
      { q: 'How do I check EPF balance online?', a: 'Use EPFO portal (epfindia.gov.in) with UAN, UMANG app, missed call to 011-22901406, or SMS "EPFOHO UAN" to 7738299899. Activate UAN with employer if not done already.' },
      { q: 'What is the current EPF interest rate?', a: 'EPFO declared 8.25% for FY 2025-26. Rate is reviewed annually by the EPFO board. Interest is credited once a year to your account.' }
    ]
  },
  ppf: {
    guide: '/guides/ppf-fd-guide/', guideTitle: 'PPF & FD Guide',
    intro: 'Public Provident Fund (PPF) is a 15-year government-backed savings scheme with current interest rate of 7.1% p.a. (Q1 FY 2026). Minimum deposit ₹500/year, maximum ₹1.5 lakh/year. Interest and maturity are tax-free (EEE status). Ideal for long-term safe savings alongside equity SIP for diversification.',
    formula: 'Maturity = annual deposits compounded monthly at declared PPF rate. Extension blocks of 5 years available after initial 15 years.',
    example: 'Depositing ₹1.5 lakh every year for 15 years at 7.1%: maturity approximately ₹40.7 lakh. Starting at age 30, PPF matures at 45 — useful for child education or partial retirement corpus.',
    factors: ['₹1.5L annual limit — across all PPF accounts combined', '15-year lock-in — partial withdrawal from year 7 allowed', 'Tax-free returns — EEE exempt-exempt-exempt', 'Rate revision — quarterly by government', 'Loan against PPF — available from 3rd to 6th year'],
    extraFaqs: [
      { q: 'PPF vs FD — which is better?', a: 'PPF offers tax-free returns and 7.1% rate with 15-year lock-in. FDs offer 6.5–7.5% for 1–5 years but interest is taxable. PPF wins for long-term tax-free wealth; FD suits short-term goals.' },
      { q: 'Can I have two PPF accounts?', a: 'Only one PPF account per individual is allowed. Minor accounts can be opened by parents. Excess accounts are merged or penalised.' }
    ]
  },
  fd: {
    guide: '/guides/ppf-fd-guide/', guideTitle: 'PPF & FD Guide',
    intro: 'Fixed Deposits (FD) are bank deposits with guaranteed returns for a fixed tenure. Senior citizens often get 0.25–0.50% extra. SBI, HDFC, ICICI FD rates for 1–5 years typically range 6.5–7.5% in 2026. Interest is fully taxable at your slab rate. TDS applies if interest exceeds ₹40,000/year (₹50,000 for seniors).',
    formula: 'Maturity = P × (1 + r/n)^(n×t) for compound FD, or P + P×r×t for simple FD structures. Most bank FDs compound quarterly.',
    example: '₹5 lakh FD at 7% for 5 years compounded quarterly: maturity ≈ ₹7.07 lakh, interest ≈ ₹2.07 lakh before tax. At 30% tax slab, post-tax interest ≈ ₹1.45 lakh.',
    factors: ['Tenure — longer often higher rate up to a point', 'Senior citizen rates — typically +0.50%', 'Tax on interest — no 80C unless 5-year tax-saver FD', 'Premature withdrawal — penalty of 0.5–1% on rate', 'DICGC insurance — deposits insured up to ₹5 lakh per bank'],
    extraFaqs: [
      { q: 'Which bank FD is best in India 2026?', a: 'Rates change frequently. Small finance banks sometimes offer 8%+ but carry different risk perception. Compare SBI, HDFC, ICICI, and post office schemes. Always check DICGC coverage and lock-in terms.' },
      { q: 'Is FD interest taxable?', a: 'Yes. FD interest is added to total income and taxed at your slab. TDS at 10% if interest exceeds ₹40,000/year. Submit Form 15G/15H if eligible to avoid TDS.' }
    ]
  },
  rd: {
    guide: '/guides/ppf-fd-guide/', guideTitle: 'PPF & FD Guide',
    intro: 'Recurring Deposit (RD) lets you deposit a fixed amount monthly for a set tenure. Post Office RD and bank RDs typically offer 6.5–7.5% for 5-year tenures. Useful for disciplined short-term savings when SIP market risk is not suitable. Interest is taxable like FD.',
    formula: 'RD maturity uses compound interest on each monthly instalment. Each deposit earns for different remaining periods.',
    example: '₹5,000/month RD for 5 years at 7%: invested ₹3 lakh, maturity approximately ₹3.6–3.7 lakh depending on compounding frequency.',
    factors: ['Monthly discipline — missed deposits may attract penalty', 'Taxable interest — same as FD', 'Flexible tenures — 6 months to 10 years at most banks', 'Post Office RD — popular for rural savers', 'vs SIP — RD guaranteed rate but lower long-term returns than equity'],
    extraFaqs: [
      { q: 'RD vs SIP — which is better?', a: 'RD gives guaranteed returns (6–7%) for short goals under 3 years. SIP in equity funds targets 10–12% long term with market risk. For 5+ year wealth creation, SIP historically outperforms RD.' },
      { q: 'Can I break RD before maturity?', a: 'Yes, but banks charge penalty (typically 1% on interest rate) and may pay reduced interest. Partial withdrawal rules vary by bank.' }
    ]
  },
  gst: {
    guide: '/guides/gst-guide/', guideTitle: 'GST Guide for India',
    intro: 'Goods and Services Tax (GST) in India has four main slabs: 5%, 12%, 18%, and 28%, plus 0% and 3% for precious metals. Most services attract 18% GST. Businesses above ₹40 lakh turnover (₹20 lakh in special category states) must register. GSTIN is required for B2B invoicing and input tax credit claims.',
    formula: 'GST Amount = Taxable Value × Rate / 100. Total = Taxable Value + GST. For reverse: Base = Total / (1 + Rate/100).',
    example: 'Product price ₹10,000 + 18% GST: GST = ₹1,800, total = ₹11,800. Inclusive pricing ₹11,800: base = ₹10,000, GST = ₹1,800.',
    factors: ['CGST + SGST — split equally for intra-state sales', 'IGST — inter-state transactions', 'Input tax credit — offset GST paid on purchases', 'Composition scheme — simplified compliance for small business', 'HSN/SAC codes — determine applicable rate'],
    extraFaqs: [
      { q: 'What is 18% GST applicable on?', a: 'Most services (telecom, professional fees, restaurants with AC), electronics, and many goods fall under 18%. Essential items like milk, fresh vegetables are exempt or at 0%.' },
      { q: 'How do I calculate GST inclusive price?', a: 'Divide total by (1 + rate/100). For 18% inclusive: base = total / 1.18. Use our calculator for instant add/remove GST calculations.' }
    ]
  },
  'net-worth': {
    guide: '/guides/retirement-planning-guide/', guideTitle: 'Retirement Planning Guide',
    intro: 'Net worth is total assets minus total liabilities — the single best snapshot of financial health. For a 30-year-old Indian professional: ₹5L savings + ₹8L EPF + ₹12L mutual funds + ₹50L home value − ₹35L home loan − ₹5L car loan = net worth ₹35 lakh. Track quarterly to measure progress toward financial independence.',
    formula: 'Net Worth = Total Assets − Total Liabilities. Include liquid assets, investments, property at market value, minus all outstanding loans and credit card debt.',
    example: 'Assets: ₹2L cash, ₹10L EPF, ₹15L MFs, ₹40L flat = ₹67L. Liabilities: ₹25L home loan, ₹2L personal loan = ₹27L. Net worth = ₹40L.',
    factors: ['Home value — use realistic market price, not purchase price', 'Don\'t ignore liabilities — credit cards, personal loans', 'EPF/PPF — count as assets', 'Depreciating assets — car value drops yearly', 'Emergency fund — liquid asset, not investment'],
    extraFaqs: [
      { q: 'What is a good net worth at 30 in India?', a: 'Rule of thumb: net worth = age × annual income / 10. At 30 earning ₹10L/year, target ₹30L net worth. High COL cities may require adjustment. Focus on trend, not absolute number.' },
      { q: 'Should I include my home in net worth?', a: 'Yes at current market value minus outstanding home loan (equity only). Some planners exclude primary residence for FIRE calculations — be consistent in how you track.' }
    ]
  },
  retirement: {
    guide: '/guides/retirement-planning-guide/', guideTitle: 'Retirement Planning Guide',
    intro: 'Retirement planning in India must account for 25–30 years post-retirement life, inflation at 6%, and rising healthcare costs. Rule: need 25–30× your annual expenses as corpus. If you spend ₹50,000/month today, at 6% inflation you need ~₹2.9 lakh/month in 25 years — corpus target roughly ₹5–7 crore depending on withdrawal rate.',
    formula: 'Corpus needed = Annual expenses at retirement × 25–30 (4% withdrawal rule). SIP required = calculate backward from target corpus, return, and years to retirement.',
    example: 'Age 30, retire at 60, current monthly expense ₹40,000, 6% inflation: expense at 60 ≈ ₹2.3 lakh/month. Corpus at 4% withdrawal ≈ ₹6.9 crore. Monthly SIP needed at 12% return ≈ ₹15,000–20,000 for 30 years.',
    factors: ['Inflation — 6% long-term average for India', 'Healthcare buffer — add 15–20% to expense estimate', 'EPF/PPF — include existing corpus', 'NPS — additional retirement pillar with tax benefits', 'Post-retirement return — assume conservative 7–8%'],
    extraFaqs: [
      { q: 'How much corpus do I need to retire at 50 in India?', a: 'If monthly expenses are ₹1 lakh at retirement (today\'s value), inflated corpus target is ₹3–5 crore minimum for 30 years of retirement, depending on lifestyle and city. Use this calculator with your exact numbers.' },
      { q: 'Is ₹1 crore enough to retire in India?', a: '₹1 crore generating 7% = ₹7 lakh/year ≈ ₹58,000/month before tax. Viable in tier-2/3 cities with owned home; insufficient for metro luxury lifestyle. Factor inflation — ₹1 crore in 20 years buys much less.' }
    ]
  },
  lumpsum: {
    guide: '/guides/sip-investment-guide/', guideTitle: 'SIP Investment Guide',
    intro: 'Lumpsum investment means deploying a large amount in mutual funds or other assets at once — common with bonuses, inheritance, or property sale proceeds. ₹5 lakh invested at 12% CAGR for 10 years grows to approximately ₹15.5 lakh. Timing matters more than SIP; however, research shows time in market beats timing over decades.',
    formula: 'Future Value = P × (1 + r)^n, where P = lumpsum, r = annual return, n = years.',
    example: '₹10 lakh bonus invested at 12% for 15 years = ₹54.7 lakh. Same amount in debt fund at 7% = ₹27.6 lakh. Equity suits 7+ year horizons; debt for shorter goals.',
    factors: ['Market level — STP from debt to equity reduces timing risk', 'Tax — equity LTCG 12.5% above ₹1.25L/year', 'Goal alignment — match asset class to timeline', 'Emergency fund first — don\'t invest lumpsum needed within 3 years', 'Diversification — split across large-cap, mid-cap, debt'],
    extraFaqs: [
      { q: 'Should I invest bonus as lump sum or SIP?', a: 'If market is volatile, STP (Systematic Transfer Plan) over 6–12 months reduces risk. For long-term investors with 10+ year horizon, lump sum into equity historically outperforms waiting.' },
      { q: 'Lump sum vs SIP — which gives higher returns?', a: 'Lump sum wins if invested at market lows. SIP wins on risk-adjusted basis and affordability. Most salaried Indians use SIP; deploy lumpsums when available.' }
    ]
  },
  'step-up-sip': {
    guide: '/guides/sip-investment-guide/', guideTitle: 'SIP Investment Guide',
    intro: 'Step-up SIP increases your monthly investment by a fixed percentage each year — matching salary hikes. Starting ₹5,000/month with 10% annual step-up for 20 years at 12% return builds roughly ₹75–80 lakh vs ₹49.5 lakh flat SIP — nearly 60% more corpus from the same starting amount.',
    formula: 'Each year SIP amount = previous year × (1 + step-up %). Total corpus = sum of compounded monthly investments with increasing amounts.',
    example: '₹5,000/month, 10% annual increase, 15 years, 12% return: total invested ~₹18.6 lakh, corpus ~₹45 lakh vs flat SIP corpus ~₹25 lakh.',
    factors: ['Step-up rate — 5–15% typical, match salary growth', 'Discipline — automate step-up with fund house', 'Start early — compounding amplifies step-up benefit', 'Review annually — adjust rate if income jumps', 'Fund selection — same as regular SIP'],
    extraFaqs: [
      { q: 'What is a good step-up percentage for SIP?', a: '10% annually aligns with typical Indian salary hikes of 8–12%. Even 5% step-up significantly beats flat SIP over 15+ years. Increase step-up rate after promotions.' },
      { q: 'Which funds offer step-up SIP facility?', a: 'Most major AMCs and platforms (Groww, Zerodha Coin, MF Central) support step-up SIP. Minimum step-up varies — typically ₹500/month increase annually.' }
    ]
  },
  'compound-interest': {
    guide: '/guides/sip-investment-guide/', guideTitle: 'SIP Investment Guide',
    intro: 'Compound interest earns returns on both principal and accumulated interest — the foundation of long-term wealth. ₹1 lakh at 8% compounded annually becomes ₹2.16 lakh in 10 years and ₹4.66 lakh in 20 years. Einstein allegedly called compound interest the eighth wonder of the world; for Indian investors, PPF, FD, and mutual fund SIP all harness compounding.',
    formula: 'A = P × (1 + r/n)^(n×t), where A = final amount, P = principal, r = annual rate, n = compounding frequency, t = time in years.',
    example: '₹2 lakh in PPF at 7.1% for 15 years (annual compounding): ≈ ₹5.6 lakh. Same in FD at 7% quarterly: ≈ ₹5.7 lakh. Small rate and frequency differences compound significantly.',
    factors: ['Compounding frequency — monthly > quarterly > annual', 'Time horizon — most powerful variable', 'Rate of return — 1% difference over 20 years is huge', 'Regular additions — SIP adds compounding layers', 'Tax drag — post-tax return matters'],
    extraFaqs: [
      { q: 'Compound vs simple interest — difference?', a: 'Simple interest: ₹1L at 8% for 5 years = ₹40,000 interest. Compound: ₹1L at 8% for 5 years = ₹46,933. Gap widens with time — over 20 years compound gives nearly double simple interest.' },
      { q: 'Where do Indians get compound interest?', a: 'PPF, FD, RD, EPF, mutual fund SIP, and NSC all compound. Equity mutual funds compound through reinvested NAV growth.' }
    ]
  },
  'simple-interest': {
    guide: '/guides/ppf-fd-guide/', guideTitle: 'PPF & FD Guide',
    intro: 'Simple interest is calculated only on the original principal — common in short-term personal loans, some gold loans, and school-level finance. Formula: SI = P × R × T / 100. A ₹1 lakh loan at 12% simple interest for 2 years costs ₹24,000 interest (total ₹1.24 lakh). Most bank loans use reducing balance (compound) instead, which costs less for early repayment.',
    formula: 'Simple Interest = P × R × T / 100. Total Amount = P + SI. P = principal, R = annual rate %, T = time in years.',
    example: '₹50,000 at 10% simple interest for 3 years: SI = 50,000 × 10 × 3 / 100 = ₹15,000. Total = ₹65,000. Same on reducing balance would cost slightly less if repaid early.',
    factors: ['Used in — some microfinance, pawn loans, short bonds', 'vs reducing balance — banks use reducing for home/car loans', 'Time in years — convert months to years for formula', 'Flat rate loans — often simple interest disguised', 'Compare always — ask for effective annual rate'],
    extraFaqs: [
      { q: 'Do banks use simple or compound interest on home loans?', a: 'Home loans in India use reducing balance method (effectively compound on outstanding). Simple interest appears in some informal loans and certain short-term products.' },
      { q: 'Which is cheaper — simple or compound interest for borrowers?', a: 'Reducing balance (compound on outstanding) is cheaper if you prepay early because interest is on remaining principal. Flat/simple rate loans can hide higher effective rates — always compare APR.' }
    ]
  },
  cagr: {
    guide: '/guides/sip-investment-guide/', guideTitle: 'SIP Investment Guide',
    intro: 'Compound Annual Growth Rate (CAGR) measures smoothed annual return between two values over time. If your ₹1 lakh investment grew to ₹2.5 lakh in 5 years, CAGR = (2.5/1)^(1/5) − 1 = 20.1%. CAGR ignores volatility — a fund that doubled in year 1 and flatlined shows same CAGR as steady growth. Use with XIRR for SIP cash flows.',
    formula: 'CAGR = (Final Value / Initial Value)^(1/n) − 1, where n = years. Express as percentage × 100.',
    example: 'Nifty 50 index from ~8,000 (2015) to ~24,000 (2025): CAGR ≈ 11.6% over 10 years. ₹5 lakh growing at 12% CAGR for 8 years = ₹12.4 lakh.',
    factors: ['Not risk-adjusted — high CAGR may hide volatility', 'Past performance — doesn\'t guarantee future returns', 'vs XIRR — use XIRR for irregular SIP/redemption flows', 'Benchmark comparison — compare fund CAGR vs Nifty 50', 'Period selection — CAGR varies wildly by start/end dates'],
    extraFaqs: [
      { q: 'What is good CAGR for mutual funds in India?', a: 'Large-cap equity funds: 10–12% CAGR over 10+ years historically. Mid-cap: 12–15% with higher volatility. Debt funds: 6–8%. Always compare against benchmark index CAGR.' },
      { q: 'CAGR vs absolute return — difference?', a: 'Absolute return = total % gain (e.g. 150% over 10 years). CAGR = smoothed annual rate (9.6% for same example). CAGR allows comparison across different time periods.' }
    ]
  },
  swp: {
    guide: '/guides/retirement-planning-guide/', guideTitle: 'Retirement Planning Guide',
    intro: 'Systematic Withdrawal Plan (SWP) lets you withdraw a fixed amount from mutual fund investments monthly — ideal for retirement income. With ₹50 lakh corpus in a balanced fund earning 10% annually, withdrawing ₹40,000/month may last 15–18 years depending on returns. SWP is tax-efficient vs FD interest for many investors in lower slabs.',
    formula: 'Withdrawal sustainability depends on corpus, monthly withdrawal, and post-tax return. Remaining corpus each month = (Previous − Withdrawal) × (1 + monthly return).',
    example: '₹60 lakh corpus, ₹50,000/month SWP, 9% annual return: corpus may last ~14 years. At ₹35,000/month, lasts 22+ years. Start conservative — withdraw 4–5% of corpus annually.',
    factors: ['Withdrawal rate — 4% rule from US adapts to 5–6% for India with higher inflation', 'Fund choice — hybrid or debt-oriented for stability', 'Tax — SWP from equity funds: only gain portion taxed', 'Inflation — increase SWP 5–6% annually', 'Market sequence risk — early bear market depletes corpus faster'],
    extraFaqs: [
      { q: 'SWP vs FD for monthly income?', a: '₹50L FD at 7% gives ~₹29,000/month interest (taxable). SWP from debt/hybrid fund may offer similar with potentially better tax treatment on growth portion. Equity SWP suits longer horizons with higher risk.' },
      { q: 'How long will ₹1 crore last with SWP?', a: 'At ₹50,000/month (6% annual withdrawal) with 8% fund return: roughly 20–25 years. Increase withdrawals for inflation each year and duration shortens. Use this calculator for precise projection.' }
    ]
  },
  inflation: {
    guide: '/guides/retirement-planning-guide/', guideTitle: 'Retirement Planning Guide',
    intro: 'Inflation erodes purchasing power — at 6% inflation, ₹100 today buys what ₹94 buys next year. ₹10 lakh today equals roughly ₹5.6 lakh purchasing power in 10 years at 6% inflation. Retirement planning must inflate current expenses: ₹40,000/month lifestyle today = ₹1.3 lakh/month needed in 20 years at 6%.',
    formula: 'Future Value = Present Value × (1 + inflation)^years. Real return = (1 + nominal return) / (1 + inflation) − 1.',
    example: '₹50,000 monthly expenses today, 6% inflation for 25 years: equivalent expense ₹2.15 lakh/month at retirement. Corpus needed at 4% withdrawal ≈ ₹6.45 crore.',
    factors: ['India CPI — historically 5–6% long term', 'Education/medical inflation — often 10–12%', 'Real vs nominal returns — subtract inflation from investment return', 'Salary growth — often beats inflation for professionals', 'Gold/real estate — traditional inflation hedges in India'],
    extraFaqs: [
      { q: 'What inflation rate to use for retirement planning in India?', a: 'Use 6% for general expenses, 8–10% for healthcare and education costs. Conservative planners use 7% overall. Underestimating inflation is a common retirement planning mistake.' },
      { q: 'How does inflation affect SIP returns?', a: 'If SIP returns 12% and inflation is 6%, real return ≈ 5.7%. Your corpus grows in nominal terms but purchasing power grows slower. Always evaluate goals in today\'s rupees.' }
    ]
  }
};
