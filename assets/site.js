// Den Hartog Wandafwerking — menu en conversiemetingen
(function () {
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.burger');
  if (nav && burger) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.menu a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function track(name, label) {
    if (typeof gtag === 'function') {
      gtag('event', name, { event_category: 'conversie', event_label: label });
    }
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) track('telefoon_klik', href);
    else if (href.indexOf('mailto:') === 0) track('email_klik', href);
    else if (href.indexOf('wa.me') !== -1) track('whatsapp_klik', a.textContent.trim());
    else if (href.indexOf('#offerte') !== -1) track('offerte_klik', a.textContent.trim());
  });
  var form = document.querySelector('form[action*="formspree"]');
  if (form) {
    form.addEventListener('submit', function () { track('offerte_aanvraag', 'formulier_submit'); });
    var file = form.querySelector('input[type="file"]');
    if (file) {
      file.addEventListener('change', function () {
        if (this.files && this.files[0] && this.files[0].size > 10 * 1024 * 1024) {
          alert('Dit bestand is groter dan 10 MB. Stuur je plattegrond dan liever via WhatsApp.');
          this.value = '';
        }
      });
    }
  }
})();
