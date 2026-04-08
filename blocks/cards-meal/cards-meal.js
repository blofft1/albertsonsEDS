/**
 * Cards Meal Block
 * Displays a horizontal scrolling grid of meal/recipe cards.
 *
 * Content structure (authored):
 *   Row 1+: each row is a meal with two cells:
 *     Cell 1: meal image
 *     Cell 2: meal name (heading or paragraph), optional link
 */
export default function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'cards-meal-grid';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const imageCell = cells[0];
    const infoCell = cells[1];

    const link = infoCell.querySelector('a');
    const card = document.createElement(link ? 'a' : 'div');
    card.className = 'meal-card';
    if (link) {
      card.href = link.href;
    }

    const img = imageCell.querySelector('img');
    if (img) {
      img.className = 'meal-card-image';
      img.loading = 'lazy';
      card.append(img);
    }

    const info = document.createElement('div');
    info.className = 'meal-card-info';

    const heading = infoCell.querySelector('h3, h4');
    const name = document.createElement('p');
    name.className = 'meal-card-name';
    name.textContent = heading ? heading.textContent : infoCell.textContent.trim();
    info.append(name);

    const arrow = document.createElement('span');
    arrow.className = 'meal-card-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';
    info.append(arrow);

    card.append(info);
    grid.append(card);
  });

  block.textContent = '';
  block.append(grid);
}
