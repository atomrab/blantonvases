// src/scripts/collection.js
document.addEventListener('DOMContentLoaded', function () {
  var filter = document.getElementById('collectionFilter');
  var gallery = document.getElementById('collectionGallery');
  if (!filter || !gallery) return;

  var cards = Array.prototype.slice.call(gallery.querySelectorAll('.gallery-card'));

  function applyFilter(value) {
    if (value === 'all') {
      cards.forEach(function (c) { c.classList.remove('hidden'); });
    } else if (value === 'with') {
      cards.forEach(function (c) {
        var has = c.getAttribute('data-has-model') === 'true';
        c.classList.toggle('hidden', !has);
      });
    } else if (value === 'without') {
      cards.forEach(function (c) {
        var has = c.getAttribute('data-has-model') === 'true';
        c.classList.toggle('hidden', has);
      });
    }
    // focus the gallery for keyboard users
    gallery.focus();
  }

  // initial state: show all
  applyFilter(filter.value || 'all');

  filter.addEventListener('change', function (e) {
    applyFilter(e.target.value);
  });
});