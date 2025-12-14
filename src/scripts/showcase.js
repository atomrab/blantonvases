document.addEventListener('DOMContentLoaded', function () {
  const stage = document.querySelector('.pedestal-stage');
  if (!stage) return;

  const items = Array.from(stage.querySelectorAll('.pedestal-item'));

  items.forEach(item => {
    const vase = item.querySelector('.vase');

    if (!vase) return;

    // mouse interactions
    vase.addEventListener('mouseenter', () => {
      stage.classList.add('dimmed');
      items.forEach(i => i.classList.remove('focused'));
      item.classList.add('focused');
    });

    vase.addEventListener('mouseleave', () => {
      stage.classList.remove('dimmed');
      item.classList.remove('focused');
    });

    // keyboard accessibility
    vase.addEventListener('focus', () => {
      stage.classList.add('dimmed');
      items.forEach(i => i.classList.remove('focused'));
      item.classList.add('focused');
    });

    vase.addEventListener('blur', () => {
      stage.classList.remove('dimmed');
      item.classList.remove('focused');
    });
  });

  // if mouse leaves the whole stage, clear the dim
  stage.addEventListener('mouseleave', () => {
    stage.classList.remove('dimmed');
    items.forEach(i => i.classList.remove('focused'));
  });
});

// Align each vase bottom to the top of its pedestal image
(function () {
  function alignVasesToPedestalTop() {
    const stage = document.querySelector('.pedestal-stage');
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();
    const stageWidth = stage.clientWidth;
    const stageHeight = stage.clientHeight;
    // console.log(`Stage dimensions: ${stageWidth}x${stageHeight}`);

    const items = stage.querySelectorAll('.pedestal-item');

    items.forEach(item => {
      const pedestal = item.querySelector('.pedestal-img');
      const vase = item.querySelector('.vase');
      if (!vase || !pedestal) return;
      const pedRect = pedestal.getBoundingClientRect();
      const vaseRect = vase.getBoundingClientRect();
      const boxRect = item.getBoundingClientRect();
      console.log("Pedestal Pos:", pedRect.left, ",", pedRect.y);
      console.log("Stage Pos:", boxRect.left, ",", boxRect.y);
      console.log("Vase Pos:", vaseRect.left, ",", vaseRect.top);

      // ensure vase is absolutely positioned relative to the stage:
      vase.style.position = 'absolute';
      vase.style.left = (pedRect.width - vaseRect.width)/2 + 'px';
      // set bottom so vase bottom touches pedestal top
      vase.style.top = (60 - vaseRect.height) + 'px';

      // optional: you may want to size vase relative to the stage or pedestal:
      // e.g. vase.style.height = Math.round(stageHeight * 0.22) + 'px';
      // uncomment and adjust if desired.
    });
  }

  // run after images/layout are loaded
  window.addEventListener('load', alignVasesToPedestalTop);
  // also run on resize (debounced)
  window.addEventListener('resize', function () {
    clearTimeout(window.__alignVasesTimer);
    window.__alignVasesTimer = setTimeout(alignVasesToPedestalTop, 80);
  });

  // try to run soon in case load already fired
  setTimeout(alignVasesToPedestalTop, 150);
})();