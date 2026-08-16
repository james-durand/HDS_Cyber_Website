/* =========================================================================
   HDS Cyber - shared behaviour
   Loaded with defer by index.html and every page under blog/.
   Every block is guarded so pages without a given element are a no-op.
   ========================================================================= */

/* =======================================================================
   WhatsApp number — SET THIS ONCE when finalised, then you're done.
   International format, digits only (no "+", no spaces). e.g. '27821234567'
   Leave as '' to keep the placeholder (the WhatsApp buttons fall back to
   email in the meantime, so they are never a dead link).
   ======================================================================= */
var WHATSAPP_NUMBER = '27825546888';

(function () {
  var WHATSAPP_MESSAGE = "Hi HDS Cyber, I'd like to book my free Lowveld Cyber Check.";
  var digits = (WHATSAPP_NUMBER || '').replace(/[^0-9]/g, '');
  Array.prototype.slice.call(document.querySelectorAll('[data-whatsapp-placeholder]')).forEach(function (a) {
    if (digits) {
      a.href = 'https://wa.me/' + digits + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE);
      a.removeAttribute('data-whatsapp-placeholder');
    } else {
      // No number yet — open email so the visitor still reaches us.
      a.href = 'mailto:hello@hdscyber.co.za?subject=' + encodeURIComponent('Book my free Lowveld Cyber Check');
      a.setAttribute('title', 'WhatsApp coming soon — opens email for now');
    }
  });
})();

(function () {
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (!nav || !toggle || !navLinks) return;
  // Blog pages link back to index.html#section, so this is empty there — the
  // scrollspy below simply has nothing to highlight, which is correct.
  var links = Array.prototype.slice.call(navLinks.querySelectorAll('a[href^="#"]'));

  // Year
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Scrolled state for nav background
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu toggle
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Close mobile menu after choosing a link
  navLinks.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Active link highlighting
  var sections = ['services', 'sectors', 'about', 'how', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var byId = {};
  links.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    byId[id] = a;
  });

  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('is-active'); });
          var active = byId[en.target.id];
          if (active) active.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });

    // Scroll reveal
    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          obs.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.slice.call(document.querySelectorAll('.reveal')).forEach(function (el) {
      revealer.observe(el);
    });
  } else {
    Array.prototype.slice.call(document.querySelectorAll('.reveal')).forEach(function (el) {
      el.classList.add('is-in');
    });
  }
})();
