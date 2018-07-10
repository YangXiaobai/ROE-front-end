(function() {
  'use strict';

  const applicationServerPublicKey = 'BCn0Se9h3N3NrEVBi0p8CW0AXbMSRBlWhhZkIB5qJsvOXa7ltzbj0MXqSGYq80pa8a5LOdofcYXd-s5abvq1_q0';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors.
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  window.addEventListener('load', function() {
      if (navigator.serviceWorker) {
      console.log('Service Worker is supported');
      navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        console.log('Service Worker is registered', registration);
      })
      .catch(function(error) {
        console.error('Service Worker Error', error);
      });
      } else {
        console.warn('Push messaging is not supported');
      }
  });

})();
