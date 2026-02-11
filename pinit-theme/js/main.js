/* Pinit v1.0 - Main JavaScript */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {

    /* ── Mobile Menu Toggle ── */
    var toggle = document.querySelector('.site-header__toggle');
    var header = document.querySelector('.site-header');

    if (toggle && header) {
      toggle.addEventListener('click', function() {
        var isOpen = header.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', isOpen);
        toggle.querySelector('i').className = isOpen ? 'ti ti-x' : 'ti ti-menu-2';
      });
    }

    /* ── Desktop Dropdown: open on hover ── */
    var parentItems = document.querySelectorAll('.site-header__nav .hs-item-has-children');

    parentItems.forEach(function(item) {
      // Desktop: show/hide on hover
      item.addEventListener('mouseenter', function() {
        if (window.innerWidth >= 768) {
          this.classList.add('is-dropdown-open');
        }
      });
      item.addEventListener('mouseleave', function() {
        if (window.innerWidth >= 768) {
          this.classList.remove('is-dropdown-open');
        }
      });

      // Mobile: toggle on click of the parent link
      var parentLink = item.querySelector(':scope > a');
      if (parentLink) {
        parentLink.addEventListener('click', function(e) {
          if (window.innerWidth < 768) {
            e.preventDefault();
            item.classList.toggle('is-dropdown-open');
          }
        });
      }
    });

    /* ── Close dropdowns on outside click ── */
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.site-header__nav')) {
        parentItems.forEach(function(item) {
          item.classList.remove('is-dropdown-open');
        });
      }
    });

    /* ── Close mobile menu on resize to desktop ── */
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768 && header && header.classList.contains('is-open')) {
        header.classList.remove('is-open');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
          toggle.querySelector('i').className = 'ti ti-menu-2';
        }
      }
    });

  });
})();
