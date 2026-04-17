/* =====================================================
   Den Hartog Wandafwerking — Offerte Popup
   Zelfstandig script: voegt stijlen, HTML en logica toe
   ===================================================== */
(function () {

  var ONTVANGERSEMAIL    = 'lucd.hartog@gmail.com';
  var POPUP_VERTRAGING   = 10;
  var NIET_OPNIEUW_DAGEN = 7;
  var KEY                = 'dhw_popup_v2';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    injectStyles();
    injectHTML();
    bindEvents();
    if (!seen()) setTimeout(dhwOpen, POPUP_VERTRAGING * 1000);
  }

  function seen() {
    try {
      var ts = localStorage.getItem(KEY);
      if (!ts) return false;
      return (Date.now() - Number(ts)) / 86400000 < NIET_OPNIEUW_DAGEN;
    } catch (e) { return false; }
  }

  function markSeen() {
    try { localStorage.setItem(KEY, Date.now()); } catch (e) {}
  }

  function dhwOpen() {
    var el = document.getElementById('dhwOverlay');
    if (el) el.classList.add('open');
  }

  function dhwClose() {
    var el = document.getElementById('dhwOverlay');
    if (el) el.classList.remove('open');
    markSeen();
  }

  function injectStyles() {
    if (document.getElementById('dhw-popup-styles')) return;
    var style = document.createElement('style');
    style.id = 'dhw-popup-styles';
    style.textContent = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');"
      + "#dhwOverlay{position:fixed;inset:0;z-index:99999;background:rgba(5,5,15,.82);display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;pointer-events:none;backdrop-filter:blur(8px);transition:opacity .3s ease;}"
      + "#dhwOverlay.open{opacity:1;pointer-events:all;}"
      + "#dhwCard{width:100%;max-width:400px;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.55),0 0 0 1px rgba(205,127,50,.12);transform:translateY(30px) scale(.97);transition:transform .4s cubic-bezier(.34,1.5,.64,1);font-family:'Inter',sans-serif;position:relative;}"
      + "#dhwOverlay.open #dhwCard{transform:translateY(0) scale(1);}"
      + "#dhwClose{position:absolute;top:14px;right:14px;z-index:10;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.18);border:1.5px solid rgba(255,255,255,.35);color:#fff;font-size:.95rem;font-weight:700;cursor:pointer;line-height:28px;text-align:center;padding:0;transition:background .15s,transform .12s;}"
      + "#dhwClose:hover{background:rgba(255,255,255,.32);transform:scale(1.1);}"
      + "#dhwHeader{background:linear-gradient(145deg,#0d0d1a 0%,#1c1c30 100%);padding:28px 24px 20px;position:relative;}"
      + ".dhw-stars{display:flex;align-items:center;gap:6px;margin-bottom:12px;}"
      + ".dhw-stars .stars{color:#CD7F32;font-size:1rem;letter-spacing:1px;}"
      + ".dhw-stars .rating{font-size:.75rem;font-weight:600;color:rgba(255,255,255,.55);}"
      + "#dhwHeader h2{font-size:1.4rem;font-weight:900;color:#fff;margin:0 0 7px;line-height:1.2;}"
      + "#dhwHeader h2 em{color:#CD7F32;font-style:normal;}"
      + "#dhwHeader p{font-size:.82rem;color:rgba(255,255,255,.55);margin:0;line-height:1.5;}"
      + "#dhwDiscount{background:#CD7F32;padding:9px 24px;display:flex;align-items:center;gap:10px;}"
      + "#dhwDiscount .disc-pct{background:rgba(0,0,0,.2);border-radius:7px;padding:2px 9px;font-size:1rem;font-weight:900;color:#fff;white-space:nowrap;}"
      + "#dhwDiscount .disc-copy{font-size:.78rem;font-weight:600;color:rgba(255,255,255,.92);line-height:1.3;}"
      + "#dhwBody{padding:20px 24px 24px;}"
      + ".dhw-proof{display:flex;background:#f8f8f8;border-radius:10px;overflow:hidden;margin-bottom:18px;border:1px solid #efefef;}"
      + ".dhw-proof-item{flex:1;padding:10px 8px;text-align:center;border-right:1px solid #efefef;}"
      + ".dhw-proof-item:last-child{border-right:none;}"
      + ".dhw-proof-item .pnum{display:block;font-size:1.05rem;font-weight:800;color:#111827;line-height:1;}"
      + ".dhw-proof-item .plabel{display:block;font-size:.62rem;color:#9ca3af;font-weight:500;margin-top:2px;}"
      + ".dhw-field{margin-bottom:11px;}"
      + ".dhw-field label{display:block;font-size:.72rem;font-weight:700;color:#374151;margin-bottom:5px;letter-spacing:.01em;text-transform:uppercase;}"
      + ".dhw-field input{width:100%;padding:12px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:.9rem;color:#111827;background:#fafafa;transition:border-color .15s,box-shadow .15s,background .15s;box-sizing:border-box;font-family:'Inter',sans-serif;}"
      + ".dhw-field input:focus{outline:none;border-color:#CD7F32;box-shadow:0 0 0 3px rgba(205,127,50,.12);background:#fff;}"
      + ".dhw-field input::placeholder{color:#c4c9d4;}"
      + "#dhwSubmit{width:100%;padding:14px;background:#CD7F32;color:#fff;border:none;border-radius:11px;font-size:.95rem;font-weight:800;cursor:pointer;letter-spacing:.01em;font-family:'Inter',sans-serif;box-shadow:0 4px 18px rgba(205,127,50,.38);transition:background .15s,transform .12s,box-shadow .15s;margin-top:4px;display:flex;align-items:center;justify-content:center;gap:8px;}"
      + "#dhwSubmit:hover{background:#b36b28;transform:translateY(-1px);box-shadow:0 7px 24px rgba(205,127,50,.48);}"
      + "#dhwSubmit:disabled{opacity:.65;cursor:not-allowed;transform:none;}"
      + ".dhw-guarantee{margin-top:12px;display:flex;align-items:center;justify-content:center;gap:5px;font-size:.68rem;color:#9ca3af;line-height:1.4;}"
      + "#dhwSuccess{display:none;padding:44px 24px 36px;text-align:center;}"
      + ".dhw-check-circle{width:68px;height:68px;margin:0 auto 16px;background:linear-gradient(135deg,#CD7F32,#e8a84c);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.9rem;color:#fff;}"
      + "#dhwSuccess h3{font-size:1.25rem;font-weight:800;color:#111827;margin:0 0 8px;}"
      + "#dhwSuccess p{color:#6b7280;font-size:.85rem;line-height:1.65;margin:0;}"
      + "#dhwSuccess .dhw-ok-btn{margin-top:20px;padding:11px 32px;background:#111827;color:#fff;border:none;border-radius:10px;font-size:.88rem;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;}"
      + "#dhwFloat{position:fixed;bottom:24px;right:24px;z-index:9998;background:#CD7F32;color:#fff;border:none;border-radius:50px;padding:13px 22px;font-size:.87rem;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;box-shadow:0 6px 22px rgba(205,127,50,.45);display:flex;align-items:center;gap:8px;transition:background .15s,transform .15s,box-shadow .15s;animation:dhwPulse 3s ease-in-out infinite;}"
      + "#dhwFloat:hover{background:#b36b28;transform:translateY(-2px);}"
      + "@keyframes dhwPulse{0%,100%{box-shadow:0 6px 22px rgba(205,127,50,.45);}50%{box-shadow:0 6px 30px rgba(205,127,50,.75);}}"
      + "@media(max-width:440px){#dhwHeader{padding:24px 18px 18px;}#dhwBody{padding:18px 18px 20px;}#dhwFloat{bottom:14px;right:14px;padding:11px 16px;font-size:.82rem;}}";
    document.head.appendChild(style);
  }

  function injectHTML() {
    if (document.getElementById('dhwOverlay')) return;
    var div = document.createElement('div');
    div.innerHTML = '<button id="dhwFloat">Gratis offerte \u2192</button>'
      + '<div id="dhwOverlay" role="dialog" aria-modal="true">'
      + '<div id="dhwCard">'
      + '<button id="dhwClose" aria-label="Sluiten">\u2715</button>'
      + '<div id="dhwHeader">'
      + '<div class="dhw-stars"><span class="stars">\u2605\u2605\u2605\u2605\u2605</span><span class="rating">4.9 \u00b7 150+ klanten</span></div>'
      + '<h2>Wat kost uw<br><em>wandafwerking?</em></h2>'
      + '<p>Laat uw nummer achter \u2014 wij bellen u terug met een eerlijke prijs, zonder gedoe.</p>'
      + '</div>'
      + '<div id="dhwDiscount"><span class="disc-pct">5% korting</span><span class="disc-copy">Alleen voor aanvragen via deze popup</span></div>'
      + '<div id="dhwBody">'
      + '<div class="dhw-proof">'
      + '<div class="dhw-proof-item"><span class="pnum">10+</span><span class="plabel">jaar ervaring</span></div>'
      + '<div class="dhw-proof-item"><span class="pnum">150+</span><span class="plabel">projecten</span></div>'
      + '<div class="dhw-proof-item"><span class="pnum">24u</span><span class="plabel">reactietijd</span></div>'
      + '</div>'
      + '<form id="dhwForm">'
      + '<div class="dhw-field"><label>Uw naam</label><input type="text" name="naam" placeholder="Jan de Vries" required autocomplete="name"></div>'
      + '<div class="dhw-field"><label>Telefoonnummer</label><input type="tel" name="telefoon" placeholder="06 12 34 56 78" required autocomplete="tel"></div>'
      + '<div class="dhw-field"><label>E-mailadres</label><input type="email" name="email" placeholder="jan@email.nl" required autocomplete="email"></div>'
      + '<button type="submit" id="dhwSubmit">Stuur mij een gratis offerte \u2192</button>'
      + '</form>'
      + '<div class="dhw-guarantee">\uD83D\uDD12 Geen spam \u00b7 Geen verplichtingen \u00b7 Altijd gratis</div>'
      + '</div>'
      + '<div id="dhwSuccess">'
      + '<div class="dhw-check-circle">\u2713</div>'
      + '<h3>Top! We bellen u snel.</h3>'
      + '<p>Uw aanvraag is ontvangen. We nemen uiterlijk binnen 24 uur contact op.<br><br><strong style="color:#CD7F32">Uw 5% korting staat klaar.</strong></p>'
      + '<button class="dhw-ok-btn">Sluiten</button>'
      + '</div>'
      + '</div>'
      + '</div>';
    document.body.appendChild(div);
  }

  function bindEvents() {
    setTimeout(function () {
      var overlay = document.getElementById('dhwOverlay');
      var closeBtn = document.getElementById('dhwClose');
      var floatBtn = document.getElementById('dhwFloat');
      var form = document.getElementById('dhwForm');
      var okBtn = document.querySelector('#dhwSuccess .dhw-ok-btn');
      if (overlay) overlay.addEventListener('click', function (e) { if (e.target === overlay) dhwClose(); });
      if (closeBtn) closeBtn.addEventListener('click', dhwClose);
      if (floatBtn) floatBtn.addEventListener('click', function () { try { localStorage.removeItem(KEY); } catch(e){} dhwOpen(); });
      if (okBtn) okBtn.addEventListener('click', dhwClose);
      if (form) form.addEventListener('submit', handleSubmit);
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') dhwClose(); });
    }, 50);
  }

  function handleSubmit(e) {
    e.preventDefault();
    var btn = document.getElementById('dhwSubmit');
    if (btn) { btn.disabled = true; btn.textContent = 'Bezig...'; }
    var form = document.getElementById('dhwForm');
    var naam = (form.querySelector('[name=naam]') || {}).value || '';
    var telefoon = (form.querySelector('[name=telefoon]') || {}).value || '';
    var email = (form.querySelector('[name=email]') || {}).value || '';
    var sub = encodeURIComponent('Offerte aanvraag - Den Hartog Wandafwerking (5% korting)');
    var body = encodeURIComponent('Naam: ' + naam + '\nTelefoon: ' + telefoon + '\nE-mail: ' + email + '\n\nKlant ontvangt 5% korting.\n---\nVia denhartog-wandafwerking.nl');
    window.location.href = 'mailto:' + ONTVANGERSEMAIL + '?subject=' + sub + '&body=' + body;
    setTimeout(function () {
      var f = document.getElementById('dhwForm');
      var s = document.getElementById('dhwSuccess');
      if (f) f.style.display = 'none';
      if (s) s.style.display = 'block';
      markSeen();
    }, 500);
  }

})();
