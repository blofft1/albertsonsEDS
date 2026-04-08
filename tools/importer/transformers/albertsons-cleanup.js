/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Albertsons cleanup. Selectors from captured DOM of https://www.albertsons.com/
 * Removes non-authorable content: header, footer, navigation, modals, product carousels,
 * ad managers, sidebars, and commerce widgets.
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove unsupported browser banner (found: div#unsupportedBrowser)
    // Remove apps flyer wrapper (found: div#apps-flyer-wrapper)
    // Remove priority web banner / FreshPass promo (found: webgen-priority-web-banner-component)
    // Remove screen reader only elements (found: .sr-only)
    // Remove modals and drawers (found: .modal, .sidebar_drawer, right-drawer)
    // Remove sign-in dropdown (found: #signin-dropdown)
    // Remove tooltips (found: .tooltip-container, #toolTipModal, #smalltoolTipModal)
    // Remove toast messages (found: #toastMessage)
    // Remove past order modal (found: #past-order-modal)
    // Remove fulfillment sidebar (found: #fulfillmentSidebar)
    WebImporter.DOMUtils.remove(element, [
      '#unsupportedBrowser',
      '#apps-flyer-wrapper',
      'webgen-priority-web-banner-component',
      '.sr-only',
      '.sr-only-focusable',
      '#signin-dropdown',
      '#toolTipModal',
      '#smalltoolTipModal',
      '#toastMessage',
      '#past-order-modal',
      '#fulfillmentSidebar',
      '.sidebar_drawer',
      '.sidebar-right-drawer',
      '.myaccount-flyout-wrapper',
      '.categories-flyout-backdrop',
      '.myAccount-flyout-backdrop',
      'right-drawer',
      'right-drawer-al-v1',
      'wcax-tooltip-dst',
      'tooltip',
    ]);
  }

  if (hookName === H.after) {
    // Remove global header/nav (found: .global-header-proxy, global-header)
    // Remove footer (found: .footer-sub-conatainer)
    // Remove tertiary nav bar (found: .tertiary-bar-proxy)
    WebImporter.DOMUtils.remove(element, [
      '.global-header-proxy',
      'global-header',
      '.footer-sub-conatainer',
      '.tertiary-bar-proxy',
    ]);

    // Remove ALL product carousels - dynamic commerce content not authorable
    // (found: .slick-product-carousel, product-carousel-wrapper, product-carousel-al-v1)
    WebImporter.DOMUtils.remove(element, [
      '.slick-product-carousel',
      'product-carousel-wrapper',
      'product-carousel-al-v1',
      'product-carousel-al-v2',
      'product-carousel-item-al-v2',
      'quantity-stepper-al-v2',
      'targeted-wrapper',
    ]);

    // Remove ad manager / GAM elements (found: webgen-ad-manager, .gam-ad-container)
    WebImporter.DOMUtils.remove(element, [
      'webgen-ad-manager',
      '.gam-ad-container',
      '.google-adManager',
      'ad-manager',
      '.ab-lazy-function',
    ]);

    // Remove only truly empty webgen shell elements (no children)
    // Do NOT remove webgen-container-unit or webgen-hero-canvas-card as they wrap block content
    element.querySelectorAll('webgen-hero-canvas-carousel, webgen-flex-module, webgen-banner-unit').forEach((el) => {
      if (el.children.length === 0 || el.innerHTML.trim() === '') {
        el.remove();
      }
    });

    // Remove landing page / sign-in prompts (found: .landing-pg)
    WebImporter.DOMUtils.remove(element, [
      '.landing-pg',
      '.sign-in-background',
    ]);

    // Remove iframes, links, noscript, meta, source tags
    WebImporter.DOMUtils.remove(element, [
      'iframe',
      'link',
      'noscript',
      'source',
      'meta',
      'svg',
      'clippath',
    ]);

    // Remove hidden/display-none elements
    element.querySelectorAll('.d-none, [style*="display: none"], [style*="display:none"]').forEach((el) => {
      el.remove();
    });

    // Remove empty divs with no meaningful content
    element.querySelectorAll('div').forEach((div) => {
      if (div.children.length === 0 && div.textContent.trim() === '') {
        div.remove();
      }
    });

    // Clean tracking attributes
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-track');
      el.removeAttribute('onclick');
      el.removeAttribute('data-testid');
      el.removeAttribute('data-slide-index');
      el.removeAttribute('aria-hidden');
    });
  }
}
