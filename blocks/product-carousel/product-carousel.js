/**
 * Product Carousel Block
 * Displays a horizontal scrolling grid of product cards.
 *
 * Content structure (authored):
 *   Row 1+: each row is a product with two cells:
 *     Cell 1: product image
 *     Cell 2: price (paragraph), product name (paragraph), optional link
 */
export default function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'product-carousel-grid';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const imageCell = cells[0];
    const infoCell = cells[1];

    const card = document.createElement('div');
    card.className = 'product-card';

    // Image
    const img = imageCell.querySelector('img');
    if (img) {
      img.className = 'product-card-image';
      img.loading = 'lazy';
      card.append(img);
    }

    // Extract price and name from info cell paragraphs
    const paragraphs = [...infoCell.querySelectorAll('p')];
    if (paragraphs.length >= 1) {
      const price = document.createElement('p');
      price.className = 'product-card-price';
      price.textContent = paragraphs[0].textContent;
      card.append(price);
    }

    if (paragraphs.length >= 2) {
      const name = document.createElement('p');
      name.className = 'product-card-name';
      name.textContent = paragraphs[1].textContent;
      card.append(name);
    }

    // Wrap in link if available
    const link = infoCell.querySelector('a');
    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'product-card';
      anchor.append(...card.childNodes);
      grid.append(anchor);
    } else {
      grid.append(card);
    }
  });

  block.textContent = '';
  block.append(grid);
}
