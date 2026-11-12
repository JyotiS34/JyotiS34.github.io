/* ============================================================
   Jyotirmoy Saikia — portfolio presentation layer.
   ============================================================ */
(function () {
  'use strict';

  var ICONS = {
    linkedin: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>',
    github: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    email: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"/><path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"/></svg>',
    kaggle: '<span class="social-letter" aria-hidden="true">k</span>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function slug(text) {
    return String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section';
  }

  function remove(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

 

  function buildHero(content) {
    var visual = document.getElementById('heroVisual');
    var social = document.getElementById('heroSocial');
    var meta = document.getElementById('heroMeta');
    var eyebrow = document.getElementById('heroEyebrow');

    
    var gif = null;
    Array.prototype.some.call(content.querySelectorAll('img'), function (img) {
      var src = img.getAttribute('src') || '';
      if (src.indexOf('img.shields.io') === -1) { gif = img; return true; }
      return false;
    });
    if (gif && visual) {
      var holder = gif.closest('div') || gif.parentElement;
      var frame = document.createElement('div');
      frame.className = 'gif-frame';
      frame.appendChild(gif);
      visual.appendChild(frame);
      if (holder && holder !== content) remove(holder);
    }

   
    var tagline = null;
    Array.prototype.some.call(content.querySelectorAll('p'), function (p) {
      var st = p.querySelector('strong');
      if (st && st.textContent.indexOf('Full-Stack') === 0) { tagline = p; return true; }
      return false;
    });

    if (tagline) {
      var st = tagline.querySelector('strong');
      if (eyebrow && st) eyebrow.textContent = st.textContent;

      if (meta) {
        var afterBr = [];
        var seenBr = false;
        Array.prototype.forEach.call(tagline.childNodes, function (n) {
          if (n.nodeType === 1 && n.tagName === 'BR') { seenBr = true; return; }
          if (seenBr) afterBr.push(n.textContent);
        });
        var edu = afterBr.join(' ').replace(/\s+/g, ' ').trim();
        if (edu) {
          var eduEl = document.createElement('p');
          eduEl.className = 'hero-edu';
          eduEl.textContent = edu;
          meta.appendChild(eduEl);
        }

        
        var next = tagline.nextElementSibling;
        while (next && next.nodeType === 1 && next.tagName !== 'P') next = next.nextElementSibling;
        if (next && next.textContent.indexOf('\u00b7') > -1 && !next.querySelector('a, img')) {
          var pills = document.createElement('ul');
          pills.className = 'hero-pills';
          next.textContent.split('\u00b7').forEach(function (part) {
            var t = part.trim();
            if (!t) return;
            var li = document.createElement('li');
            li.textContent = t;
            pills.appendChild(li);
          });
          if (pills.children.length) meta.appendChild(pills);
          remove(next);
        }
      }
      remove(tagline);
    }

   
    var badgesP = null;
    Array.prototype.some.call(content.querySelectorAll('p'), function (p) {
      if (p.querySelector('img[src*="img.shields.io"]')) { badgesP = p; return true; }
      return false;
    });
    if (badgesP && social) {
      Array.prototype.forEach.call(badgesP.querySelectorAll('a'), function (a) {
        var img = a.querySelector('img');
        var src = img ? (img.getAttribute('src') || '') : '';
        var match = src.match(/img\.shields\.io\/badge\/([^/?]+)/);
        var name = match ? decodeURIComponent(match[1]).split('-')[0] : (a.textContent.trim() || 'Link');
        var icon = ICONS[name.toLowerCase()] || '';
        var btn = document.createElement('a');
        btn.className = 'social-btn';
        var href = a.getAttribute('href') || '#';
        btn.setAttribute('href', href);
        if (href.indexOf('mailto:') !== 0) {
          btn.setAttribute('target', '_blank');
          btn.setAttribute('rel', 'noopener noreferrer');
        }
        btn.innerHTML = icon + '<span>' + esc(name) + '</span>';
        social.appendChild(btn);
      });
      remove(badgesP);
    }
  }

 

  function wrapSections(content) {
    var sections = [];
    var current = null;
    Array.prototype.slice.call(content.childNodes).forEach(function (node) {
      if (node.nodeType === 8) return; // comment
      if (node.nodeType === 3 && !node.textContent.trim()) return;
      if (node.nodeType === 1 && node.tagName === 'HR') { remove(node); return; }
      if (node.nodeType === 1 && node.tagName === 'H3') {
        current = document.createElement('section');
        current.className = 'page-section';
        var id = slug(node.textContent);
        node.removeAttribute('id'); // avoid duplicate ids; the section carries it
        current.id = id;
        content.insertBefore(current, node);
        current.appendChild(node);
        sections.push(current);
        return;
      }
      if (current && node.parentNode === content) current.appendChild(node);
    });
    return sections;
  }

  

  function enhanceSkills() {
    var section = document.getElementById('core-technologies');
    if (!section) return;
    var grid = document.createElement('div');
    grid.className = 'skills-grid';
    Array.prototype.forEach.call(section.querySelectorAll('p'), function (p) {
      var strong = p.querySelector('strong');
      if (!strong) return;
      var card = document.createElement('div');
      card.className = 'skill-card reveal';
      var cat = document.createElement('div');
      cat.className = 'skill-cat';
      cat.textContent = strong.textContent;
      card.appendChild(cat);
      var chips = document.createElement('ul');
      chips.className = 'skill-chips';
      var html = p.innerHTML.replace(/^\s*<strong>[\s\S]*?<\/strong>/i, '');
      html = html.replace(/^\s*[\u2014\u2013-]\s*/, '');
      html.split('\u00b7').forEach(function (seg) {
        var t = seg.trim();
        if (!t) return;
        var li = document.createElement('li');
        li.className = 'chip';
        li.innerHTML = t;
        chips.appendChild(li);
      });
      card.appendChild(chips);
      grid.appendChild(card);
      remove(p);
    });
    if (grid.children.length) section.appendChild(grid);
  }

 

  function toSpecRows(p) {
    var first = p.firstElementChild;
    if (!first || first.tagName !== 'STRONG' || !/:$/.test(first.textContent.trim())) return false;
    if (!p.querySelector('br')) return false;

    var groups = [[]];
    Array.prototype.forEach.call(p.childNodes, function (n) {
      if (n.nodeType === 1 && n.tagName === 'BR') { groups.push([]); return; }
      groups[groups.length - 1].push(n);
    });

    var rows = document.createElement('div');
    rows.className = 'spec-rows';
    groups.forEach(function (g0) {
      var g = g0;
      // Drop leading whitespace-only text nodes (newlines after <br />).
      while (g.length && g[0].nodeType === 3 && !g[0].textContent.trim()) {
        g = g.slice(1);
      }
      if (!g.length) return;
      var items = g;
      var labelText = '';
      var head = items[0];
      if (head.nodeType === 1 && head.tagName === 'STRONG') {
        labelText = head.textContent.replace(/:\s*$/, '').trim();
        items = items.slice(1);
      } else if (head.nodeType === 3) {
        var m = head.textContent.match(/^\s*([^:]{1,40}):\s*/);
        if (m) { labelText = m[1].trim(); head.textContent = head.textContent.slice(m[0].length); }
      }
      var row = document.createElement('div');
      row.className = 'spec-row';
      var label = document.createElement('span');
      label.className = 'spec-label';
      label.textContent = labelText;
      var value = document.createElement('div');
      value.className = 'spec-value';
      items.forEach(function (n) { value.appendChild(n); });
      if (labelText) row.appendChild(label);
      row.appendChild(value);
      rows.appendChild(row);
    });
    p.parentNode.replaceChild(rows, p);
    return true;
  }

  function enhanceProjects() {
    var section = document.getElementById('featured-work');
    if (!section) return;
    Array.prototype.forEach.call(section.querySelectorAll('h4'), function (h4) {
      
      var bodyNodes = [];
      var next = h4.nextElementSibling;
      while (next) {
        var tag = next.tagName;
        if (tag === 'H4' || tag === 'HR' || tag === 'H3') break;
        bodyNodes.push(next);
        next = next.nextElementSibling;
      }

      var card = document.createElement('article');
      card.className = 'project-card reveal';

      
      var head = document.createElement('header');
      head.className = 'project-head';
      var m = h4.textContent.match(/^\s*(\d+)\./);
      if (m) {
        var index = document.createElement('span');
        index.className = 'project-index';
        index.textContent = ('0' + parseInt(m[1], 10)).slice(-2);
        head.appendChild(index);
      }
      var links = Array.prototype.slice.call(h4.querySelectorAll('a'));
      var titleLink = null;
      var extras = [];
      links.forEach(function (a) {
        var t = (a.textContent || '').trim().toLowerCase();
        if (!titleLink && t !== 'live demo') titleLink = a;
        else extras.push(a);
      });
      var title = document.createElement('h4');
      title.className = 'project-title';
      if (titleLink) {
        var a = document.createElement('a');
        a.setAttribute('href', titleLink.getAttribute('href') || '#');
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
        a.textContent = titleLink.textContent.trim();
        title.appendChild(a);
      } else {
        title.textContent = h4.textContent.replace(/^\s*\d+\.\s*/, '').trim();
      }
      head.appendChild(title);
      var actions = document.createElement('div');
      actions.className = 'project-actions';
      extras.forEach(function (a) {
        var chip = document.createElement('a');
        chip.className = 'chip-link';
        chip.setAttribute('href', a.getAttribute('href') || '#');
        chip.setAttribute('target', '_blank');
        chip.setAttribute('rel', 'noopener noreferrer');
        chip.innerHTML = ICONS.external + '<span>' + esc(a.textContent.trim()) + '</span>';
        actions.appendChild(chip);
      });
      if (actions.children.length) head.appendChild(actions);
      card.appendChild(head);

      
      var body = document.createElement('div');
      body.className = 'project-body';
      bodyNodes.forEach(function (n) {
        if (n.nodeType === 3 && !n.textContent.trim()) return;
        body.appendChild(n);
      });
      Array.prototype.slice.call(body.children).forEach(function (el) {
        if (el.tagName !== 'P') return;
        if (!toSpecRows(el)) {
          var st = el.firstElementChild;
          if (st && st.tagName === 'STRONG' && /:$/.test(st.textContent.trim())) el.classList.add('flow-note');
        }
      });
      card.appendChild(body);

      h4.parentNode.insertBefore(card, h4);
      remove(h4);
    });
  }

  

  function enhanceLists() {
    var about = document.getElementById('about-me');
    if (about) {
      var ul = about.querySelector('ul');
      if (ul) {
        ul.classList.add('highlight-list');
        Array.prototype.forEach.call(ul.children, function (li) { li.classList.add('reveal'); });
      }
    }
    var ach = document.getElementById('achievements-research');
    if (ach) {
      var aul = ach.querySelector('ul');
      if (aul) {
        aul.classList.add('achievements-grid');
        Array.prototype.forEach.call(aul.children, function (li) {
          li.classList.add('achievement-card', 'reveal');
          // Lift a leading emoji into an icon badge.
          var raw = li.innerHTML;
          var mm = raw.match(/^\s*([^\s<][^<]*?)\s*</);
          if (mm && mm[1] && mm[1].length <= 6 && /[^\x00-\x7F]/.test(mm[1])) {
            li.innerHTML = '<span class="ach-icon">' + mm[1].trim() + '</span>' + raw.slice(raw.indexOf('<'));
          }
        });
      }
    }
  }



  function enhanceResume() {
    var section = document.getElementById('resume');
    if (!section) return;
    var link = section.querySelector('a.download-resume');
    if (!link) return;
    link.insertAdjacentHTML('afterbegin', ICONS.download);
    var wrap = link.closest('p');
    if (wrap) wrap.classList.add('resume-button-wrap');
    var href = link.getAttribute('href');
    if (href) {
      ['navResume', 'navResumeMobile'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
          el.setAttribute('href', href);
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener noreferrer');
        }
      });
    }
  }

  

  function moveFooter(content) {
    var target = document.getElementById('footerCopy');
    if (!target) return;
    var ps = content.querySelectorAll('p');
    for (var i = ps.length - 1; i >= 0; i--) {
      if (/^\u00a9|^©/.test(ps[i].textContent.trim())) {
        target.textContent = ps[i].textContent.trim();
        remove(ps[i]);
        return;
      }
    }
  }



  function wireNav() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    function closeMenu() {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    Array.prototype.forEach.call(menu.querySelectorAll('a'), function (a) {
      a.addEventListener('click', closeMenu);
    });
    document.addEventListener('click', function (e) {
      if (menu.classList.contains('open') && !menu.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  function wireScrollEffects(sections) {
    var bar = document.getElementById('progressBar');
    var nav = document.getElementById('siteNav');
    var ticking = false;

    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      if (bar) {
        var r = max > 0 ? Math.min(1, (window.scrollY || 0) / max) : 0;
        bar.style.transform = 'scaleX(' + r + ')';
      }
      if (nav) nav.classList.toggle('scrolled', (window.scrollY || 0) > 8);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();

    
    var links = Array.prototype.slice.call(document.querySelectorAll('[data-spy]'));
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    if ('IntersectionObserver' in window && links.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (a) { a.classList.remove('active'); });
            var a = byId[en.target.id];
            if (a) a.classList.add('active');
          }
        });
      }, { rootMargin: '-35% 0px -60% 0px', threshold: 0 });
      sections.forEach(function (s) { spy.observe(s); });
    }


    var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if ('IntersectionObserver' in window) {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('revealed');
            ro.unobserve(en.target);
          }
        });
      }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });
      revealEls.forEach(function (el) { ro.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('revealed'); });
    }
  }

  function init() {
    var content = document.getElementById('pageContent');
    if (!content) return;
    buildHero(content);
    var sections = wrapSections(content);
    enhanceSkills();
    enhanceProjects();
    enhanceLists();
    enhanceResume();
    moveFooter(content);
    wireNav();
    wireScrollEffects(sections);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
