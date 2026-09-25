/* EduRance live usage counter. Shows the real number of APS calculations once it passes SHOW_FROM. */
(function () {
  var API = 'https://eduranceapp.com/api/public/stats';
  var SHOW_FROM = 1000; // keep hidden until the real number is worth showing
  var els = document.querySelectorAll('[data-aps-count]');
  if (!els.length || !window.fetch) return;
  fetch(API, { headers: { Accept: 'application/json' } })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) {
      if (!d || typeof d.apsCalculations !== 'number' || d.apsCalculations < SHOW_FROM) return;
      var n = d.apsCalculations.toLocaleString('en-ZA');
      els.forEach(function (el) { el.querySelector('b').textContent = n; el.hidden = false; });
    })
    .catch(function () {});
})();
