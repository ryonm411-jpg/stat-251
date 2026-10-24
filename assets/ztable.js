/*
 * Standard normal table component: P(Z <= z) for z = 0.00 .. 3.49, 4 decimals,
 * laid out like the exam table (rows = z to 1 decimal, columns = 2nd decimal).
 * Usage: <details class="ztable" data-ztable><summary>Show z-table</summary></details>
 * For negative z use symmetry: P(Z <= -z) = 1 - P(Z <= z).
 */
(function () {
  // Abramowitz–Stegun 7.1.26 erf approximation (|error| < 1.5e-7), plenty for 4 d.p.
  function erf(x) {
    const s = Math.sign(x); x = Math.abs(x);
    const t = 1 / (1 + 0.3275911 * x);
    const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return s * y;
  }
  const Phi = z => 0.5 * (1 + erf(z / Math.SQRT2));
  window.Phi = Phi;
  document.querySelectorAll("[data-ztable]").forEach(el => {
    let h = '<div class="ztable-wrap"><table><tr><th>z</th>';
    for (let c = 0; c < 10; c++) h += `<th>.0${c}</th>`;
    h += "</tr>";
    for (let r = 0; r < 35; r++) {
      h += `<tr><th>${(r / 10).toFixed(1)}</th>`;
      for (let c = 0; c < 10; c++) h += `<td>${Phi(r / 10 + c / 100).toFixed(4).slice(1)}</td>`;
      h += "</tr>";
    }
    h += '</table></div><p class="muted" style="font-size:.85rem">Entries are P(Z ≤ z). For negative z: P(Z ≤ −z) = 1 − P(Z ≤ z).</p>';
    el.insertAdjacentHTML("beforeend", h);
  });
})();
