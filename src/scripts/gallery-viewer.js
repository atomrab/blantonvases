// src/scripts/gallery-viewer.js
// Image viewer: swap large image on thumbnail click, manage active states and keyboard navigation
(function () {
  var container = document.querySelector('.image-viewer');
  if (!container) return;

  var large = container.querySelector('#viewerLarge');
  if (!large) return;

  var thumbs = Array.prototype.slice.call(container.querySelectorAll('.viewer-thumb'));
  if (thumbs.length === 0) return;

  // ensure the large image will fade (needs a CSS transition, see the CSS snippet below)
  large.style.transition = large.style.transition || 'opacity 220ms ease';

  function setActive(thumbEl) {
    thumbs.forEach(function (t) { t.classList.remove('active'); });
    if (thumbEl) thumbEl.classList.add('active');
  }

  function swapTo(src, thumbEl) {
    if (!src) return;
    // quick guard to avoid unnecessary reload if already showing
    if (large.getAttribute('src') === src) {
      setActive(thumbEl);
      return;
    }

    // fade out
    large.style.opacity = '0.15';

    // preload then swap
    var img = new Image();
    img.onload = function () {
      large.setAttribute('src', src);
      // small delay to allow DOM paint, then fade in
      requestAnimationFrame(function () {
        large.style.opacity = '1';
      });
      setActive(thumbEl);
    };
    img.onerror = function () {
      // on error just restore opacity
      large.style.opacity = '1';
    };
    img.src = src;
  }

  thumbs.forEach(function (thumb) {
    // click (or button) swaps image
    thumb.addEventListener('click', function (e) {
      e.preventDefault();
      var src = thumb.dataset.src || thumb.getAttribute('data-src');
      swapTo(src, thumb);
    });

    // keyboard activation
    thumb.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        thumb.click();
      }
    });
  });

  // set initial active thumb (matching large src) or first thumb
  var initial = thumbs.find(function (t) {
    var s = t.dataset.src || t.getAttribute('data-src');
    return s === large.getAttribute('src');
  });
  setActive(initial || thumbs[0]);

  // optional: left/right arrow navigation when focus is inside the viewer
  container.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    var activeIndex = thumbs.findIndex(function (t) { return t.classList.contains('active'); });
    if (activeIndex < 0) activeIndex = 0;
    if (e.key === 'ArrowLeft') activeIndex = (activeIndex - 1 + thumbs.length) % thumbs.length;
    if (e.key === 'ArrowRight') activeIndex = (activeIndex + 1) % thumbs.length;
    thumbs[activeIndex].focus();
    thumbs[activeIndex].click();
  });
})();