const THEME_STORAGE_KEY = 'theme';
const THEME_COLOR_LIGHT = '#003366';
const THEME_COLOR_DARK = '#0f172a';

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'dark' || stored === 'light' ? stored : null;
}

function getEffectiveTheme() {
  return getStoredTheme() ?? getSystemTheme();
}

function updateThemeColor(theme) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', theme === 'dark' ? THEME_COLOR_DARK : THEME_COLOR_LIGHT);
  }
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.style.colorScheme = theme;
  updateThemeColor(theme);
  updateToggleButton(theme);
}

function updateToggleButton(theme) {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const isDark = theme === 'dark';
  toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  toggle.setAttribute('title', isDark ? 'Light mode' : 'Dark mode');
}

function setTheme(theme, persist = true) {
  applyTheme(theme);
  if (persist) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
}

function toggleTheme() {
  const next = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
}

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', toggleTheme);
  updateToggleButton(getEffectiveTheme());
}

function initSystemThemeListener() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (!getStoredTheme()) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });
}

(function initTheme() {
  applyTheme(getEffectiveTheme());

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initThemeToggle();
      initSystemThemeListener();
    });
  } else {
    initThemeToggle();
    initSystemThemeListener();
  }
})();
