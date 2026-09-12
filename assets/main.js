(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  var sections = navLinks.map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);
  var mobileCta = document.querySelector('.site-mobile-cta');
  var ctaSection = document.querySelector('#cta');
  var activeSectionId = '';

  function updateHeader() {
    if (!header) return;
    var scrolled = window.scrollY > 8;
    header.classList.toggle('bg-white/70', !scrolled);
    header.classList.toggle('bg-white/90', scrolled);
    header.classList.toggle('shadow-sm', scrolled);
    navLinks.forEach(function (link) {
      var active = link.getAttribute('href') === '#' + activeSectionId;
      link.classList.toggle('text-[#475569]', !active);
    });
  }

  function setActiveNav(sectionId) {
    if (sectionId === activeSectionId) return;
    activeSectionId = sectionId || '';
    navLinks.forEach(function (link) {
      var active = Boolean(sectionId) && link.getAttribute('href') === '#' + sectionId;
      link.classList.toggle('bg-[#EAF1FF]', active);
      link.classList.toggle('text-[#0033A0]', active);
      link.classList.toggle('text-[#475569]', !active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function focusAnchorTarget(target) {
    if (!target || typeof target.focus !== 'function') return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    window.requestAnimationFrame(function () {
      target.focus({ preventScroll: true });
    });
  }

  function handleInternalLinks(event) {
    var href = event.currentTarget.getAttribute('href');
    if (!href || href.charAt(0) !== '#' || href === '#') return;
    var target = document.querySelector(href);
    if (!target) return;
    focusAnchorTarget(target);
  }

  function updateMobileCta(entries) {
    if (!mobileCta || !ctaSection) return;
    var ctaVisible = entries.some(function (entry) { return entry.isIntersecting; });
    mobileCta.classList.toggle('site-mobile-cta-hidden', ctaVisible);
    mobileCta.setAttribute('aria-hidden', ctaVisible ? 'true' : 'false');
    mobileCta.tabIndex = ctaVisible ? -1 : 0;
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  navLinks.forEach(function (link) {
    link.addEventListener('click', handleInternalLinks);
  });
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', handleInternalLinks);
  });

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (entry) { return entry.isIntersecting; });
      if (!visible.length) return;
      visible.sort(function (a, b) {
        return b.intersectionRatio - a.intersectionRatio;
      });
      setActiveNav(visible[0].target.id);
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0.1, 0.35, 0.65] });
    sections.forEach(function (section) { sectionObserver.observe(section); });

    if (mobileCta && ctaSection) {
      var ctaObserver = new IntersectionObserver(updateMobileCta, {
        threshold: 0.05,
        rootMargin: '0px 0px -8% 0px'
      });
      ctaObserver.observe(ctaSection);
    }
  } else if (mobileCta) {
    mobileCta.classList.remove('site-mobile-cta-hidden');
  }

  document.querySelectorAll('#faq details').forEach(function (item) {
    item.addEventListener('toggle', function () {
      document.querySelectorAll('#faq details').forEach(function (other) {
        other.classList.toggle('faq-open', other === item && item.open);
        if (other !== item && item.open) other.open = false;
      });
    });
  });
})();
