/**
 * AdSense ad unit slot IDs — paste after AdSense approval.
 * Quest: blocker-ad-units
 */
const ADS_CONFIG = {
  client: 'ca-pub-8332278519903196',
  slots: {
    topBanner: '',
    inContent: '',
    sidebar: ''
  },
  enabled: false
};

function renderAdSlot(element, slotKey) {
  if (!ADS_CONFIG.enabled || !ADS_CONFIG.slots[slotKey]) return;
  const slot = ADS_CONFIG.slots[slotKey];
  element.innerHTML = '';
  const ins = document.createElement('ins');
  ins.className = 'adsbygoogle';
  ins.style.display = 'block';
  ins.dataset.adClient = ADS_CONFIG.client;
  ins.dataset.adSlot = slot;
  ins.dataset.adFormat = 'auto';
  ins.dataset.fullWidthResponsive = 'true';
  element.appendChild(ins);
  if (window.adsbygoogle) (adsbygoogle.push = adsbygoogle.push || []).push({});
}

document.addEventListener('DOMContentLoaded', function () {
  if (!ADS_CONFIG.enabled) return;
  document.querySelectorAll('.ad-slot[data-ad-slot]').forEach(function (el) {
    renderAdSlot(el, el.dataset.adSlot);
  });
});
