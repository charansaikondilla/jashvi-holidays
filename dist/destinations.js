(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const strips = [...document.querySelectorAll('.travel-strip[id]')];
  const controls = [...document.querySelectorAll('[data-strip]')];

  strips.forEach((strip) => {
    let cycleWidth = 0;
    let resumeAt = 0;
    let previousFrame = 0;
    let initialized = false;

    const buildLoop = () => {
      strip.querySelectorAll('[data-carousel-copy="true"]').forEach((copy) => copy.remove());
      const originalItems = [...strip.children];
      const widthBeforeCopy = strip.scrollWidth;
      originalItems.forEach((item) => {
        const copy = item.cloneNode(true);
        copy.dataset.carouselCopy = 'true';
        copy.setAttribute('aria-hidden', 'true');
        copy.setAttribute('tabindex', '-1');
        copy.querySelectorAll('a,button,[tabindex]').forEach((control) => control.setAttribute('tabindex', '-1'));
        strip.append(copy);
      });
      cycleWidth = strip.scrollWidth - widthBeforeCopy;
      strip.scrollLeft = cycleWidth;
      initialized = cycleWidth > 0;
    };

    const keepInLoop = () => {
      if (!initialized) return;
      const rightEdge = cycleWidth * 2 - strip.clientWidth;
      if (strip.scrollLeft <= 0) strip.scrollLeft += cycleWidth;
      else if (strip.scrollLeft >= rightEdge - 1) strip.scrollLeft -= cycleWidth;
    };

    const pause = () => { resumeAt = Date.now() + 6500; };
    ['pointerdown', 'touchstart', 'wheel', 'focusin'].forEach((type) => {
      strip.addEventListener(type, pause, { passive: true });
    });
    strip.addEventListener('scroll', keepInLoop, { passive: true });
    strip.addEventListener('keydown', (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      pause();
      strip.scrollBy({
        left: (event.key === 'ArrowRight' ? 1 : -1) * Math.max(180, strip.clientWidth * 0.75),
        behavior: reduceMotion.matches ? 'auto' : 'smooth'
      });
    });

    buildLoop();

    const animate = (now) => {
      if (previousFrame && initialized && document.visibilityState === 'visible') {
        const interacting = strip.matches(':hover,:focus-within') || Date.now() < resumeAt;
        if (interacting) {
          strip.classList.remove('is-auto-scrolling');
        } else {
          strip.classList.add('is-auto-scrolling');
          const elapsed = Math.min(48, now - previousFrame);
          strip.scrollLeft += elapsed * 0.035;
        }
      } else strip.classList.remove('is-auto-scrolling');
      previousFrame = now;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    window.addEventListener('resize', () => {
      buildLoop();
    }, { passive: true });
  });

  controls.forEach((button) => {
    button.addEventListener('click', () => {
      const strip = document.getElementById(button.dataset.strip);
      if (!strip) return;
      strip.scrollBy({
        left: (button.dataset.dir === '-1' ? -1 : 1) * Math.max(180, strip.clientWidth * 0.78),
        behavior: reduceMotion.matches ? 'auto' : 'smooth'
      });
    });
  });
})();
