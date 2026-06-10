const PLAY_STORE_DEV_URL =
  'https://play.google.com/store/apps/developer?id=KRISHH+APPS+SOLUTIONS&hl=en';

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderAppCard(app) {
  const statusLabel = app.status === 'published' ? 'Available Now' : app.status;

  return `
    <a href="${escapeHtml(app.playStoreUrl)}"
       class="app-card group block rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm hover:border-brand-teal/30 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-brand-teal/50"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="${escapeHtml(app.name)} on Google Play (opens in new tab)">
      <img src="${escapeHtml(app.iconUrl)}"
           alt="${escapeHtml(app.name)} icon"
           width="64"
           height="64"
           class="mb-4 h-16 w-16 rounded-2xl shadow-sm"
           loading="lazy">
      <p class="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-teal dark:text-teal-400">${escapeHtml(app.category)}</p>
      <h3 class="mb-2 text-xl font-semibold text-brand-navy group-hover:text-brand-teal dark:text-slate-100 dark:group-hover:text-teal-400">${escapeHtml(app.name)}</h3>
      <p class="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">${escapeHtml(app.description)}</p>
      <span class="text-xs font-bold uppercase tracking-widest text-brand-teal dark:text-teal-400">${escapeHtml(statusLabel)}</span>
    </a>
  `;
}

function renderFallbackApps() {
  const grid = document.getElementById('apps-grid');
  if (!grid) return;

  grid.innerHTML = `
    <div class="col-span-full rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-800">
      <p class="mb-4 text-slate-600 dark:text-slate-400">Explore our full catalog of utility and productivity apps on Google Play.</p>
      <a href="${PLAY_STORE_DEV_URL}"
         class="btn-primary"
         target="_blank"
         rel="noopener noreferrer">
        Browse on Google Play
        <span class="sr-only">(opens in new tab)</span>
      </a>
    </div>
  `;
}

async function renderApps() {
  const grid = document.getElementById('apps-grid');
  if (!grid) return;

  try {
    const response = await fetch('data/apps.json');
    if (!response.ok) throw new Error('Failed to load apps');

    const data = await response.json();
    const apps = data.apps || [];

    if (apps.length === 0) {
      renderFallbackApps();
      return;
    }

    grid.innerHTML = apps.map(renderAppCard).join('');
  } catch {
    renderFallbackApps();
  }
}

function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  const links = menu?.querySelectorAll('a');

  if (!toggle || !menu) return;

  function setOpen(isOpen) {
    toggle.setAttribute('aria-expanded', String(isOpen));
    menu.classList.toggle('hidden', !isOpen);
    menu.classList.toggle('flex', isOpen);
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  links?.forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  renderApps();
});
