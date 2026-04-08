/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-category. Base: cards.
 * Source: https://www.albertsons.com/
 * Selectors from captured DOM: .flex-container.flex-three-six-column .flex-card
 *
 * Block library structure (cards):
 * | cards-category |           |
 * | image          | title     |
 * Each row = one category card with image in col1, title in col2.
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.flex-card');
  const cells = [];

  cards.forEach((card) => {
    const img = card.querySelector('img');
    if (!img) return;

    const contentCell = [];

    // Get category title
    const title = card.querySelector('.flex-card__title, [class*="card__title"]');
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      contentCell.push(h3);
    }

    // Get link
    const link = card.querySelector('a.flex-card__link, a[href]');
    if (link && link.href) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = title ? title.textContent.trim() : 'View';
      contentCell.push(a);
    }

    if (contentCell.length > 0) {
      cells.push([img, contentCell]);
    }
  });

  if (cells.length === 0) return;

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-category', cells });
  element.replaceWith(block);
}
