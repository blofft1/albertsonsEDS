/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-banner. Base: cards.
 * Source: https://www.albertsons.com/
 * Selectors from captured DOM: .nextgen-banner-unit.nextgen-banner-unit_MediumBanner
 *
 * Block library structure (cards):
 * | cards-banner |                          |
 * | image        | title + description + CTA |
 * Each row = one banner with image in col1, text content in col2.
 */
export default function parse(element, { document }) {
  // Find all medium banner units within and including this element
  let banners = Array.from(element.querySelectorAll('.nextgen-banner-unit_MediumBanner'));
  if (banners.length === 0 && element.classList && element.classList.contains('nextgen-banner-unit_MediumBanner')) {
    banners = [element];
  }

  const cells = [];

  banners.forEach((banner) => {
    const img = banner.querySelector('img');
    if (!img) return;

    const contentCell = [];

    // Get title
    const titleEl = banner.querySelector('.banner-unit-medium__text-plate__title p, .banner-unit-medium__text-plate__title');
    if (titleEl) {
      const h3 = document.createElement('h3');
      h3.textContent = titleEl.textContent.trim();
      contentCell.push(h3);
    }

    // Get description
    const descEl = banner.querySelector('.banner-unit-medium__text-plate__description p, .banner-unit-medium__text-plate__description');
    if (descEl && descEl.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = descEl.textContent.trim();
      contentCell.push(p);
    }

    // Get CTA link
    const ctaEl = banner.querySelector('a.banner-unit-medium__text-plate__cta, a[class*="text-plate__cta"]');
    if (ctaEl) {
      const link = document.createElement('a');
      link.href = ctaEl.href || '';
      const ctaText = ctaEl.querySelector('span:first-child');
      link.textContent = (ctaText && ctaText.textContent.trim()) || ctaEl.textContent.trim();
      contentCell.push(link);
    }

    if (contentCell.length > 0) {
      cells.push([img, contentCell]);
    }
  });

  if (cells.length === 0) return;

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-banner', cells });
  element.replaceWith(block);
}
