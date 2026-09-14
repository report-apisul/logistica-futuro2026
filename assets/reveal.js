/* Revelação de texto ao rolar: títulos sobem palavra por palavra (máscara),
   o resto do conteúdo entra com leve avanço + fade. Aplicado automaticamente
   via seletores, sem precisar marcar cada elemento no HTML. Se o JS falhar,
   nada fica escondido: o CSS só esconde depois que a classe rv-ready existe. */
(function () {
  function wrapWords(el) {
    if (el.hasAttribute('data-rv-words')) return;
    el.setAttribute('data-rv-words', '');
    const text = el.textContent;
    el.textContent = '';
    const words = text.split(/(\s+)/);
    words.forEach((w) => {
      if (/^\s+$/.test(w)) {
        el.appendChild(document.createTextNode(w));
        return;
      }
      if (!w) return;
      const outer = document.createElement('span');
      outer.className = 'rv-word';
      const inner = document.createElement('span');
      inner.className = 'rv-word-inner';
      inner.textContent = w;
      outer.appendChild(inner);
      el.appendChild(outer);
    });
    setTimeout(() => el.classList.add('rv-ready'), 0);
  }

  // Contador: números (.stat .v) sobem de 0 até o valor final quando entram
  // em tela. Entende prefixo (ex: "R$ "), número em formato BR (1.300 / 16,7)
  // e sufixo (ex: " bi", "%", "+", " anos") e mantém tudo intacto ao redor.
  function parseCounter(text) {
    const m = text.trim().match(/^([^\d]*)([\d]{1,3}(?:[.,]\d+)*)(.*)$/s);
    if (!m) return null;
    const [, prefix, numStr, suffix] = m;
    const decimalMatch = numStr.match(/,(\d+)$/);
    const decimals = decimalMatch ? decimalMatch[1].length : 0;
    const normalized = numStr.replace(/\./g, '').replace(',', '.');
    const target = parseFloat(normalized);
    if (isNaN(target)) return null;
    return { prefix, suffix, target, decimals };
  }

  function formatCounter(value, decimals) {
    if (decimals > 0) return value.toFixed(decimals).replace('.', ',');
    return Math.round(value).toLocaleString('pt-BR');
  }

  function runCounter(el) {
    if (el.dataset.rvCounted) return;
    const parsed = parseCounter(el.textContent);
    if (!parsed) return;
    el.dataset.rvCounted = '1';
    const { prefix, suffix, target, decimals } = parsed;
    const duration = 1100;
    const start = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + formatCounter(target * eased, decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function setup() {
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // títulos: revelação palavra a palavra
    const titleSelectors = '.page-head h1, .home-section h2';
    document.querySelectorAll(titleSelectors).forEach(wrapWords);

    // blocos de conteúdo: fade + leve subida
    const groupSelectors = [
      '.page-head .eyebrow', '.page-head .lede', '.page-head .back-link',
      '.speakers-row .sp',
      '.article > p', '.article > h2', '.article > ul', '.article > blockquote',
      '.article > .raiox', '.article > .stats-block', '.article > .diagram',
      '.article > .attrito', '.article > .fator-humano', '.article > .closing-quote',
      '.article > .glossario', '.article > .closing-q', '.article > .pagenav',
      '.article > .speaker-photo', '.article > .byline',
      '.stats-block .stats .stat', '.diagram .flow-step', '.fh-grid .fh-card',
      '.item', '.mini-card', '.vitem',
      '.home-section .wrap > .lede', '.home-section .wrap > .evento-stats',
      '.home-section .wrap > .feature-card', '.home-section .wrap > .mini-grid',
      '.home-section .wrap > .section-foot',
    ].join(', ');

    let i = 0;
    document.querySelectorAll(groupSelectors).forEach((el) => {
      if (el.classList.contains('rv')) return;
      el.classList.add('rv');
      el.style.transitionDelay = reduceMotion ? '0s' : Math.min(i % 6, 5) * 0.06 + 's';
      i++;
    });

    const counters = document.querySelectorAll('.stat .v');

    if (reduceMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.rv').forEach((el) => el.classList.add('rv-in'));
      document.querySelectorAll('[data-rv-words]').forEach((el) => el.classList.add('rv-in', 'rv-settled'));
      counters.forEach((el) => { el.dataset.rvCounted = '1'; });
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('rv-in');
        if (el.hasAttribute('data-rv-words')) {
          setTimeout(() => el.classList.add('rv-settled'), 900);
        }
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.rv, [data-rv-words]').forEach((el) => io.observe(el));

    const counterIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        counterIo.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => counterIo.observe(el));
  }

  function start() {
    // Roda logo, e de novo algumas vezes nos primeiros segundos: em páginas
    // com o runtime da Hero (x-dc), o conteúdo é montado de forma assíncrona
    // e pode não existir ainda no DOM no instante em que este script executa.
    // Cada chamada de setup() é segura de repetir (elementos já marcados são
    // ignorados), então essas repetições só pegam o que apareceu depois.
    setup();
    [50, 150, 400, 900, 1800].forEach((ms) => setTimeout(setup, ms));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
