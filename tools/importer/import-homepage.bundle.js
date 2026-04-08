var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/carousel-hero.js
  function parse(element, { document }) {
    let slides = Array.from(element.querySelectorAll(".slick-slide:not(.slick-cloned)"));
    if (slides.length === 0) {
      slides = Array.from(element.querySelectorAll(".slick-slide"));
    }
    if (slides.length === 0) {
      slides = Array.from(element.querySelectorAll('[class*="hero-canvas"]'));
    }
    const seen = /* @__PURE__ */ new Set();
    const cells = [];
    slides.forEach((slide) => {
      const img = slide.querySelector("img");
      if (!img) return;
      const src = img.getAttribute("src") || "";
      if (seen.has(src)) return;
      seen.add(src);
      const contentCell = [];
      const heading = slide.querySelector('h2, h3, [class*="text-plate__title"]');
      if (heading) {
        const h2 = document.createElement("h2");
        h2.textContent = heading.textContent.trim();
        contentCell.push(h2);
      }
      const desc = slide.querySelector('[class*="text-plate__description"], [class*="body-text"]');
      if (desc && desc.textContent.trim()) {
        const p = document.createElement("p");
        p.textContent = desc.textContent.trim();
        contentCell.push(p);
      }
      const cta = slide.querySelector('a[class*="text-plate__cta"], a.btn');
      if (cta) {
        const link = document.createElement("a");
        link.href = cta.href || "";
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
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-promo.js
  function parse2(element, { document }) {
    const cards = element.querySelectorAll(".hero-flex__card, .hero-flex-full-bleed");
    const seen = /* @__PURE__ */ new Set();
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector("img");
      if (!img) return;
      const src = img.getAttribute("src") || "";
      if (seen.has(src)) return;
      seen.add(src);
      const contentCell = [];
      const title = card.querySelector('h3, h2, [class*="text-box__title"]');
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        contentCell.push(h3);
      }
      const wrapper = card.querySelector('a[class*="link-wrapper"], a[href]');
      if (wrapper && wrapper.href) {
        const ctaText = card.querySelector('[class*="cta-link"]');
        const link = document.createElement("a");
        link.href = wrapper.href;
        link.textContent = ctaText && ctaText.textContent.trim() || "Shop now";
        contentCell.push(link);
      }
      if (contentCell.length > 0) {
        cells.push([img, contentCell]);
      }
    });
    if (cells.length === 0) return;
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-category.js
  function parse3(element, { document }) {
    const cards = element.querySelectorAll(".flex-card");
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector("img");
      if (!img) return;
      const contentCell = [];
      const title = card.querySelector('.flex-card__title, [class*="card__title"]');
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        contentCell.push(h3);
      }
      const link = card.querySelector("a.flex-card__link, a[href]");
      if (link && link.href) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = title ? title.textContent.trim() : "View";
        contentCell.push(a);
      }
      if (contentCell.length > 0) {
        cells.push([img, contentCell]);
      }
    });
    if (cells.length === 0) return;
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-category", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-banner.js
  function parse4(element, { document }) {
    let banners = Array.from(element.querySelectorAll(".nextgen-banner-unit_MediumBanner"));
    if (banners.length === 0 && element.classList && element.classList.contains("nextgen-banner-unit_MediumBanner")) {
      banners = [element];
    }
    const cells = [];
    banners.forEach((banner) => {
      const img = banner.querySelector("img");
      if (!img) return;
      const contentCell = [];
      const titleEl = banner.querySelector(".banner-unit-medium__text-plate__title p, .banner-unit-medium__text-plate__title");
      if (titleEl) {
        const h3 = document.createElement("h3");
        h3.textContent = titleEl.textContent.trim();
        contentCell.push(h3);
      }
      const descEl = banner.querySelector(".banner-unit-medium__text-plate__description p, .banner-unit-medium__text-plate__description");
      if (descEl && descEl.textContent.trim()) {
        const p = document.createElement("p");
        p.textContent = descEl.textContent.trim();
        contentCell.push(p);
      }
      const ctaEl = banner.querySelector('a.banner-unit-medium__text-plate__cta, a[class*="text-plate__cta"]');
      if (ctaEl) {
        const link = document.createElement("a");
        link.href = ctaEl.href || "";
        const ctaText = ctaEl.querySelector("span:first-child");
        link.textContent = ctaText && ctaText.textContent.trim() || ctaEl.textContent.trim();
        contentCell.push(link);
      }
      if (contentCell.length > 0) {
        cells.push([img, contentCell]);
      }
    });
    if (cells.length === 0) return;
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/albertsons-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#unsupportedBrowser",
        "#apps-flyer-wrapper",
        "webgen-priority-web-banner-component",
        ".sr-only",
        ".sr-only-focusable",
        "#signin-dropdown",
        "#toolTipModal",
        "#smalltoolTipModal",
        "#toastMessage",
        "#past-order-modal",
        "#fulfillmentSidebar",
        ".sidebar_drawer",
        ".sidebar-right-drawer",
        ".myaccount-flyout-wrapper",
        ".categories-flyout-backdrop",
        ".myAccount-flyout-backdrop",
        "right-drawer",
        "right-drawer-al-v1",
        "wcax-tooltip-dst",
        "tooltip"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        ".global-header-proxy",
        "global-header",
        ".footer-sub-conatainer",
        ".tertiary-bar-proxy"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".slick-product-carousel",
        "product-carousel-wrapper",
        "product-carousel-al-v1",
        "product-carousel-al-v2",
        "product-carousel-item-al-v2",
        "quantity-stepper-al-v2",
        "targeted-wrapper"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "webgen-ad-manager",
        ".gam-ad-container",
        ".google-adManager",
        "ad-manager",
        ".ab-lazy-function"
      ]);
      element.querySelectorAll("webgen-hero-canvas-carousel, webgen-flex-module, webgen-banner-unit").forEach((el) => {
        if (el.children.length === 0 || el.innerHTML.trim() === "") {
          el.remove();
        }
      });
      WebImporter.DOMUtils.remove(element, [
        ".landing-pg",
        ".sign-in-background"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "iframe",
        "link",
        "noscript",
        "source",
        "meta",
        "svg",
        "clippath"
      ]);
      element.querySelectorAll('.d-none, [style*="display: none"], [style*="display:none"]').forEach((el) => {
        el.remove();
      });
      element.querySelectorAll("div").forEach((div) => {
        if (div.children.length === 0 && div.textContent.trim() === "") {
          div.remove();
        }
      });
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-track");
        el.removeAttribute("onclick");
        el.removeAttribute("data-testid");
        el.removeAttribute("data-slide-index");
        el.removeAttribute("aria-hidden");
      });
    }
  }

  // tools/importer/transformers/albertsons-sections.js
  var H2 = { after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const document = element.ownerDocument || element.getRootNode();
      const sections = [...template.sections].reverse();
      sections.forEach((section) => {
        if (section.id === "section-12") return;
        let sectionEl = null;
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        for (const sel of selectors) {
          try {
            sectionEl = element.querySelector(sel);
            if (sectionEl) break;
          } catch (e) {
          }
        }
        if (!sectionEl) return;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (section.id !== "section-1") {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "carousel-hero": parse,
    "cards-promo": parse2,
    "cards-category": parse3,
    "cards-banner": parse4
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Albertsons grocery store homepage with promotions, featured products, and store services",
    urls: [
      "https://www.albertsons.com/"
    ],
    blocks: [
      {
        name: "carousel-hero",
        instances: [".hero-carousel-container"]
      },
      {
        name: "cards-promo",
        instances: [".row.hero-flex"]
      },
      {
        name: "cards-category",
        instances: [".flex-container.flex-three-six-column"]
      },
      {
        name: "cards-banner",
        instances: [".nextgen-banner-unit.nextgen-banner-unit_MediumBanner"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Carousel",
        selector: ".container-unit.hero-canvas-flex",
        style: null,
        blocks: ["carousel-hero"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Promotional Flex Cards",
        selector: ".row.hero-flex",
        style: null,
        blocks: ["cards-promo"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Spring Produce Product Carousel",
        selector: ".slick-product-carousel.clearfix:nth-of-type(1)",
        style: null,
        blocks: [],
        defaultContent: [".carousel-nav__header-title"]
      },
      {
        id: "section-4",
        name: "Fresh and Easy Category Cards",
        selector: [".flex-title", ".flex-container.flex-three-six-column"],
        style: null,
        blocks: ["cards-category"],
        defaultContent: [".flex-title"]
      },
      {
        id: "section-5",
        name: "Meat and Seafood Product Carousel",
        selector: ".slick-product-carousel.clearfix:nth-of-type(2)",
        style: null,
        blocks: [],
        defaultContent: [".carousel-nav__header-title"]
      },
      {
        id: "section-6",
        name: "Featured Items Product Carousel",
        selector: ".slick-product-carousel.clearfix:nth-of-type(3)",
        style: null,
        blocks: [],
        defaultContent: [".carousel-nav__header-title"]
      },
      {
        id: "section-7",
        name: "Quick Dinners Product Carousel",
        selector: ".slick-product-carousel.clearfix:nth-of-type(4)",
        style: null,
        blocks: [],
        defaultContent: [".carousel-nav__header-title"]
      },
      {
        id: "section-8",
        name: "Easy Dinners Category Cards",
        selector: [".flex-title", ".flex-container.flex-three-six-column"],
        style: null,
        blocks: ["cards-category"],
        defaultContent: [".flex-title"]
      },
      {
        id: "section-9",
        name: "Trending and New Product Carousel",
        selector: ".slick-product-carousel.clearfix:nth-of-type(5)",
        style: null,
        blocks: [],
        defaultContent: [".carousel-nav__header-title"]
      },
      {
        id: "section-10",
        name: "Celebrate Passover Product Carousel",
        selector: ".slick-product-carousel.clearfix:nth-of-type(6)",
        style: null,
        blocks: [],
        defaultContent: [".carousel-nav__header-title"]
      },
      {
        id: "section-11",
        name: "Promotional Banners",
        selector: ".nextgen-banner-unit.nextgen-banner-unit_MediumBanner",
        style: null,
        blocks: ["cards-banner"],
        defaultContent: []
      },
      {
        id: "section-12",
        name: "Footer",
        selector: ".footer-sub-conatainer",
        style: null,
        blocks: [],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
              section: blockDef.section || null
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
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      console.log(`[Import] Found ${pageBlocks.length} blocks: ${pageBlocks.map((b) => b.name).join(", ")}`);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            console.log(`[Import] Parsing ${block.name} with selector ${block.selector}`);
            parser(block.element, { document, url, params });
            console.log(`[Import] \u2705 Parsed ${block.name}`);
          } catch (e) {
            console.error(`[Import] \u274C Failed to parse ${block.name} (${block.selector}):`, e.message || e);
          }
        } else {
          console.warn(`[Import] \u26A0\uFE0F No parser for ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
