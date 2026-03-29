/* ═══════════════════════════════
   THEME TOGGLE – Phmurt Studios
   (Enhanced with colorblind modes)
   ═══════════════════════════════ */
(function() {
  var THEME_KEY = 'phmurt_theme';
  var CB_KEY = 'phmurt_cb_mode';
  var VISITED_KEY = 'phmurt_visited';

  // Apply saved theme
  var saved = localStorage.getItem(THEME_KEY) || 'dark';
  if (saved === 'light') {
    document.documentElement.classList.add('light-mode');
  }

  // Apply saved colorblind mode
  var cbMode = localStorage.getItem(CB_KEY) || 'none';
  if (cbMode !== 'none') {
    document.documentElement.classList.add('cb-' + cbMode);
  }

  window.toggleTheme = function() {
    var isLight = document.documentElement.classList.contains('light-mode');
    document.documentElement.classList.add('theme-transition');
    if (isLight) {
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.add('light-mode');
      localStorage.setItem(THEME_KEY, 'light');
    }
    // Remove first-visit pulse on interaction
    var toggle = document.querySelector('.ps-theme-toggle');
    if (toggle) toggle.classList.remove('first-visit');
    localStorage.setItem(VISITED_KEY, 'true');

    setTimeout(function() {
      document.documentElement.classList.remove('theme-transition');
    }, 500);
  };

  window.setColorblindMode = function(mode) {
    // Remove existing cb classes
    document.documentElement.classList.remove('cb-protanopia', 'cb-deuteranopia', 'cb-tritanopia');
    if (mode && mode !== 'none') {
      document.documentElement.classList.add('cb-' + mode);
    }
    localStorage.setItem(CB_KEY, mode || 'none');
  };

  window.getColorblindMode = function() {
    return localStorage.getItem(CB_KEY) || 'none';
  };

  // First-visit pulse
  document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem(VISITED_KEY)) {
      var toggle = document.querySelector('.ps-theme-toggle');
      if (toggle) {
        toggle.classList.add('first-visit');
        setTimeout(function() {
          toggle.classList.remove('first-visit');
        }, 5000);
      }
    }
  });
})();
