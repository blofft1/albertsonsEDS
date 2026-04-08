/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import carouselHeroParser from './parsers/carousel-hero.js';
import cardsPromoParser from './parsers/cards-promo.js';
import cardsCategoryParser from './parsers/cards-category.js';
import cardsBannerParser from './parsers/cards-banner.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/albertsons-cleanup.js';
import sectionsTransformer from './transformers/albertsons-sections.js';

// PARSER REGISTRY
const parsers = {
  'carousel-hero': carouselHeroParser,
  'cards-promo': cardsPromoParser,
  'cards-category': cardsCategoryParser,
  'cards-banner': cardsBannerParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Albertsons grocery store homepage with promotions, featured products, and store services',
  urls: [
    'https://www.albertsons.com/',
  ],
  blocks: [
    {
      name: 'carousel-hero',
      instances: ['.hero-carousel-container'],
    },
    {
      name: 'cards-promo',
      instances: ['.row.hero-flex'],
    },
    {
      name: 'cards-category',
      instances: ['.flex-container.flex-three-six-column'],
    },
    {
      name: 'cards-banner',
      instances: ['.nextgen-banner-unit.nextgen-banner-unit_MediumBanner'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Carousel',
      selector: '.container-unit.hero-canvas-flex',
      style: null,
      blocks: ['carousel-hero'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Promotional Flex Cards',
      selector: '.row.hero-flex',
      style: null,
      blocks: ['cards-promo'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Spring Produce Product Carousel',
      selector: '.slick-product-carousel.clearfix:nth-of-type(1)',
      style: null,
      blocks: [],
      defaultContent: ['.carousel-nav__header-title'],
    },
    {
      id: 'section-4',
      name: 'Fresh and Easy Category Cards',
      selector: ['.flex-title', '.flex-container.flex-three-six-column'],
      style: null,
      blocks: ['cards-category'],
      defaultContent: ['.flex-title'],
    },
    {
      id: 'section-5',
      name: 'Meat and Seafood Product Carousel',
      selector: '.slick-product-carousel.clearfix:nth-of-type(2)',
      style: null,
      blocks: [],
      defaultContent: ['.carousel-nav__header-title'],
    },
    {
      id: 'section-6',
      name: 'Featured Items Product Carousel',
      selector: '.slick-product-carousel.clearfix:nth-of-type(3)',
      style: null,
      blocks: [],
      defaultContent: ['.carousel-nav__header-title'],
    },
    {
      id: 'section-7',
      name: 'Quick Dinners Product Carousel',
      selector: '.slick-product-carousel.clearfix:nth-of-type(4)',
      style: null,
      blocks: [],
      defaultContent: ['.carousel-nav__header-title'],
    },
    {
      id: 'section-8',
      name: 'Easy Dinners Category Cards',
      selector: ['.flex-title', '.flex-container.flex-three-six-column'],
      style: null,
      blocks: ['cards-category'],
      defaultContent: ['.flex-title'],
    },
    {
      id: 'section-9',
      name: 'Trending and New Product Carousel',
      selector: '.slick-product-carousel.clearfix:nth-of-type(5)',
      style: null,
      blocks: [],
      defaultContent: ['.carousel-nav__header-title'],
    },
    {
      id: 'section-10',
      name: 'Celebrate Passover Product Carousel',
      selector: '.slick-product-carousel.clearfix:nth-of-type(6)',
      style: null,
      blocks: [],
      defaultContent: ['.carousel-nav__header-title'],
    },
    {
      id: 'section-11',
      name: 'Promotional Banners',
      selector: '.nextgen-banner-unit.nextgen-banner-unit_MediumBanner',
      style: null,
      blocks: ['cards-banner'],
      defaultContent: [],
    },
    {
      id: 'section-12',
      name: 'Footer',
      selector: '.footer-sub-conatainer',
      style: null,
      blocks: [],
      defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null,
          });
        });
      } catch (e) {
        console.warn(`Invalid selector for block "${blockDef.name}": ${selector}`);
      }
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index',
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
