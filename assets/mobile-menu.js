(function () {
  var button = document.querySelector('.menu-toggle');
  var menu = document.getElementById('primary-navigation');
  if (!button || !menu) return;

  function setOpen(open) {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
  }

  button.addEventListener('click', function () {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      button.focus();
    }
  });

  document.addEventListener('click', function (event) {
    if (button.getAttribute('aria-expanded') === 'true' && !menu.contains(event.target) && !button.contains(event.target)) {
      setOpen(false);
    }
  });

  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });

  var desktop = window.matchMedia('(min-width: 941px)');
  function resetForDesktop(event) {
    if (event.matches) setOpen(false);
  }
  if (desktop.addEventListener) desktop.addEventListener('change', resetForDesktop);
  else desktop.addListener(resetForDesktop);
})();