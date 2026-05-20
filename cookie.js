(function () {
  var KEY = 'clumber_consent';

  function loadGA() {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-T8DXHXK64Z';
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-T8DXHXK64Z');
  }

  // Returning visitor who already accepted — fire GA immediately
  if (localStorage.getItem(KEY) === 'accepted') {
    loadGA();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var banner  = document.getElementById('cookieBanner');
    var consent = localStorage.getItem(KEY);

    // First visit — slide banner up after a short delay
    if (!consent && banner) {
      setTimeout(function () { banner.classList.add('visible'); }, 600);
    }

    var acceptBtn  = document.getElementById('cookieAccept');
    var declineBtn = document.getElementById('cookieDecline');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        localStorage.setItem(KEY, 'accepted');
        loadGA();
        hideBanner(banner);
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', function () {
        localStorage.setItem(KEY, 'declined');
        hideBanner(banner);
      });
    }
  });

  function hideBanner(banner) {
    if (!banner) return;
    banner.classList.remove('visible');
    setTimeout(function () { banner.hidden = true; }, 380);
  }
}());
