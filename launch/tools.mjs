export function rollOdds(denominator, rolls) {
  if (!Number.isFinite(denominator) || denominator < 1 || denominator > 1e12 || !Number.isSafeInteger(rolls) || rolls < 0 || rolls > 1e12) throw new RangeError('Enter odds from 1 to 1,000,000,000,000 and a whole number of rolls from 0 to 1,000,000,000,000.');
  const p = 1 / denominator;
  const chance = rolls === 0 ? 0 : p === 1 ? 1 : -Math.expm1(rolls * Math.log1p(-p));
  const percentile = (q) => p === 1 ? 1 : Math.ceil(Math.log1p(-q) / Math.log1p(-p));
  return { chance, expected: rolls * p, median: percentile(0.5), p95: percentile(0.95) };
}
export function expectedDps(damage, interval, criticalPercent = 0, multiplier = 2, uptimePercent = 100) {
  const values = [damage, interval, criticalPercent, multiplier, uptimePercent];
  if (values.some((v) => !Number.isFinite(v)) || damage < 0 || damage > 1e15 || interval < 0.001 || interval > 1e6 || criticalPercent < 0 || criticalPercent > 100 || multiplier < 1 || multiplier > 1000 || uptimePercent < 0 || uptimePercent > 100) throw new RangeError('Check damage, attack interval, critical chance, critical multiplier and uptime. Values must be finite and within the shown limits.');
  return damage / interval * (1 + criticalPercent / 100 * (multiplier - 1)) * uptimePercent / 100;
}
function init() {
  const number = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
  document.querySelectorAll('[data-dar-form]').forEach((form) => {
    const output = form.querySelector('[data-result]');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const values = new FormData(form);
      const get = (key) => { const raw = values.get(key); if (raw === null || String(raw).trim() === '') throw new Error('Fill in every field.'); return Number(raw); };
      try {
        if (form.dataset.darForm === 'odds') {
          const result = rollOdds(get('denominator'), get('rolls'));
          output.textContent = `Chance of at least one: ${number.format(result.chance * 100)}%. Expected count: ${number.format(result.expected)}. Rolls for at least a 50% chance: ${number.format(result.median)}; for 95%: ${number.format(result.p95)}. Neither threshold is a guarantee.`;
        } else {
          const a = expectedDps(get('damageA'), get('intervalA'), get('critA'), get('multA'), get('uptimeA'));
          const b = expectedDps(get('damageB'), get('intervalB'), get('critB'), get('multB'), get('uptimeB'));
          const comparison = a === b ? 'The estimates are equal.' : `${a > b ? 'A' : 'B'} has the higher estimated damage rate for these inputs.`;
          output.textContent = `Unit A: ${number.format(a)} expected DPS. Unit B: ${number.format(b)} expected DPS. ${comparison} This does not model area damage, support effects or target defenses.`;
        }
        output.dataset.error = 'false';
      } catch (error) { output.textContent = error.message; output.dataset.error = 'true'; }
    });
  });
  const filter = document.querySelector('[data-code-filter]');
  if (filter) filter.addEventListener('input', () => {
    const query = filter.value.trim().toLowerCase();
    let visible = 0;
    document.querySelectorAll('[data-code-row]').forEach((row) => { row.hidden = !row.textContent.toLowerCase().includes(query); if (!row.hidden) visible++; });
    document.querySelector('[data-code-count]').textContent = `${visible} matching codes`;
  });
  document.querySelectorAll('[data-copy-code]').forEach((button) => button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copyCode);
      button.textContent = 'Copied';
      document.querySelector('[data-copy-status]').textContent = `${button.dataset.copyCode} copied.`;
      setTimeout(() => { button.textContent = 'Copy'; }, 1800);
    } catch { document.querySelector('[data-copy-status]').textContent = `Copy manually: ${button.dataset.copyCode}`; }
  }));
  const reviewed = document.querySelector('[data-code-reviewed]');
  if (reviewed && Date.now() - Date.parse(reviewed.dataset.codeReviewed + 'T00:00:00Z') > 7 * 86400000) {
    reviewed.textContent = `Source snapshot: ${reviewed.dataset.codeReviewed}. It is over seven days old; check the linked sources for changes before using a code.`;
  }
}
if (typeof document !== 'undefined') { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init(); }
