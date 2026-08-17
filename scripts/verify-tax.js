/**
 * Offline checks for calc-core tax helpers.
 * Run: node scripts/verify-tax.js
 */
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '../assets/js/calc-core.js'), 'utf8');
const start = src.indexOf('function calcSlabTax');
const end = src.indexOf('/* ---------- Professional tax');
eval(src.slice(start, end));

function assert(name, cond, extra) {
  if (!cond) {
    console.error('FAIL', name, extra || '');
    process.exitCode = 1;
  } else {
    console.log('ok', name);
  }
}

assert('12L new taxable => 0 tax after rebate', calcNewRegimeTax(1200000) === 0);
assert('12.75L gross salary new: taxable 12L => 0', calcIncomeTax(1200000, 'new').total === 0);

const t121 = calcNewRegimeTax(1210000);
assert('12.1L new marginal relief = 10,000', t121 === 10000, t121);

const t12Lcess = calcIncomeTax(1210000, 'new');
assert('12.1L new total = 10400 (tax 10k + 4% cess)', t12Lcess.total === 10400, t12Lcess);

assert('5L old => 0 after 87A', calcOldRegimeTax(500000) === 0);
assert('5.1L old relief caps at 10,000', calcOldRegimeTax(510000) === 10000, calcOldRegimeTax(510000));

const t80 = calcIncomeTax(8000000, 'new');
assert('80L new has 10% surcharge', t80.surcharge > 0, t80);
assert('80L cess is 4% of tax+surcharge', t80.cess === Math.round((t80.taxAfterRebate + t80.surcharge) * 0.04), t80);

const t40 = calcIncomeTax(4000000, 'new');
assert('40L new no surcharge', t40.surcharge === 0, t40);

const slab12 = 20000 + 40000; // 4-8 @5%, 8-12 @10%
assert('12L slab before rebate is 60k', calcSlabTax(1200000, [
  [400000, 0], [800000, 0.05], [1200000, 0.10], [1600000, 0.15],
  [2000000, 0.20], [2400000, 0.25], [Infinity, 0.30]
]) === 60000);

if (process.exitCode) {
  console.error('Tax verification failed');
} else {
  console.log('All tax checks passed');
  console.log('80L new breakdown', t80);
}
