(function () {
  'use strict';

  function initScrollAnimations() {
    const targets = document.querySelectorAll('.card-row');
    if (!targets || targets.length === 0) return;

    // If IntersectionObserver not supported, just reveal everything
    if (!('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('in-view'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -20% 0px', // trigger a bit before the element is fully visible
      threshold: 0.15
    };

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // animate once only; uncomment next line if you want the animation to toggle on scroll
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    targets.forEach(t => io.observe(t));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
})();