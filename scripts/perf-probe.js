(() => {
  const nav = performance.getEntriesByType('navigation')[0];
  const paints = performance.getEntriesByType('paint');
  const fcp = paints.find(p => p.name === 'first-contentful-paint');
  const resources = performance.getEntriesByType('resource');
  let js = 0, css = 0, font = 0, img = 0, other = 0, jsCount = 0, fontCount = 0, imgCount = 0;
  const imgs = [];
  for (const r of resources) {
    const sz = r.transferSize || 0;
    const name = r.name;
    if (/\/_next\/static\/chunks\/.*\.js|\.mjs/.test(name) || (name.endsWith('.js'))) { js += sz; jsCount++; }
    else if (name.includes('/_next/static/css/') || name.endsWith('.css')) { css += sz; }
    else if (/\.woff2?|\.ttf|\/fonts\//.test(name)) { font += sz; fontCount++; }
    else if (/\.(png|jpe?g|webp|avif|svg|ico)(\?|$)/.test(name) || name.includes('/_next/image')) {
      img += sz; imgCount++;
      imgs.push({ url: name.split('/').pop().slice(0, 60), kb: Math.round(sz / 1024 * 10) / 10 });
    }
    else other += sz;
  }
  let lcp = null, lcpEl = '';
  try {
    new PerformanceObserver(() => {}).disconnect();
    let _lcp = 0, _el = '';
    const po = new PerformanceObserver((list) => {
      for (const e of list.getEntries()) { _lcp = e.startTime; _el = e.element ? e.element.tagName + '.' + (e.element.className || '').toString().slice(0, 50) : '?'; }
    });
    po.observe({ type: 'largest-contentful-paint', buffered: true });
    po.takeRecords();
    // buffered entries delivered synchronously via takeRecords? Use fallback below
    const poEntries = po.takeRecords();
    if (poEntries && poEntries.length) {
      const last = poEntries[poEntries.length - 1];
      lcp = last.startTime;
      lcpEl = last.element ? last.element.tagName + '.' + (last.element.className || '').toString().slice(0, 50) : '?';
    }
    po.disconnect();
  } catch (e) {}
  let cls = 0;
  try {
    const po2 = new PerformanceObserver(() => {});
    po2.observe({ type: 'layout-shift', buffered: true });
    const shifts = po2.takeRecords();
    for (const s of shifts) { if (!s.hadRecentInput) cls += s.value; }
    po2.disconnect();
  } catch (e) {}
  return JSON.stringify({
    ttfb: Math.round(nav.responseStart),
    dcl: Math.round(nav.domContentLoadedEventEnd),
    load: Math.round(nav.loadEventEnd),
    fcp: fcp ? Math.round(fcp.startTime) : null,
    lcp: lcp ? Math.round(lcp) : null,
    lcpEl, cls: Math.round(cls * 1000) / 1000,
    requests: resources.length,
    jsKB: Math.round(js / 1024), jsCount,
    cssKB: Math.round(css / 1024),
    fontKB: Math.round(font / 1024), fontCount,
    imgKB: Math.round(img / 1024), imgCount,
    otherKB: Math.round(other / 1024),
    totalKB: Math.round((js + css + font + img + other) / 1024),
    images: imgs.sort((a, b) => b.kb - a.kb).slice(0, 8)
  });
})()
