/**
 * CalStacker affiliate URLs — single source of truth.
 * Quest: blocker-affiliate-* — replace # with real referral links.
 */
const MONETIZATION = {
  zerodha: {
    name: 'Zerodha',
    url: '#affiliate-link-needed',
    questId: 'blocker-affiliate-zerodha',
    calculators: ['sip', 'salary', 'hra', 'lumpsum', 'step-up-sip', 'swp', 'net-worth', 'gratuity', 'epf']
  },
  groww: {
    name: 'Groww',
    url: '#affiliate-link-needed',
    questId: 'blocker-affiliate-groww',
    calculators: ['sip', 'step-up-sip', 'lumpsum']
  },
  cleartax: {
    name: 'ClearTax',
    url: '#affiliate-link-needed',
    questId: 'blocker-affiliate-cleartax',
    calculators: ['income-tax', 'hra', 'salary']
  },
  angelone: {
    name: 'Angel One',
    url: '#affiliate-link-needed',
    questId: 'blocker-affiliate-angel',
    calculators: ['salary', 'sip', 'retirement']
  }
};

function getAffiliateUrl(partner) {
  const p = MONETIZATION[partner];
  return p ? p.url : '#';
}

if (typeof module !== 'undefined') module.exports = { MONETIZATION };
