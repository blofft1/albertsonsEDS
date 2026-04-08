/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Albertsons cleanup. Selectors from captured DOM of https://www.albertsons.com/
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove unsupported browser banner (found: div#unsupportedBrowser)
    // Remove apps flyer wrapper (found: div#apps-flyer-wrapper)
    // Remove priority web banner component (found: webgen-priority-web-banner-component)
    WebImporter.DOMUtils.remove(element, [
      '#unsupportedBrowser',
      '#apps-flyer-wrapper',
      'webgen-priority-web-banner-component',
      '.sr-only',
      '.sr-only-focusable',
    ]);
  }
  if (hookName === H.after) {
    // Remove global header/nav (found: .global-header-proxy)
    // Remove footer (found: .footer-sub-conatainer)
    // Remove ad manager elements (found: webgen-ad-manager)
    // Remove tertiary nav bar (found: .tertiary-bar-proxy)
    // Remove iframes, links, noscript
    WebImporter.DOMUtils.remove(element, [
      '.global-header-proxy',
      '.footer-sub-conatainer',
      'webgen-ad-manager',
      '.tertiary-bar-proxy',
      'iframe',
      'link',
      'noscript',
      'source',
    ]);
    // Clean tracking attributes
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-track');
      el.removeAttribute('onclick');
      el.removeAttribute('data-testid');
    });
  }
}
