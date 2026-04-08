/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-hero. Base: carousel.
 * Source: https://www.albertsons.com/
 * Selectors from captured DOM: .hero-carousel-container .slick-slide:not(.slick-cloned)
 *
 * Block library structure (carousel):
 * | carousel-hero |                     |
 * | image         | heading + desc + CTA |
 * Each row = one slide with image in col1, text content in col2.
 */
export default function parse(element, { document }) {
  // Find non-cloned carousel slides, fallback to all slides
  let slides = Array.from(element.querySelectorAll('.slick-slide:not(.slick-cloned)'));
  if (slides.length === 0) {
    slides = Array.from(element.querySelectorAll('.slick-slide'));
  }
  if (slides.length === 0) {
    slides = Array.from(element.querySelectorAll('[class*="hero-canvas"]'));
  }

  const seen = new Set();
  const cells = [];

  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    if (!img) return;

    // Deduplicate by image src (cloned slides in slick carousel)
    const src = img.getAttribute('src') || '';
    if (seen.has(src)) return;
    seen.add(src);

    // Build text content cell
    const contentCell = [];

    // Get heading
    const heading = slide.querySelector('h2, h3, [class*="text-plate__title"]');
    if (heading) {
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent.trim();
      contentCell.push(h2);
    }

    // Get description
    const desc = slide.querySelector('[class*="text-plate__description"], [class*="body-text"]');
    if (desc && desc.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      contentCell.push(p);
    }

    // Get CTA link
    const cta = slide.querySelector('a[class*="text-plate__cta"], a.btn');
    if (cta) {
      const link = document.createElement('a');
      link.href = cta.href || '';
      link.textContent = cta.textContent.trim();
      contentCell.push(link);
    }

    if (contentCell.length > 0) {
      cells.push([img, contentCell]);
    } else {
      cells.push([img]);
    }
  });

  if (cells.length === 0) return;

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-hero', cells });
  element.replaceWith(block);
}
