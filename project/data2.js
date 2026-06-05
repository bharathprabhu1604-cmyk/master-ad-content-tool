/* LAMF Ad Content Tool — copy bank, content tracker, meta/bing, guidelines reference. */
(function () {
  const D = window.LAMF_DATA;

  D.copyBank = {
    usps: [
      ["Rate Advantage", "LAMF @ 10.5%* p.a. — interest only on amount utilized"],
      ["No Redemption", "MF units lien-marked, not sold — portfolio continues to grow"],
      ["No Tax Trigger", "No capital gains tax event — no redemption = no tax"],
      ["Speed", "100% digital process — fast approval, fast disbursal"],
      ["Regulation", "SEBI & RBI regulated NBFC — trusted and compliant"],
      ["Legacy", "40+ years of trust — Shriram Credit since 1974"],
      ["Portfolio Safety", "Investments intact while you access funds"],
      ["Flexibility", "Interest only on the amount you use, not full limit"],
      ["Limit", "Funds up to ₹2 Cr* based on MF portfolio value"],
      ["Comparison", "Significantly lower rate than personal loans (typically 18–24%)"],
    ],
    ctas: [
      "Apply for LAMF", "Check Eligibility", "Check Your Loan Value", "Unlock a Credit Line",
      "Unlock My Funds", "Calculate LAMF Eligibility", "Pledge Now", "Pledge MF",
      "Unlock Your Credit Limit", "Get Approved in 5 Minutes", "Get Cash, Stay Invested", "Learn More About LAMF",
    ],
    powerWords: [
      ["Urgency", "Instantly · Fast · Quick · Now · Today · Minutes"],
      ["Safety", "Secure · Protected · Safe · Intact · Preserved · Lien-Marked"],
      ["Trust", "Trusted · Regulated · Legacy · SEBI · RBI · 40+ Years"],
      ["Smart/Savvy", "Smarter · Intelligent · Strategic · Wise · Efficient"],
      ["Fear of Loss", "Don't Break · Don't Sell · Don't Redeem · Protect"],
      ["Exclusivity", "Your Portfolio · Your Wealth · Your Future · Your Goals"],
      ["Comparison", "Better than · Unlike loans · vs personal loan · smarter"],
      ["Simplicity", "Simple · Easy · Digital · Paperless · No Branch Visit"],
    ],
    avoid: [
      ["Product Name", "'mutual fund loans', 'loan against mutual funds' (lowercase), 'MF loans'"],
      ["Rate", "'10.5%' without asterisk, '10.5 percent', 'lowest rate' (superlative)"],
      ["Competitor", "Any specific bank/NBFC/fintech name comparison (e.g. 'better than HDFC')"],
      ["Guarantee", "'guaranteed approval', 'guaranteed rate', 'no rejection'"],
      ["Superlatives", "'best', 'lowest', 'fastest', '#1' — unless documented"],
    ],
  };

  D.tracker = [
    [1, "Google Search", "RSA", "LAMF — Personal Loan Intercept", "Headlines (15) + Descriptions (4)", "Priya Nair", "Jun 12", "Review", "A. Mehta"],
    [2, "Google Search", "RSA", "LAMF — Instant Cash Intercept", "Headlines (15) + Descriptions (4)", "Priya Nair", "Jun 12", "In Progress", "A. Mehta"],
    [3, "Google Search", "RSA", "LAMF — Emergency Cash Intercept", "Headlines (15) + Descriptions (4)", "Rohan Das", "Jun 14", "Not Started", "A. Mehta"],
    [4, "Google Search", "RSA", "LAMF — Urgent Money Intercept", "Headlines (15) + Descriptions (4)", "Rohan Das", "Jun 14", "Not Started", "A. Mehta"],
    [5, "Google Search", "RSA", "LAMF — Low Interest Loan Intercept", "Headlines (15) + Descriptions (4)", "Priya Nair", "Jun 13", "In Progress", "A. Mehta"],
    [6, "Google Search", "RSA", "LAMF — Wealth Preservation", "Headlines (15) + Descriptions (4)", "Sara Iyer", "Jun 16", "Not Started", "A. Mehta"],
    [7, "Google Search", "Extensions", "All Campaigns", "Sitelinks (8) + Callouts (20)", "Sara Iyer", "Jun 10", "Approved", "A. Mehta"],
    [8, "Google Search", "Extensions", "All Campaigns", "Structured Snippets + Promos", "Sara Iyer", "Jun 11", "Review", "A. Mehta"],
    [9, "Google Display", "Responsive", "LAMF — Display Awareness", "Short HLs (10) + Long HLs (5) + Descs (5)", "Rohan Das", "Jun 18", "Not Started", "—"],
    [10, "Google PMax", "Performance Max", "LAMF — PMax", "All asset groups — HLs + Descs + Images", "Priya Nair", "Jun 20", "Not Started", "—"],
    [11, "Google Demand Gen", "Demand Gen", "LAMF — DemandGen", "HLs (5) + Descs (5) per variation", "Sara Iyer", "Jun 22", "Not Started", "—"],
    [12, "Meta Facebook", "Lead Gen", "LAMF — FB Lead Gen", "Primary Text V1-V5 + HL V1-V5", "Priya Nair", "Jun 15", "In Progress", "A. Mehta"],
    [13, "Meta Facebook", "Conversions", "LAMF — FB Retargeting", "Primary Text V1-V5 + HL V1-V5", "Rohan Das", "Jun 17", "Not Started", "—"],
    [14, "Meta Facebook", "Awareness", "LAMF — FB Awareness", "Primary Text V1-V5 + HL V1-V5", "Sara Iyer", "Jun 19", "Not Started", "—"],
    [15, "Meta Instagram", "Stories", "LAMF — IG Stories", "Story overlay text (3 variations)", "Priya Nair", "Jun 19", "Not Started", "—"],
    [16, "Microsoft Bing", "RSA", "LAMF — Bing Personal Loan", "Headlines (15) + Descriptions (4)", "Rohan Das", "Jun 21", "Not Started", "—"],
    [17, "Microsoft Bing", "RSA", "LAMF — Bing Emergency", "Headlines (15) + Descriptions (4)", "Rohan Das", "Jun 23", "Not Started", "—"],
  ];

  // Meta Facebook copy (Lead Gen ad set) — from workbook
  D.meta = {
    objective: "Lead Generation",
    adSet: "Lookalike — MF Investors",
    audience: "1% LLA of MF investors, 30-55, metro India",
    placement: "Facebook Feed · Instagram Feed · Stories",
    cta: "Apply Now",
    finalUrl: "https://www.shriramcredit.com/lamf/apply",
    primaryText: [
      { use: "A/B", text: "Skip the personal loan. Your MF portfolio can fund your needs at 10.5%* p.a. — lien-mark your units, get cash, stay invested. 100% digital." },
      { use: "A/B", text: "Why pay 18%+ on a personal loan? With LAMF, pledge your MF units and get funds at 10.5%* p.a. MF units lien-marked, not sold. Apply now." },
      { use: "Rate Focus", text: "LAMF @ 10.5%* p.a. — nearly half the cost of a personal loan. Your MF units stay invested while you access instant liquidity. ✓ SEBI & RBI regulated." },
      { use: "USP Focus", text: "You've built a portfolio. Now let it work for you. Pledge your MF units, get funds at 10.5%* p.a. — no redemption, no tax event, no delay. ✓ 100% digital." },
      { use: "Trust Focus", text: "Shriram Credit — SEBI & RBI regulated NBFC, 40+ years of trust. LAMF: pledge MF units, access funds fast, stay invested. Apply digitally today." },
    ],
    headlines: [
      "LAMF @ 10.5%* p.a. — Stay Invested",
      "Don't Break Your Portfolio. Pledge It.",
      "Funds In Minutes. Wealth Intact.",
      "MF Units Safe. Cash In Hand.",
      "Smarter Than A Personal Loan",
    ],
    linkDesc: [
      "Pledge MF. Access cash. Stay invested.",
      "10.5%* p.a. — lower than any loan.",
      "100% digital. Apply in minutes.",
      "SEBI & RBI regulated. 40+ yrs trust.",
      "No MF sold. No tax. Fast disbursal.",
    ],
    limits: { primary: 125, headline: 40, linkDesc: 30 },
  };

  D.guidelines = [
    ["Google Search", "RSA", "Headline", 3, 15, "30", "Pin 1=intent, Pin 2=LAMF rate, Pin 3=CTA. Use all 15 for best coverage."],
    ["Google Search", "RSA", "Description", 1, 4, "90", "Pin 1=rate reframe, Pin 2=trust+CTA. Aim 80-85 chars."],
    ["Google Search", "RSA", "Display URL Path", 0, 2, "15", "Each path ≤15 chars. Readable keywords e.g. /lamf /apply-now"],
    ["Google Search", "RSA", "Sitelink Title", 4, 20, "25", "Minimum 4 sitelinks. Keyword-rich, action-oriented text."],
    ["Google Search", "RSA", "Callout Extension", 4, 20, "25", "Minimum 4. Use specific USPs not generic phrases."],
    ["Google Display", "Responsive", "Short Headline", 5, 15, "30", "Min 5 required. Google combines automatically. Include brand."],
    ["Google Display", "Responsive", "Long Headline", 1, 5, "90", "At least 1 required. Must make sense standalone."],
    ["Google PMax", "Performance Max", "Headline", 3, 15, "30", "Same limits as RSA. Min 3, max 15. Aim for 10+."],
    ["Google PMax", "Performance Max", "Image (Landscape)", 1, 20, "1200×628", "1.91:1 ratio. Keep text away from edges."],
    ["Google Demand Gen", "Demand Gen", "Headline", 1, 5, "40", "More chars than RSA. Be compelling — interruption media."],
    ["Meta Facebook", "Lead Gen / Conv.", "Primary Text", 1, 5, "125", "Recommended ≤125 chars (truncated in feed). Max 500."],
    ["Meta Facebook", "Lead Gen / Conv.", "Headline", 1, 5, "40", "Recommended ≤40 chars (max 255). Bold below image."],
    ["Meta Facebook", "Lead Gen / Conv.", "Link Description", 0, 1, "30", "Desktop only. Recommended ≤30 chars (max 125)."],
    ["Meta Instagram", "Stories", "Story Image/Video", 1, 10, "1080×1920", "9:16 ratio. 14% safe zone top + bottom."],
    ["Microsoft Bing", "RSA", "Headline", 3, 15, "30", "Identical to Google RSA limits. Same pin strategy."],
    ["Microsoft Bing", "RSA", "Description", 2, 4, "90", "Bing recommends min 2 descriptions."],
  ];

  D.copyRules = [
    ["RULE 1", "Product Name", "Use 'LAMF' or 'Loan Against MF' only. Never lowercase 'mutual funds' or 'mutual fund loans'."],
    ["RULE 2", "Rate Mention", "Always use 10.5%* p.a. with asterisk and 'p.a.'. Never bare '10.5%'."],
    ["RULE 3", "No Redemption", "Phrase as 'MF units lien-marked, not sold' / 'No redemption' / 'Don't sell MF — pledge it'."],
    ["RULE 4", "Compliance *", "No Foreclosure Charges*, Zero Processing Fees*, No Capital Gains Tax* — all need * + sign-off."],
    ["RULE 5", "Max Loan", "State as 'up to ₹2 Cr*' with asterisk. Subject to portfolio value & eligibility."],
    ["RULE 6", "Regulatory", "'SEBI & RBI Regulated NBFC' — exact phrasing. Do not abbreviate or rephrase."],
    ["RULE 7", "Competitor", "Do NOT name specific competitor lenders. Use generic 'personal loans' or '18%+'."],
    ["RULE 8", "Pinning", "HL Pin 2 = 'LAMF @ 10.5%* p.a.' must ALWAYS be pinned as HL2 across all Search campaigns."],
  ];

  // Channels for the dashboard / sidebar mapping
  D.channelMeta = {
    "Google Search": { short: "Google", color: "#1A73E8" },
    "Google Display": { short: "Display", color: "#1A73E8" },
    "Google PMax": { short: "PMax", color: "#1A73E8" },
    "Google Demand Gen": { short: "Demand Gen", color: "#1A73E8" },
    "Meta Facebook": { short: "Meta", color: "#1877F2" },
    "Meta Instagram": { short: "Instagram", color: "#C13584" },
    "Microsoft Bing": { short: "Bing", color: "#0078D4" },
  };
})();
