function chartReduceMotion() {
  if (typeof prefersReducedMotion === 'function') return prefersReducedMotion();
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

let chartJsLoaded = null;

function loadChartJs() {
  if (window.Chart) return Promise.resolve(window.Chart);
  if (chartJsLoaded) return chartJsLoaded;
  chartJsLoaded = new Promise(function (resolve, reject) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
    script.integrity = 'sha384-9nhczxUqK87bcKHh20fSQcTGD4qq5GhayNYSYWqwBkINBhOfQLg/P5HG5lF1urn4';
    script.crossOrigin = 'anonymous';
    script.onload = function () { resolve(window.Chart); };
    script.onerror = function () {
      chartJsLoaded = null;
      reject(new Error('Chart.js failed to load'));
    };
    document.head.appendChild(script);
  });
  return chartJsLoaded;
}

function showChartFallback(canvas) {
  if (!canvas || canvas.dataset.chartFallback) return;
  canvas.dataset.chartFallback = '1';
  const wrap = canvas.parentElement;
  if (!wrap) return;
  const note = document.createElement('p');
  note.className = 'chart-fallback';
  note.textContent = 'Chart could not load (blocked network or script). Your numbers above are still valid.';
  wrap.appendChild(note);
}

const chartInstances = {};

function renderDoughnutChart(canvasId, labels, values, colors) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  loadChartJs().then(function (Chart) {
    if (chartInstances[canvasId]) chartInstances[canvasId].destroy();
    chartInstances[canvasId] = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{ data: values, backgroundColor: colors, borderWidth: 0 }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: chartReduceMotion() ? false : undefined,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }).catch(function () { showChartFallback(canvas); });
}

function renderLineChart(canvasId, labels, datasets) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  loadChartJs().then(function (Chart) {
    if (chartInstances[canvasId]) chartInstances[canvasId].destroy();
    chartInstances[canvasId] = new Chart(canvas, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: chartReduceMotion() ? false : undefined,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          y: {
            ticks: {
              callback: function (v) { return '₹' + Number(v).toLocaleString('en-IN'); }
            }
          }
        }
      }
    });
  }).catch(function () { showChartFallback(canvas); });
}

function renderBarChart(canvasId, labels, datasets) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  loadChartJs().then(function (Chart) {
    if (chartInstances[canvasId]) chartInstances[canvasId].destroy();
    chartInstances[canvasId] = new Chart(canvas, {
      type: 'bar',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: chartReduceMotion() ? false : undefined,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }).catch(function () { showChartFallback(canvas); });
}
