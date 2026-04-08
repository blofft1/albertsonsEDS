/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-promo. Base: cards.
 * Source: https://www.albertsons.com/
 * Selectors from captured DOM: .hero-flex .hero-flex__card
 *
 * Block library structure (cards):
 * | cards-promo |                |
 * | image       | title + CTA    |
 * Each row = one card with image in col1, text in col2.
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.hero-flex__card, .hero-flex-full-bleed');
  const seen = new Set();
  const cells = [];

  cards.forEach((card) => {
    const img = card.querySelector('img');
    if (!img) return;

    // Deduplicate by image src
    const src = img.getAttribute('src') || '';
    if (seen.has(src)) return;
    seen.add(src);

    const contentCell = [];

    // Get title
    const title = card.querySelector('h3, h2, [class*="text-box__title"]');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      contentCell.push(h3);
    }

    // Get CTA link
    const wrapper = card.querySelector('a[class*="link-wrapper"], a[href]');
    if (wrapper && wrapper.href) {
      const ctaText = card.querySelector('[class*="cta-link"]');
      const link = document.createElement('a');
      link.href = wrapper.href;
      link.textContent = (ctaText && ctaText.textContent.trim()) || 'Shop now';
      contentCell.push(link);
    }

    if (contentCell.length > 0) {
      cells.push([img, contentCell]);
    }
  });

  if (cells.length === 0) return;

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-promo', cells });
  element.replaceWith(block);
}
