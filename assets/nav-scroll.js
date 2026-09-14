(function () {
  function setup() {
    var nav = document.querySelector('.site-nav');
    if (!nav) return;

    var expanded = parseFloat(getComputedStyle(nav).top) || 14;
    var compact = Math.max(4, expanded - 10);
    var isCompact = false;

    nav.style.transition = 'top .45s cubic-bezier(.16,1,.3,1), padding .35s ease, box-shadow .35s ease';
    nav.style.top = expanded + 'px';

    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      var shouldBeCompact = y > 40;
      if (shouldBeCompact !== isCompact) {
        isCompact = shouldBeCompact;
        nav.style.top = (isCompact ? compact : expanded) + 'px';
        nav.classList.toggle('is-compact', isCompact);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
