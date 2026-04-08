/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Albertsons sections. Adds section breaks from template sections.
 * Selectors from captured DOM of https://www.albertsons.com/
 */
const H = { after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.after) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const document = element.ownerDocument || element.getRootNode();

    // Process sections in reverse order to avoid DOM position shifts
    const sections = [...template.sections].reverse();

    sections.forEach((section) => {
      // Skip footer section - not part of authored content
      if (section.id === 'section-12') return;

      let sectionEl = null;
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];

      for (const sel of selectors) {
        try {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        } catch (e) {
          // Invalid selector, skip
        }
      }

      if (!sectionEl) return;

      // Add section-metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Add section break before the section element (not for the first section)
      if (section.id !== 'section-1') {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    });
  }
}
