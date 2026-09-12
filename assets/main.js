(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  var sections = navLinks.map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('bg-white/90', window.scrollY > 8);
    header.classList.toggle('shadow-sm', window.scrollY > 8);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var active = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('bg-[#EAF1FF]', active);
          link.classList.toggle('text-[#0033A0]', active);
          link.classList.toggle('text-[#475569]', !active);
        });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(function (section) { observer.observe(section); });
  }

  document.querySelectorAll('#faq details').forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      document.querySelectorAll('#faq details').forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });
})();
