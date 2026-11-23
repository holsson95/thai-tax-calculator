import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import OfficialSource from '../components/OfficialSource';
import { PageHeader, ProseSheet } from '../components/layout/InfoPage';

const SITE_URL = 'https://mythaitaxes.com';
const LAST_REVIEWED = '2026-09-07';

const MethodologyPage: React.FC = () => {
  const title = 'Calculator Methodology | My Thai Taxes';
  const description =
    'How the My Thai Taxes annual calculator computes Thai personal income tax: assessable income, deductions, allowances, progressive brackets, and a fully worked example.';

  return (
    <div className="mx-auto max-w-[52rem] px-4 pb-20 pt-10 sm:px-6 lg:pt-14">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/methodology/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/methodology/`} />
        <meta property="og:type" content="article" />
      </Helmet>

      <PageHeader title="Calculator Methodology">
        <p className="mt-4 font-mono text-xs tabular-nums text-ink-mute">Last reviewed: {LAST_REVIEWED}</p>
        <p className="mt-3 text-sm">
          <Link to="/thailand-tax-2026/" className="font-semibold text-desk underline decoration-desk/40 hover:decoration-desk">
            ← Back to the 2026 tax overview
          </Link>
        </p>
      </PageHeader>

      <ProseSheet className="mt-8">

        <section>
          <h2>What MyThaiTaxes calculates</h2>
          <p>
            This page documents the calculation performed by the{' '}
            <Link to="/annual-tax/">Annual Tax Calculator</Link>{' '}
            for a salaried employee (Revenue Code Section 40(1) income) — the base case the worked
            example below reproduces step by step. Freelancers, sole proprietors, and company directors
            go through the same underlying steps (assessable income → deductions → allowances → progressive
            tax → withholding credits) with extra rules layered on for multiple income types, expense
            methods, and foreign income — those are summarized where relevant but not fully worked here.
          </p>
        </section>

        <section>
          <h2>Assessable income</h2>
          <p>
            Assessable income is gross income before any deduction or allowance. Thai law splits it into
            eight categories (Section 40(1)–40(8)) by source — employment, liberal professions, contracting,
            rental, business/sales, dividends, and so on — because each category gets a different expense
            deduction method. The calculator's salaried flow uses Section 40(1): salary, wages, bonuses,
            and taxable benefits.
          </p>
        </section>

        <section>
          <h2>Employment income</h2>
          <p>
            Employment income (40(1)) is the sum of annual gross salary plus any taxable cash benefits
            entered. It is the figure the standard deduction and progressive tax are ultimately calculated
            against.
          </p>
        </section>

        <section>
          <h2>Expense deductions</h2>
          <p>
            Employment income gets a standard expense deduction of <strong>50% of gross income, capped at
            100,000 THB</strong> — so anyone earning above 200,000 THB/year hits the cap. This is a flat,
            no-receipts deduction; there is no option to itemize actual employment expenses instead.
          </p>
          <OfficialSource
            label="Standard expense deduction cap"
            value="฿100,000"
            sourceLabel="PwC Tax Summaries — Thailand Individual Deductions"
            sourceUrl="https://taxsummaries.pwc.com/thailand/individual/deductions"
            taxYear={2026}
            lastVerified="September 2026"
            verified={false}
            verificationNotes="Corroborated by a secondary source only; no primary Revenue Department page confirming this figure was found."
          />
        </section>

        <section>
          <h2>Personal allowances</h2>
          <p>Allowances are subtracted from income (in addition to the expense deduction), based on family situation:</p>
          <OfficialSource
            label="Personal allowance"
            value="฿60,000"
            sourceLabel="PwC Tax Summaries — Thailand Individual Deductions (corroborated by Sherrings)"
            sourceUrl="https://taxsummaries.pwc.com/thailand/individual/deductions"
            taxYear={2026}
            lastVerified="September 2026"
            verified={false}
            verificationNotes="Two independent secondary sources agree, but no working primary Revenue Department page stating this figure directly was found — the amounts below follow the same sourcing pattern; see the full registry in TAX_RULES.md for each one."
          />
          <div className="table-scroll"><table>
            <thead>
              <tr>
                <th>Allowance</th>
                <th className="!text-right">Amount</th>
                <th>Condition</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Personal allowance</td><td className="text-right">60,000 THB</td><td>Every taxpayer</td></tr>
              <tr><td>Spouse allowance</td><td className="text-right">60,000 THB</td><td>Married, spouse has no income</td></tr>
              <tr><td>Senior exemption (65+)</td><td className="text-right">190,000 THB</td><td>Taxpayer is 65 or older</td></tr>
              <tr><td>Child allowance (base)</td><td className="text-right">30,000 THB/child</td><td>Per qualifying child</td></tr>
              <tr><td>Child allowance (bonus)</td><td className="text-right">+30,000 THB</td><td>2nd+ child born 2018 or later</td></tr>
              <tr><td>Parent allowance</td><td className="text-right">30,000 THB/parent</td><td>Up to 4 parents (self-certified, see Limitations)</td></tr>
            </tbody>
          </table></div>
          <p className="note">
            The 65+ figure is applied by the calculator as a flat 190,000 THB exemption. Its statutory
            citation ("Section 42(17)") could not be independently confirmed during our sourcing review —
            treat it as an unverified detail, not the underlying 190,000 THB amount itself, which is
            corroborated by multiple tax-advisory sources. The "up to 4 parents" cap is not a number stated
            directly in any source we found; it is derived from the rule that only one sibling may claim
            each parent and a taxpayer can have at most 2 own + 2 spouse's parents.
          </p>
        </section>

        <section>
          <h2>Social Security</h2>
          <p>
            Employee Social Security Fund (SSO) contributions are deductible, capped at{' '}
            <strong>10,500 THB/year</strong> — the ceiling that took effect from 1 January 2026 (Phase 1,
            through 2028). The prior ceiling was 9,000 THB/year for 2024–2025.
          </p>
          <OfficialSource
            label="Social security contribution deduction cap (2026 onward)"
            value="฿10,500/year"
            sourceLabel="BDO Thailand — New Social Security Fund's Wage Ceiling (corroborated by DLA Piper GENIE)"
            sourceUrl="https://www.bdo.th/en-gb/insights/new-social-security-fund%E2%80%99s-wage-ceiling-effective-january-2026"
            taxYear={2026}
            lastVerified="September 2026"
            verified={true}
          />
        </section>

        <section>
          <h2>Other deductions</h2>
          <div className="table-scroll"><table>
            <thead>
              <tr>
                <th>Deduction</th>
                <th className="!text-right">Cap</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Life insurance</td><td className="text-right">100,000 THB</td></tr>
              <tr><td>Health insurance</td><td className="text-right">25,000 THB (combined with life insurance, 100,000 THB total)</td></tr>
              <tr><td>Pension fund (RMF-style/annuity)</td><td className="text-right">500,000 THB</td></tr>
              <tr><td>Provident fund</td><td className="text-right">500,000 THB (15% of wage)</td></tr>
              <tr><td>RMF</td><td className="text-right">500,000 THB</td></tr>
              <tr><td>SSF</td><td className="text-right">200,000 THB</td></tr>
              <tr><td>Donations</td><td className="text-right">10% of income after allowances/other deductions</td></tr>
            </tbody>
          </table></div>
          <p className="note">
            All retirement-fund deductions (pension, provident, RMF, SSF combined) are also subject to a
            single combined ceiling of 500,000 THB under Thai law. The calculator applies each individual
            cap above but does not yet enforce this combined ceiling — a known gap, not a hidden feature.
            The pension fund's individual 500,000 THB cap is also flagged as possibly overstated (a
            200,000 THB / 15%-of-income sub-cap may apply instead); it has not been independently
            re-verified.
          </p>
        </section>

        <section>
          <h2>Progressive tax</h2>
          <p>
            After all deductions and allowances, remaining taxable income is taxed under Thailand's
            progressive brackets (in effect since 2017):
          </p>
          <div className="table-scroll"><table>
            <thead>
              <tr>
                <th>Taxable income band</th>
                <th className="!text-right">Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>0 – 150,000 THB</td><td className="text-right">0%</td></tr>
              <tr><td>150,000 – 300,000 THB</td><td className="text-right">5%</td></tr>
              <tr><td>300,000 – 500,000 THB</td><td className="text-right">10%</td></tr>
              <tr><td>500,000 – 750,000 THB</td><td className="text-right">15%</td></tr>
              <tr><td>750,000 – 1,000,000 THB</td><td className="text-right">20%</td></tr>
              <tr><td>1,000,000 – 2,000,000 THB</td><td className="text-right">25%</td></tr>
              <tr><td>2,000,000 – 5,000,000 THB</td><td className="text-right">30%</td></tr>
              <tr><td>Above 5,000,000 THB</td><td className="text-right">35%</td></tr>
            </tbody>
          </table></div>
          <p>
            Each band is taxed only on the portion of income that falls within it (a standard marginal-rate
            calculation) — income is not pushed entirely into the top bracket it reaches.
          </p>
        </section>

        <section>
          <h2>Withholding</h2>
          <p>
            Tax already withheld by an employer during the year (shown on the year-end withholding
            certificate, "50 Tawi") is entered separately and is not part of the taxable-income
            calculation. It is only netted against the final tax owed at the end: if withholding exceeds
            tax owed, the difference is a refund; if it falls short, the difference is owed at filing.
          </p>
        </section>

        <section>
          <h2>Foreign income</h2>
          <p>
            Foreign-sourced income is out of scope for the salaried worked example below, but in brief:
            under the remittance rule effective from 1 January 2024 (Revenue Department Order Por.
            161/2566, clarified by Por. 162/2566), foreign income remitted into Thailand in the same year
            it is earned or later is assessable; foreign income earned before 2024 remains under the older
            rule. Where a Double Tax Agreement (DTA) applies, a foreign tax credit is allowed up to the
            lesser of the foreign tax actually paid or the Thai tax due on that same income — it cannot
            exceed the Thai tax on that income. This flow is handled by the freelancer calculator, not the
            salaried one documented here.
          </p>
        </section>

        <section>
          <h2>Tax residency</h2>
          <p>
            A person present in Thailand for <strong>180 days or more</strong> (aggregate, in a calendar
            year) is a Thai tax resident under Revenue Code Section 41, which affects how foreign income is
            taxed. The salaried worked example below assumes residency status doesn't change the domestic
            calculation itself — the 180-day rule mainly matters for cross-border/foreign income cases.
          </p>
          <OfficialSource
            label="Thai tax residency threshold"
            value="180 days"
            sourceLabel="Thai Revenue Department (EN) — Revenue Code Section 41"
            sourceUrl="https://www.rd.go.th/english/37749.html"
            taxYear={2026}
            lastVerified="September 2026"
            verified={true}
          />
        </section>

        <section>
          <h2>Worked example</h2>
          <p>
            Single taxpayer, no children, no dependents, no additional insurance or fund contributions,
            annual gross salary <strong>800,000 THB</strong>, with <strong>40,000 THB</strong> already
            withheld by the employer during the year.
          </p>
          <div className="border-t-2 border-desk">
            <div className="form-line"><span>Gross salary</span><span>800,000</span></div>
            <div className="form-line"><span>− Standard deduction (50%, capped at 100,000)</span><span>− 100,000</span></div>
            <div className="form-line"><span>− Personal allowance</span><span>− 60,000</span></div>
            <div className="form-total -mt-px"><span>= Taxable income</span><span>640,000</span></div>
          </div>
          <p>Applying the progressive brackets to 640,000 THB, band by band:</p>
          <div className="border-t-2 border-desk">
            <div className="form-line"><span>0 – 150,000 @ 0%</span><span>0</span></div>
            <div className="form-line"><span>150,000 – 300,000 @ 5% (on 150,000)</span><span>7,500</span></div>
            <div className="form-line"><span>300,000 – 500,000 @ 10% (on 200,000)</span><span>20,000</span></div>
            <div className="form-line"><span>500,000 – 640,000 @ 15% (on 140,000)</span><span>21,000</span></div>
            <div className="form-total -mt-px"><span>= Tax owed</span><span>48,500</span></div>
          </div>
          <div className="border-t-2 border-desk">
            <div className="form-line"><span>Tax owed</span><span>48,500</span></div>
            <div className="form-line"><span>− Tax already withheld</span><span>− 40,000</span></div>
            <div className="form-total -mt-px"><span>= Additional tax owed at filing</span><span>8,500</span></div>
          </div>
          <p className="text-[15px] text-ink-soft">
            Effective tax rate: 48,500 ÷ 800,000 = 6.06% of gross income. This example matches what{' '}
            <Link to="/annual-tax/">the calculator</Link>{' '}
            returns for the same inputs — try it to confirm.
          </p>
        </section>

        <section id="sources">
          <h2>Sources</h2>
          <p>
            Every constant on this page traces to a source recorded in this repository's{' '}
            <a
              href="https://github.com/search?q=repo:mythaitaxes+TAX_RULES.md"
             
              rel="noopener noreferrer"
            >
              tax rules registry
            </a>{' '}
            (not published as a live URL — the primary sources it cites are):
          </p>
          <ul>
            <li>
              Thai Revenue Department — Guide to Personal Income Tax Return 2021 (PND90),{' '}
              <a href="https://www.rd.go.th/fileadmin/download/english_form/030265guide90.pdf" target="_blank" rel="noopener noreferrer">
                rd.go.th
              </a>{' '}
              — standard deduction, expense deduction rates by income category.
            </li>
            <li>
              Thai Revenue Department, English site —{' '}
              <a href="https://www.rd.go.th/english/" target="_blank" rel="noopener noreferrer">
                rd.go.th/english
              </a>{' '}
              — Revenue Code Section 41 (residency), Section 40 (income categories), insurance/provident fund caps.
            </li>
            <li>Revenue Code Amendment Act No. 44 B.E. 2560 (2017) — current progressive tax bracket structure, via PwC and Sherrings Thailand secondary summaries.</li>
            <li>Social Security Office (SSO) contribution ceiling notices, via BDO Thailand and DLA Piper — 9,000 THB (2024–2025) and 10,500 THB (2026 onward, Cabinet-approved 2 Dec 2025, Royal Gazette 12 Dec 2025).</li>
            <li>Revenue Department Orders Por. 161/2566 and Por. 162/2566 — foreign income remittance rule effective 2024-01-01, via Mahanakorn Partners and KPMG.</li>
            <li>Forvis Mazars and Sherrings Thailand tax guides — child/parent/spouse allowance figures and retirement fund caps (independent secondary sources, converged).</li>
          </ul>
        </section>

        <section>
          <h2>Limitations &amp; disclaimer</h2>
          <div className="note-strong space-y-2 [&_li]:text-sm [&_ul]:!mt-2">
            <p>
              This calculator and this page are for informational and estimation purposes only. They do
              not constitute professional tax advice and should not be relied upon as a substitute for a
              qualified Thai tax advisor or accountant.
            </p>
            <p>Specific known simplifications in the current calculation, disclosed rather than hidden:</p>
            <ul>
              <li>The combined 500,000 THB retirement-fund ceiling (pension + provident + RMF + SSF) is not enforced — only each fund's individual cap is applied.</li>
              <li>The rental-income (40(5)) flat deduction models only the 30% houses/vehicles case, not the lower rates that apply to land.</li>
              <li>Business/sales withholding (40(8)) is modeled as a flat 3%, though real rates vary by activity (as low as 1%, as high as 5%).</li>
              <li>The senior exemption's exact statutory citation and the pension fund's individual cap are flagged above as unverified against a primary source.</li>
            </ul>
            <p>
              Tax rules change. Always verify current figures with the{' '}
              <a href="https://www.rd.go.th/english/" target="_blank" rel="noopener noreferrer">
                Thai Revenue Department
              </a>{' '}
              or a licensed professional before filing.
            </p>
          </div>
        </section>

      </ProseSheet>
    </div>
  );
};

export default MethodologyPage;
