/**
 * One-shot: replace cloned How-to / Formula / FAQ stacks on remaining calculators.
 * Run: node scripts/rewrite-calc-explainers.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'calculators');
const BY = `<p class="editorial-byline">Written by <a href="/about/">Rizwan Ali</a> · Last verified 18 August 2026 · <a href="/editorial-policy/">Editorial policy</a></p>`;

function faqs(heading, items) {
  return `<section class="section-sm">
    <div class="container">
      <div class="section-header"><h2>${heading}</h2></div>
      <div class="faq-list">
${items.map(([q, a]) => `        <div class="faq-item">
          <button class="faq-q" type="button">${q}<span class="faq-icon">+</span></button>
          <div class="faq-a">${a}</div>
        </div>`).join('\n')}
      </div>
    </div>
  </section>`;
}

function article(inner) {
  return `<section class="section-sm calc-seo-section">
    <div class="container">
      <div class="calc-seo-content">
${inner}
        ${BY}
      </div>
    </div>
  </section>`;
}

const pages = {};

pages['simple-interest'] = article(`        <h2>The “flat 12%” quote is usually not what the bank books</h2>
        <p>Simple interest is <code>P × R × T / 100</code> — interest only on the original principal. That is how school sums work, and how some gold loans, pawn products, and informal lending still quote. Indian home, car, and personal loans almost never work this way. They use a <strong>reducing-balance EMI</strong>: interest each month is on the leftover principal, not on the original ₹10 lakh.</p>
        <p>The trap is a “flat rate”. A dealer says 8% flat on a ₹5 lakh car loan for 4 years. Simple-interest interest = ₹5,00,000 × 8% × 4 = ₹1,60,000, EMI ≈ ₹13,750. On a reducing-balance 8% loan the interest is far lower. The quoted “8% flat” often hides an effective rate near 14–15%. Always ask for the <em>reducing-balance</em> rate, or run the same rupees through the <a href="/calculators/emi/">EMI calculator</a>.</p>
        <table class="compare-table">
          <thead><tr><th>Quote</th><th>Interest on ₹5 lakh, 4 years</th><th>What to compare</th></tr></thead>
          <tbody>
            <tr><td>8% simple / flat</td><td>₹1,60,000</td><td>Looks cheap on a banner</td></tr>
            <tr><td>8% reducing EMI</td><td>≈ ₹85,000</td><td>What a bank home/car loan actually books</td></tr>
            <tr><td>12% simple, 2 years, ₹1 lakh</td><td>₹24,000</td><td>Use this page for that quote</td></tr>
          </tbody>
        </table>
        <div class="when-grid">
          <div class="when-card use">
            <h3>Use this page when</h3>
            <ul>
              <li>A lender gave you a flat or simple rate</li>
              <li>You are checking a gold-loan or short personal loan quote</li>
              <li>You need the school formula for a homework or contract clause</li>
            </ul>
          </div>
          <div class="when-card skip">
            <h3>Do not use it for</h3>
            <ul>
              <li>Home loan EMI (reducing balance)</li>
              <li>Bank FD / RD / PPF (those compound)</li>
              <li>Mutual fund SIP projections</li>
            </ul>
          </div>
        </div>
        <p class="related-inline">Related: <a href="/calculators/compound-interest/">compound interest</a> · <a href="/calculators/emi/">EMI</a></p>`) + faqs('Simple vs reducing balance', [
  ['Why does my car dealer quote a “flat” rate?', 'Flat/simple interest is charged on the original principal for the full tenure even as you repay. Banks usually charge reducing-balance interest. Convert the quote with this page, then compare the same loan on the EMI calculator.'],
  ['How do I enter 18 months?', 'Use years as a decimal: 18 months = 1.5. Interest for ₹2 lakh at 10% for 1.5 years = ₹30,000.'],
  ['Is education-loan interest simple?', 'Many education loans accrue simple interest during the moratorium, then convert to reducing-balance EMIs. Read the sanction letter; do not assume this formula for the full life of the loan.'],
  ['Does prepaying a simple-interest loan help as much as an EMI loan?', 'On a true simple-interest contract, interest does not fall as principal falls unless the contract says so. On a reducing-balance EMI, early prepayment cuts future interest. That is why the product type matters more than the headline rate.'],
  ['Where does monthly interest come from on this page?', 'We divide total simple interest by months in the tenure so you can compare against an EMI. It is not how a reducing-balance loan books interest.']
]);

pages['compound-interest'] = article(`        <h2>Compounding is a frequency choice, not a slogan</h2>
        <p>The formula is A = P(1 + r/n)<sup>nt</sup>. The part people skip is <strong>n</strong> — how often interest is added back. Indian bank FDs typically compound <em>quarterly</em> (n = 4). PPF is credited yearly on the lowest balance in a month, which behaves closer to monthly for regular deposits. A mutual-fund “12% CAGR” is not a compounding schedule at all; it is a smoothed return.</p>
        <p>Rule of 72: years to double ≈ 72 / rate. At 8%, about 9 years; at 12%, about 6 years. That is a teaching shortcut, not a forecast.</p>
        <table class="compare-table">
          <thead><tr><th>₹1 lakh at 8% for 10 years</th><th>Maturity (approx.)</th></tr></thead>
          <tbody>
            <tr><td>Simple interest</td><td>₹1,80,000</td></tr>
            <tr><td>Annual compound</td><td>₹2,15,892</td></tr>
            <tr><td>Quarterly (typical FD)</td><td>₹2,20,800</td></tr>
            <tr><td>Monthly</td><td>₹2,21,964</td></tr>
          </tbody>
        </table>
        <p>The jump from simple to annual is large. The jump from quarterly to monthly is small. If a brochure shouts “daily compounding”, check the rate first — a 0.25% lower card rate wipes out the extra frequency.</p>
        <div class="omit-box">
          <h3>This page does not model tax</h3>
          <p>FD and RD interest is added to your income. PPF interest is exempt. Equity mutual funds are not “8% compounded monthly”. Use the <a href="/calculators/fd/">FD calculator</a> when the product is a bank deposit, and the <a href="/calculators/sip/">SIP calculator</a> when cash flows are monthly investments.</p>
        </div>
        <p class="related-inline">Related: <a href="/calculators/simple-interest/">simple interest</a> · <a href="/calculators/fd/">FD</a> · <a href="/calculators/ppf/">PPF</a></p>`) + faqs('Compounding in Indian products', [
  ['Why is quarterly the default for FDs?', 'Most scheduled banks compound cumulative FDs quarterly. Enter n = 4 here, or use the FD page which already defaults to quarterly and shows a year table.'],
  ['Does EPF compound like this formula?', 'EPF interest is declared yearly by EPFO and credited to the account. Treating it as annual compound at the notified rate is a planning estimate, not the EPFO ledger.'],
  ['Is daily compounding always better?', 'Only at the same nominal rate. Banks sometimes advertise daily compounding with a lower rate. Compare maturity rupees, not the adjective.'],
  ['How is this different from CAGR?', 'This page grows a starting principal at a constant rate. CAGR looks backward at two portfolio values. A lumpy SIP needs XIRR, not this formula.'],
  ['What is effective annual rate on the result?', 'It is the yearly yield after compounding frequency is applied — useful when two FDs quote the same card rate with different n.']
]);

pages['fd'] = article(`        <h2>The card rate is not your post-tax yield</h2>
        <p>A cumulative FD uses A = P(1 + r/n)<sup>nt</sup>. Indian banks usually take <strong>n = 4</strong> (quarterly). Leave compounding on quarterly unless the deposit slip says otherwise. Non-cumulative FDs pay interest out monthly or quarterly; this page models money left in until maturity.</p>
        <p>Interest is <em>income</em>. At a 30% slab, 7% pre-tax is about 4.9% after tax (plus 4% cess on the tax). TDS is typically 10% if interest at that bank exceeds the notified threshold (commonly ₹40,000 a year, ₹50,000 for senior citizens — confirm on the latest TDS circular). Submit Form 15G/15H if you are eligible so the bank does not withhold. A 5-year tax-saver FD can sit in Section 80C; ordinary FDs do not.</p>
        <table class="compare-table">
          <thead><tr><th>₹5 lakh, 7%, 5 years, quarterly</th><th>Rupees</th></tr></thead>
          <tbody>
            <tr><td>Maturity before tax</td><td>≈ ₹7.07 lakh</td></tr>
            <tr><td>Interest</td><td>≈ ₹2.07 lakh</td></tr>
            <tr><td>After 30% tax + cess on interest (illustrative)</td><td>keep ≈ ₹1.45 lakh of interest</td></tr>
          </tbody>
        </table>
        <div class="omit-box">
          <h3>DICGC and breakage</h3>
          <p>Deposit insurance covers ₹5 lakh per bank (principal + interest) under current DICGC rules — not per FD. Premature withdrawal usually cuts 0.5–1% from the applicable rate and may reprice the whole period. Senior-citizen extra (often 0.25–0.50%) is a bank tariff, not this formula.</p>
        </div>
        <p>Compare PPF when you want EEE treatment and can lock 15 years. Compare a debt fund only after you accept NAV risk. Walkthrough: <a href="/guides/ppf-fd-guide/">PPF vs FD</a> and <a href="/guides/fd-vs-sip-guide/">FD vs SIP</a>.</p>
        <p class="related-inline">Related: <a href="/calculators/rd/">RD</a> · <a href="/calculators/ppf/">PPF</a> · <a href="/calculators/income-tax/">income tax</a></p>`) + faqs('FD tax, TDS, and compounding', [
  ['Cumulative vs non-cumulative — which does this calculate?', 'Cumulative: interest stays in the deposit (this page). Non-cumulative: the bank credits interest to your account. Same card rate, different cash-flow and slightly different effective yield.'],
  ['Does a senior citizen just add 0.50% in the rate box?', 'If that is what the bank tariff says, yes — type the higher rate. The extra is not automatic in the formula.'],
  ['Will this match my passbook to the rupee?', 'Banks use their own day-count and rounding. Treat the table as an estimate. Confirm the maturity slip before you break or ladder deposits.'],
  ['Is small-finance-bank 8%+ always better?', 'Higher card rate can still sit inside DICGC’s ₹5 lakh cap. Split across banks if the stack is larger. Rate is not the only risk.'],
  ['When does 80C apply?', 'Only on specified 5-year tax-saver FDs, within the ₹1.5 lakh 80C cap, and only under the old tax regime. Interest on those FDs is still taxable.']
]);

pages['ppf'] = article(`        <h2>PPF is a 15-year calendar, not a flexible FD</h2>
        <p>Public Provident Fund is a government scheme: minimum ₹500 and maximum ₹1.5 lakh per financial year across all PPF accounts you hold. The interest rate is notified every quarter (7.1% p.a. was in force for recent quarters — re-check the DEA/NSO circular before you treat a 15-year projection as fixed). Interest is credited on the lowest balance between the 5th and the last day of each month, which is why depositing before the 5th matters.</p>
        <p>Tax treatment is EEE under current law: 80C on the deposit (old regime), interest exempt, maturity exempt. That is the main reason PPF beats a similar-rate FD after tax for someone in the 20–30% slab who can lock money.</p>
        <table class="compare-table">
          <thead><tr><th>Account year</th><th>What you can usually do</th></tr></thead>
          <tbody>
            <tr><td>1–3</td><td>Deposit only. Loan window typically opens from year 3.</td></tr>
            <tr><td>3–6</td><td>Loan against balance (not a withdrawal).</td></tr>
            <tr><td>7–15</td><td>Partial withdrawal allowed under PPF rules (limits apply).</td></tr>
            <tr><td>End of 15</td><td>Mature, or extend in 5-year blocks with or without fresh deposits.</td></tr>
          </tbody>
        </table>
        <p>₹1.5 lakh every year for 15 years at a constant 7.1% is a common illustration near ₹40 lakh. If the notified rate falls, the table on this page will overstate. If you skip a year, you still need the ₹500 minimum to keep the account from defaulting.</p>
        <p class="related-inline">Rules overview: <a href="/guides/ppf-fd-guide/">PPF vs FD guide</a> · <a href="/calculators/epf/">EPF</a> (different product, also 80C)</p>`) + faqs('PPF lock-in, 80C, and the 5th of the month', [
  ['Why does the month’s 5th date matter?', 'Interest for a month is on the lowest balance from the 5th to month-end. A deposit on the 6th often waits until the next month to start earning.'],
  ['Can I open PPF and still use EPF 80C?', '80C is one ₹1.5 lakh bucket (old regime). EPF employee contribution already uses part of it. PPF deposits compete with ELSS, life premium, and home-loan principal.'],
  ['What if I need money in year 4?', 'You typically cannot withdraw. A loan against PPF may be available from year 3. Treat PPF as money you will not spend on a house down-payment in five years.'],
  ['Does extension after 15 years reset the rate?', 'You keep the same account; the government still revises the rate quarterly. Extension is not a new 15-year lock at today’s 7.1% forever.'],
  ['Is the year-wise table the post office ledger?', 'It compounds the annual deposit you typed at a constant rate. The PO/bank passbook uses monthly lowest-balance rules and the rate then in force.']
]);

pages['rd'] = article(`        <h2>An RD is a stack of tiny FDs, not a SIP</h2>
        <p>Every month you put the same rupees in. Each instalment then earns for a shorter leftover tenor. Banks in India often compound RD interest quarterly; post office RD follows Department of Posts rules. This page estimates maturity from monthly deposits and the annual rate you type — your bank’s rounding will differ by a few rupees.</p>
        <p>Interest is taxable like FD interest. TDS can apply once interest at that bank crosses the notified threshold. There is no 80C on a normal bank RD (unlike a 5-year tax-saver FD or PPF).</p>
        <table class="compare-table">
          <thead><tr><th></th><th>Bank / PO RD</th><th>Equity SIP</th></tr></thead>
          <tbody>
            <tr><td>Return</td><td>Contracted rate (today often mid-6s to mid-7s)</td><td>Market-linked; not guaranteed</td></tr>
            <tr><td>Best use</td><td>A known expense in 1–5 years</td><td>A 7+ year goal</td></tr>
            <tr><td>Missed month</td><td>Penalty / default terms</td><td>You can skip; NAV path changes</td></tr>
            <tr><td>Tax</td><td>Interest at slab</td><td>Capital-gains rules on redemption</td></tr>
          </tbody>
        </table>
        <p>₹5,000 a month for 60 months is ₹3 lakh of your money. At 7%, maturity is a few tens of thousands above that — useful for a wedding or gadget, not a substitute for a 15-year SIP. If the goal is 12 months away, an RD or a short FD ladder beats hoping equity is up in March.</p>
        <p class="related-inline"><a href="/guides/fd-vs-sip-guide/">FD vs SIP guide</a> · <a href="/calculators/sip/">SIP calculator</a> · <a href="/calculators/fd/">FD</a></p>`) + faqs('RD vs FD vs SIP', [
  ['Is post office RD the same formula as a bank RD?', 'Same idea (monthly deposits), different circulars and compounding. Use the rate printed on your PO/bank passbook, not a random web average.'],
  ['Can I withdraw one month’s deposit?', 'Standard RDs usually do not allow partial withdrawal. You close the RD (penalty) or wait. Recurring is not a savings account.'],
  ['Why is tenure in months?', 'RD tenures are sold as 6, 12, 24, 36, 60 months more often than “5 years”. Enter 60 for a five-year RD.'],
  ['Does stepping up the RD amount work like step-up SIP?', 'Only if the bank lets you change the instalment. Many RDs are fixed at opening. For rising monthly savings, a SIP or a fresh RD each year is cleaner.'],
  ['Standing instruction bounced — what happens?', 'Banks may charge a missed-instalment fee and can close the RD if defaults pile up. Check the account rules; this calculator assumes every month was paid.']
]);

pages['epf'] = article(`        <h2>The ₹15,000 wage ceiling is doing most of the work</h2>
        <p>For a typical private establishment, employee EPF is 12% of PF wages. PF wages are often capped at <strong>₹15,000 a month</strong>, so employee contribution maxes at ₹1,800 even if basic is ₹40,000 — unless your employer runs PF on higher wages (some do; the offer letter says so). Employer 12% on the ceiling is split: 8.33% of ₹15,000 toward EPS (pension) and the rest toward EPF. EPS is not the same corpus this calculator compounds.</p>
        <p>Interest is declared by EPFO for each financial year (8.25% was notified for FY 2025-26; confirm the latest year on <a href="https://www.epfindia.gov.in/" rel="noopener">epfindia.gov.in</a>). This page compounds at the rate you type. It is a planning estimate, not your passbook.</p>
        <table class="compare-table">
          <thead><tr><th>Monthly basic</th><th>Employee 12% if capped at ₹15,000</th></tr></thead>
          <tbody>
            <tr><td>₹12,000</td><td>₹1,440</td></tr>
            <tr><td>₹15,000</td><td>₹1,800</td></tr>
            <tr><td>₹50,000 (statutory cap only)</td><td>still ₹1,800 unless PF is on higher wages</td></tr>
          </tbody>
        </table>
        <ul class="checklist">
          <li>UAN on the EPFO portal stitches old employer accounts. Transfer; do not casually withdraw on every job change if you want compounding to continue.</li>
          <li>Employee contribution can count toward 80C (old regime), together with PPF and ELSS in the same ₹1.5 lakh cap.</li>
          <li>Tax on withdrawal depends on years of service and current Section 10(12) / TDS rules — not modelled here.</li>
        </ul>
        <p class="related-inline">Longer: <a href="/guides/epf-guide/">EPF guide</a> · <a href="/calculators/salary/">salary (in-hand after PF)</a></p>`) + faqs('EPF ceiling, EPS, and UAN', [
  ['Why is my PF only ₹1,800 when basic is ₹25,000?', 'Statutory PF wages are often capped at ₹15,000. 12% × 15,000 = ₹1,800. Some employers contribute on full basic; that is a company policy, not the legal minimum.'],
  ['Does employer 12% all go to my EPF corpus?', 'No. On capped wages, 8.33% of ₹15,000 typically goes to EPS (pension). Only the EPF slice compounds as “PF balance”.'],
  ['Should I add VPF?', 'Voluntary PF can raise the employee share above 12%. It still sits in the EPFO ecosystem. Compare with PPF and an equity SIP for money you can lock until retirement.'],
  ['I changed jobs — is corpus lost?', 'It sits with UAN. File a transfer to the new establishment. A premature withdrawal can be taxable and resets compounding.'],
  ['Is 8.25% guaranteed next year?', 'No. EPFO notifies a rate each year. This calculator uses whatever % you enter.']
]);

pages['gratuity'] = article(`        <h2>15 days’ wages per year, using a 26-day month</h2>
        <p>For employees covered by the Payment of Gratuity Act, 1972, the usual formula is <strong>(last drawn basic + DA) × 15 × completed years / 26</strong>. The 26 is a working-day month, not a calendar month. HRA, bonus, and special allowance are not in “wages” for this formula. CTC is not an input.</p>
        <p>Five years of continuous service with the same employer is the usual eligibility (death and disablement are exceptions). The current statutory ceiling on gratuity for covered private-sector employees is ₹20 lakh. Government employees follow different exemption rules. Tax exemption for private-sector gratuity sits in Section 10(10) — amounts above the exempt slice are taxable.</p>
        <p>Worked: basic+DA ₹40,000, 12 years → 40,000 × 15 × 12 / 26 ≈ ₹2.77 lakh. Same person at ₹1.2 lakh basic+DA for 20 years → about ₹13.85 lakh, still under ₹20 lakh.</p>
        <div class="omit-box">
          <h3>Rounding of service</h3>
          <p>Many establishments treat more than six months in the last year as a full year. Enter 10.6 if that is how HR counts; this tool will not guess your standing order. Gratuity often appears in CTC as an accrual you never see in monthly in-hand — use the <a href="/calculators/salary/">salary calculator</a> for take-home, not this page.</p>
        </div>
        <p class="related-inline"><a href="/guides/gratuity-guide/">Gratuity guide</a> · <a href="/calculators/epf/">EPF</a></p>`) + faqs('Gratuity Act, ₹20 lakh, and CTC', [
  ['I completed 4 years 8 months. Eligible?', 'Usually no, unless death/disablement or a more generous company policy. Five years is the Act’s normal line.'],
  ['Why divide by 26?', 'The Act treats a month as 26 working days, so 15/26 is “15 days’ wages” per year of service.'],
  ['Is the ₹20 lakh cap tax or payout?', 'It is a statutory maximum payout for many covered private employees, and it also lines up with the common tax-exemption ceiling under Section 10(10). Confirm both with HR and a CA if you are near the cap.'],
  ['Start-up is not under the Act — then what?', 'Some shops use a similar formula in the offer letter; others pay nothing. This calculator still runs 15/26 so you can compare, but the Act may not bind that employer.'],
  ['Does joining bonus count in last drawn salary?', 'No. Use basic + DA only unless your policy explicitly includes other components.']
]);

pages['cagr'] = article(`        <h2>CAGR is a straight line between two dots</h2>
        <p>CAGR = (End / Start)<sup>1/years</sup> − 1. It answers only: “If this lumpsum had grown at a constant rate, what rate?” It does not see the crash in year two or the bounce in year five. A fund that went ₹1 lakh → ₹2 lakh in twelve months and then sat still for four years can show the same five-year CAGR as a fund that grinded up smoothly.</p>
        <p>Period shopping is the usual abuse. Nifty from a market low to a high looks heroic; the same index from a previous high looks dull. Always write the start date and end date next to the number.</p>
        <table class="compare-table">
          <thead><tr><th>Measure</th><th>Use it for</th><th>Do not use it for</th></tr></thead>
          <tbody>
            <tr><td>CAGR</td><td>One lumpsum, two values, n years</td><td>Monthly SIPs</td></tr>
            <tr><td>Absolute return</td><td>“It made 80% in three years”</td><td>Comparing a 3-year fund to a 10-year fund</td></tr>
            <tr><td>XIRR</td><td>SIP, STP, withdrawals</td><td>A single purchase with no other cash flows (CAGR is enough)</td></tr>
          </tbody>
        </table>
        <p>Illustration: ₹1 lakh → ₹2.5 lakh in 5 years is about 20.1% CAGR. That is not a promise that the next five years repeat. For SIPs, open the fund’s XIRR on the AMC factsheet or your app — this page will overstate or understate if you paste “total invested” as Start and “current value” as End.</p>
        <p class="related-inline"><a href="/calculators/lumpsum/">lumpsum projection</a> · <a href="/calculators/sip/">SIP</a></p>`) + faqs('CAGR vs XIRR vs absolute return', [
  ['Can CAGR be negative?', 'Yes. If End is below Start, the rate is a loss, annualised. That is still a CAGR.'],
  ['I have a SIP. Which box is Start?', 'Do not use this page. Start/End CAGR assumes one cash flow. Use XIRR in your CAMS/KFin/app statement.'],
  ['Should I compare my fund to Nifty CAGR?', 'Yes, over the same start and end dates. A 12% fund CAGR against an 11% Nifty CAGR is a different story from 12% against a 16% Nifty CAGR.'],
  ['Does CAGR include dividends?', 'Only if End already includes reinvested dividends (total return). Price-only CAGR ignores payouts.'],
  ['Is a “good” Indian equity CAGR 12%?', 'Long-term large-cap history often lands around that neighbourhood, with ugly decades in between. It is not a hurdle this calculator certifies.']
]);

pages['lumpsum'] = article(`        <h2>A bonus is one cash flow. A SIP is many.</h2>
        <p>This page is FV = P(1 + r)<sup>t</sup> with a constant r you typed. That is the right sketch for “I will put the joining bonus in a fund and not add more.” It is the wrong sketch for salary SIPs (use <a href="/calculators/sip/">SIP</a>) and the wrong sketch for reality: equity does not earn 12% every year.</p>
        <p>Sequence risk: investing ₹10 lakh the week before a 30% drawdown feels nothing like the compound table. A common Indian workaround is an STP — park the bonus in a liquid or short-duration fund and move a slice to equity each month for 6–12 months. That is a behaviour choice, not a higher formula return.</p>
        <table class="compare-table">
          <thead><tr><th>₹10 lakh, 15 years</th><th>At 7%</th><th>At 12%</th></tr></thead>
          <tbody>
            <tr><td>Future value (constant r)</td><td>≈ ₹27.6 lakh</td><td>≈ ₹54.7 lakh</td></tr>
            <tr><td>Fits</td><td>Debt-ish / FD-like assumption</td><td>Optimistic equity illustration</td></tr>
          </tbody>
        </table>
        <div class="when-grid">
          <div class="when-card use">
            <h3>Deploy lumpsum when</h3>
            <ul>
              <li>The money is genuinely spare for 7+ years</li>
              <li>Emergency fund and near-term EMIs are already covered</li>
              <li>You accept that year-one NAV can fall</li>
            </ul>
          </div>
          <div class="when-card skip">
            <h3>Hold back when</h3>
            <ul>
              <li>The down-payment is in 18 months</li>
              <li>This is the only cash buffer</li>
              <li>You would panic-sell a 20% drawdown</li>
            </ul>
          </div>
        </div>
        <p>Tax on mutual funds is on redemption (LTCG/STCG rules then in force), not on this projection. Equity LTCG currently has a threshold and a rate that change with Budgets — do not hard-code last year’s 12.5% into a 15-year dream number.</p>
        <p class="related-inline"><a href="/guides/sip-investment-guide/">SIP guide</a> · <a href="/calculators/step-up-sip/">step-up SIP</a></p>`) + faqs('Bonus, STP, and tax on a one-time investment', [
  ['Lumpsum vs SIP — which “wins”?', 'If markets rise from day one, lumpsum wins on paper. SIP wins on affordability and on not guessing the week. Most salaried cash flow is SIP-shaped; bonuses are lumpsum-shaped.'],
  ['Should I wait for a crash?', 'Waiting is a market call. Some years you wait through a rally. STP is a compromise: you are invested gradually without pretending you can pick the low.'],
  ['Does this include expense ratio?', 'No. Type a net return (after TER) if you want that. A 12% headline with 2% expenses is not 12% in your folio.'],
  ['ESOP sale proceeds — same page?', 'Yes if it is one credit you will leave invested. Tax on the ESOP event is separate from fund LTCG later.'],
  ['Why a year-wise table?', 'To show that most of the rupees appear in later years. It is still a constant-rate cartoon, not a NAV path.']
]);

pages['step-up-sip'] = article(`        <h2>The step-up is a salary habit, not a higher NAV</h2>
        <p>A flat SIP of ₹10,000 for 20 years and a SIP that starts at ₹10,000 and rises 10% each year are different savings plans. The second invests much more of your future income. The extra corpus is mostly extra contributions plus compounding on those extra contributions — not a magic AMC feature.</p>
        <p>Match the step-up % to a raise you actually receive. 10% is a neat default because many private-sector hikes sit in that band; it is the wrong number if your CTC is frozen. If the AMC only allows a rupee step-up (₹1,000 a year), convert that to a percent on this page for illustration, then set the mandate in rupees on the platform.</p>
        <table class="compare-table">
          <thead><tr><th>Start ₹5,000/month, 12% illustration, 15 years</th><th>Approx. corpus</th></tr></thead>
          <tbody>
            <tr><td>No step-up</td><td>≈ ₹25 lakh (invested ₹9 lakh)</td></tr>
            <tr><td>10% more SIP each year</td><td>often ~₹40 lakh+ (invested much more)</td></tr>
          </tbody>
        </table>
        <div class="omit-box">
          <h3>Platforms vs this model</h3>
          <p>Groww, Coin, MF Central, and AMC sites differ on whether step-up is annual on the SIP anniversary or on a calendar date. This page increases once a year. It does not pause for unemployment. Compare with a flat SIP on the <a href="/calculators/sip/">SIP calculator</a> before you tick “step-up” in an app.</p>
        </div>
        <p class="related-inline"><a href="/guides/sip-investment-guide/">SIP guide</a></p>`) + faqs('Annual SIP increases', [
  ['Does step-up change the fund’s return?', 'No. It changes how much you send. NAV risk is the same as a flat SIP in that scheme.'],
  ['What if I skip a hike year?', 'Corpus will land between flat and full step-up. Restart when cash flow allows; you do not owe the calculator a 10% forever.'],
  ['Is 15% step-up better?', 'Only if income and expenses allow. An aggressive step-up you cancel in year three is worse than a 5% you keep.'],
  ['Can I step up twice a year?', 'Some mandates are annual only. This model is yearly. Two hikes a year would require a custom sheet.'],
  ['Should the step-up match inflation?', 'A 6% step-up roughly keeps purchasing power of the instalment constant. A 10% step-up tries to save a rising share of salary.']
]);

pages['swp'] = article(`        <h2>The 4% rule is an American study, not an Indian pension</h2>
        <p>An SWP redeems units every month. This page takes corpus, a fixed monthly withdrawal, and a constant annual return, then walks the balance down. If monthly growth exceeds the withdrawal, the line can rise — that is an illustration, not a guarantee that a hybrid fund will pay you forever.</p>
        <p>Trinity’s 4% rule used US large-cap history and a 30-year retirement. India has higher inflation, different equity/debt tax, and often no Social Security. A 6% annual withdrawal (₹50,000 a month from ₹1 crore) plus 6% expense inflation is a much tighter problem than 4% in a low-inflation textbook.</p>
        <table class="compare-table">
          <thead><tr><th>₹1 crore start</th><th>₹40,000 / month</th><th>₹60,000 / month</th></tr></thead>
          <tbody>
            <tr><td>Withdrawal / year</td><td>4.8%</td><td>7.2%</td></tr>
            <tr><td>If returns average 8%</td><td>lasts longer</td><td>sequence risk bites sooner</td></tr>
          </tbody>
        </table>
        <p>Tax: each SWP is a redemption. Only the <em>gain</em> slice is taxed (equity vs debt rules then in force). FD interest is taxed in full. That is why some retirees prefer SWP from a debt or conservative hybrid fund — not because SWP is “safe”.</p>
        <p>Sequence-of-returns: a bad market in the first three years of withdrawal does more damage than the same crash in year 15. This calculator uses a flat return, so it cannot show that. Keep 1–2 years of expenses in liquid funds if you will actually live on SWP.</p>
        <p class="related-inline"><a href="/guides/retirement-planning-guide/">Retirement guide</a> · <a href="/calculators/retirement/">corpus planner</a> · <a href="/calculators/fd/">FD</a></p>`) + faqs('SWP duration, tax, and sequence risk', [
  ['Is SWP better than a 7% FD for monthly income?', 'FD interest is certain (subject to bank risk) and fully taxable. SWP amount is certain only until units run out; the corpus is not. Post-tax, a debt-fund SWP can look better in a high slab. It can also fall.'],
  ['Should I inflate the withdrawal every year?', 'Living costs will. This page keeps the rupee withdrawal flat unless you re-run with a higher amount. Understating inflation is how “₹50,000 forever” fails.'],
  ['Which fund category for SWP?', 'Retirees often use conservative hybrid or short-duration debt for the SWP sleeve, and keep growth assets separate. This tool does not pick funds.'],
  ['What if the chart goes negative?', 'The withdrawal is larger than growth plus corpus. Cut the monthly amount or shorten the years. Do not assume you can “earn 14%” to fix the chart.'],
  ['Does SWP from NPS work the same?', 'NPS has annuity and lump-sum rules at exit. Do not treat this mutual-fund SWP model as an NPS pension.']
]);

pages['inflation'] = article(`        <h2>RBI aims at 4%. Your school fees do not.</h2>
        <p>Headline CPI in India is what the MPC looks at; the target is 4% with a ±2% band. Household inflation is a mix: food spikes, rent, a 10% school-fee circular, a hospital bill. Using 6% for “general lifestyle” and 8–10% for education or private healthcare is a planning split, not a forecast from this website.</p>
        <p>Future cost = today’s rupees × (1 + i)<sup>years</sup>. Real return ≈ (1 + nominal) / (1 + i) − 1. A 12% SIP illustration against 6% inflation is about 5.7% real — the corpus number on a SIP page is still in future rupees with weaker purchasing power.</p>
        <table class="compare-table">
          <thead><tr><th>₹50,000 monthly spend today</th><th>At 6% CPI</th></tr></thead>
          <tbody>
            <tr><td>In 10 years</td><td>≈ ₹89,500 / month</td></tr>
            <tr><td>In 20 years</td><td>≈ ₹1.60 lakh / month</td></tr>
            <tr><td>In 25 years</td><td>≈ ₹2.15 lakh / month</td></tr>
          </tbody>
        </table>
        <p>The 4% “safe withdrawal” cartoon on US blogs used US inflation. Plug Indian i into the <a href="/calculators/retirement/">retirement planner</a> instead of copying a 25× rule from Twitter. Gold and primary residence are imperfect hedges; they are also concentrated bets. This page only compounds a single rate you typed — real CPI will zigzag.</p>
        <p class="related-inline">Source to watch: RBI monetary policy statements. Related: <a href="/calculators/sip/">SIP</a> · <a href="/guides/retirement-planning-guide/">retirement guide</a></p>`) + faqs('CPI vs household inflation', [
  ['Which rate should I type for retirement?', 'Many Indian planners use 6% for a broad basket and a higher overlay for health. If you under-type 3% because “RBI target is 4%”, you will under-save.'],
  ['My FD is 7% and CPI is 6%. Am I winning?', 'Pre-tax, barely. After slab tax, a 7% FD is often negative real. That is the FD vs equity argument in one line.'],
  ['Does this use official CPI index numbers?', 'No. It is a constant-rate compounder. For historical CPI, use MOSPI series, not this form.'],
  ['Salary also rises with inflation — ignore this?', 'Wage growth can offset CPI during working years. Retirement spending does not get a CTC hike. That is why the table still matters after 60.'],
  ['Education inflation 10% — for how long?', 'Fee circulars are lumpy. Using 10% for 20 years may overstate. Using 6% for a child entering college in 12 years may understate. Run both.']
]);

pages['net-worth'] = article(`        <h2>Count the house once. Count PF once. Count the loan as a minus.</h2>
        <p>Net worth = assets − liabilities on a date you choose. It is a scoreboard, not spendable cash. A ₹80 lakh flat with a ₹55 lakh home loan adds ₹25 lakh of equity — and you still need rent-equivalent cash if you sold and moved.</p>
        <ul class="checklist">
          <li>Assets: savings, FDs, mutual funds, stocks, EPF, PPF, NPS (mark to latest statement), gold at live price, vehicle at resale (not on-road invoice), house at a conservative market guess.</li>
          <li>Liabilities: every loan outstanding, credit-card revolving, education loan, personal loan, money borrowed from family if you will repay it.</li>
          <li>Do not add EPF and also add “retirement corpus” that already includes EPF. Do not add the full house value without subtracting the home loan.</li>
          <li>ESOPs: use vested value minus tax you would actually pay on a sale, or you will flatter the number.</li>
        </ul>
        <p>Age × income / 10 is a US-blog rule of thumb. In Indian metros with expensive housing, a 32-year-old can have a large house-shaped net worth and a tiny emergency fund. Track the number quarterly and watch the <em>trend</em> after you strip the house, if you care about mobility.</p>
        <div class="omit-box">
          <h3>Negative net worth is common</h3>
          <p>Education loan plus first-year rent deposit plus a two-wheeler EMI can sit below zero. The fix is not a motivational quote; it is high-interest debt first, then EPF+SIP. Re-run this page after every prepayment.</p>
        </div>
        <p class="related-inline"><a href="/calculators/emi/">EMI</a> · <a href="/calculators/epf/">EPF</a> · <a href="/calculators/retirement/">retirement</a></p>`) + faqs('What to include in an Indian net-worth sheet', [
  ['Include the primary home?', 'Yes if you want a full balance sheet. Optionally keep a second “ex-house” figure for FIRE-style planning so a non-saleable roof does not look like a corpus.'],
  ['EPF is locked — still an asset?', 'Yes. Liquidity is a separate column. Locked is not zero.'],
  ['Gold jewellery at making charges?', 'Use melt/resale, not the bill you paid including making GST. Otherwise you overstate.'],
  ['Credit card paid in full every month?', 'If the statement is paid before interest, the liability is ~₹0 between cycles. If you revolve, put the outstanding here.'],
  ['How often to update property value?', 'Once a year is enough unless you sold or took a top-up. Weekly Circle-app refreshes create fake precision.']
]);

pages['retirement'] = article(`        <h2>Corpus is inflated expenses, not “25 times salary”</h2>
        <p>This planner takes today’s monthly spend, your years to retirement, an inflation rate, a post-retirement return, and a working-years SIP return, then backs out a corpus and a SIP. The US 25× rule (4% withdrawal) assumed milder inflation. In India, healthcare and rent can outrun 4% for decades. Prefer: inflate today’s lifestyle to retirement date, then ask how many years that spending must last.</p>
        <p>Example shape (not your number): ₹40,000 a month today, 6% inflation, 30 years to retire → about ₹2.3 lakh a month in future rupees. Funding that for 25 years with a conservative 7% post-retirement return is a crore-class problem, not a ₹1 crore slogan. EPF, NPS, and paid-off housing change the SIP, which is why you should subtract assets you already have before you panic at the SIP line.</p>
        <div class="when-grid">
          <div class="when-card use">
            <h3>Inputs that deserve honesty</h3>
            <ul>
              <li>Spend what you actually spend, not the aspirational budget</li>
              <li>Add a health buffer (many people use +15–20%)</li>
              <li>Use 10–12% only for the accumulation equity sleeve, not after 60</li>
            </ul>
          </div>
          <div class="when-card skip">
            <h3>What this will not do</h3>
            <ul>
              <li>Model NPS annuity purchase at exit</li>
              <li>Apply old vs new regime to EPF withdrawals</li>
              <li>Guarantee a mutual fund return</li>
            </ul>
          </div>
        </div>
        <p>Pair the SIP target with the <a href="/calculators/sip/">SIP calculator</a>, the drawdown with <a href="/calculators/swp/">SWP</a>, and inflation sensitivity with the <a href="/calculators/inflation/">inflation page</a>. Guide: <a href="/guides/retirement-planning-guide/">retirement planning</a>.</p>`) + faqs('Indian retirement math vs internet rules of thumb', [
  ['Is ₹1 crore enough?', 'At 7% it is roughly ₹58,000 a month before tax, in today’s rupees only if you start drawing now. In 2046 that rupee buys less. City, rent, and health dominate the answer.'],
  ['Should I include EPF in the corpus?', 'Yes — as a starting asset — then let this page compute the gap. Double-counting EPF as both “already done” and “SIP will also build PF” inflates comfort.'],
  ['NPS 40% annuity — good or bad?', 'It is a longevity hedge with rate and inflation risk. This calculator does not replace an NPS illustration from the point of presence.'],
  ['FIRE at 45?', 'Shorter accumulation, longer drawdown, higher health inflation. Re-run with retirement age 45 and 40 years of expenses. The SIP usually jumps sharply.'],
  ['Why 25 years after retirement?', 'It is a planning horizon, not your lifespan. If family longevity is high, lengthen it; the corpus target rises.']
]);

function splice(file, sections) {
  const p = path.join(ROOT, file, 'index.html');
  let html = fs.readFileSync(p, 'utf8');
  const mainEnd = html.lastIndexOf('</main>');
  const footer = html.indexOf('<footer', mainEnd);
  if (mainEnd < 0 || footer < 0) throw new Error('markers missing: ' + file);
  html = html.slice(0, mainEnd + '</main>'.length) + '\n\n  ' + sections.trim() + '\n\n  ' + html.slice(footer);
  fs.writeFileSync(p, html);
  console.log('updated', file);
}

const desc = {
  'simple-interest': ['Simple Interest vs Flat Rate Loan Calculator India — CalStacker', 'See why a “flat 8%” car-loan quote is not a reducing-balance EMI. SI = P×R×T/100 with a comparison to bank EMIs.'],
  'compound-interest': ['Compound Interest Calculator — Quarterly vs Monthly India — CalStacker', 'Compare annual, quarterly and monthly compounding on the same principal. Built for Indian FD-style frequency choices.'],
  'fd': ['FD Calculator India — Quarterly Compounding & Post-Tax Yield — CalStacker', 'Estimate cumulative FD maturity with quarterly compounding, then think in post-tax rupees and DICGC limits.'],
  'ppf': ['PPF Calculator — 15-Year Lock-in, ₹1.5L Cap, 7.1% — CalStacker', 'Project PPF maturity with the annual cap, year-7 withdrawals, and EEE tax treatment. Rate is government-notified.'],
  'rd': ['RD Calculator India — Recurring Deposit vs SIP — CalStacker', 'Estimate bank or post-office RD maturity from monthly deposits. Taxable interest, not a mutual-fund SIP.'],
  'epf': ['EPF Calculator — ₹15,000 Wage Ceiling & 12% — CalStacker', 'Project EPF corpus using the statutory wage cap, employee 12%, and the EPFO rate you enter.'],
  'gratuity': ['Gratuity Calculator — Payment of Gratuity Act 15/26 — CalStacker', 'Estimate statutory gratuity from basic+DA and years of service. ₹20 lakh cap and 5-year eligibility explained.'],
  'cagr': ['CAGR Calculator — Lumpsum Only, Not SIP/XIRR — CalStacker', 'Annualise a start and end value. For SIPs use XIRR; this page will not treat total invested as a lumpsum start.'],
  'lumpsum': ['Lumpsum Investment Calculator — Bonus & One-Time FV — CalStacker', 'Project a one-time mutual-fund or deposit amount at a constant rate. Sequence risk and STP caveats included.'],
  'step-up-sip': ['Step-Up SIP Calculator — Annual Increase vs Flat SIP — CalStacker', 'See how a 10% yearly SIP hike (salary habit) changes corpus versus a flat SIP. Not a higher NAV.'],
  'swp': ['SWP Calculator India — Why 4% Is Not a Pension — CalStacker', 'Walk a corpus down with a monthly withdrawal and a flat return. Sequence risk and tax on redemptions explained.'],
  'inflation': ['Inflation Calculator India — CPI vs School Fees — CalStacker', 'Compound a spending figure at the rate you choose. RBI 4% target vs household education/health inflation.'],
  'net-worth': ['Net Worth Calculator India — Assets minus Loans — CalStacker', 'Add EPF, property equity, gold, and funds; subtract EMIs and cards. Avoid double-counting PF and the house.'],
  'retirement': ['Retirement Corpus Calculator India — Inflated Expenses — CalStacker', 'Back out corpus and SIP from today’s spend, Indian inflation, and years in retirement. Not a 25× salary slogan.']
};

for (const [file, html] of Object.entries(pages)) {
  splice(file, html);
  const p = path.join(ROOT, file, 'index.html');
  let doc = fs.readFileSync(p, 'utf8');
  const [title, meta] = desc[file];
  doc = doc.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  doc = doc.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${meta}">`);
  doc = doc.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`);
  doc = doc.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${meta}">`);
  doc = doc.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${title}">`);
  doc = doc.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${meta}">`);
  fs.writeFileSync(p, doc);
}

console.log('done', Object.keys(pages).length);
