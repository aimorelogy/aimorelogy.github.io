(function () {
  const defaults = {
    siteName: 'AIMORELOGY - Open Source Incubator',
    siteUrl: 'https://aimorelogy.com',
    description: 'Leading open source project incubator transforming open source innovations into market success while respecting creators.',
    image: '/static/logo-1.png',
    themeColor: '#0a0a0f',
    twitterCard: 'summary_large_image'
  };

  const page = window.PAGE_SEO || {};
  const title = page.title || defaults.siteName;
  const description = page.description || defaults.description;
  const image = page.image || defaults.image;
  const url = page.url || (defaults.siteUrl + location.pathname);

  document.title = title;

  function applyMeta(attr, name, content) {
    if (!content) return;
    let selector = `[${attr}="${name}"]`;
    let tag = document.head.querySelector(selector);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attr, name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  }

  applyMeta('name', 'description', description);
  applyMeta('name', 'theme-color', defaults.themeColor);
  applyMeta('property', 'og:title', title);
  applyMeta('property', 'og:description', description);
  applyMeta('property', 'og:type', 'website');
  applyMeta('property', 'og:url', url);
  applyMeta('property', 'og:image', image);
  applyMeta('name', 'twitter:card', defaults.twitterCard);
  applyMeta('name', 'twitter:title', title);
  applyMeta('name', 'twitter:description', description);
  applyMeta('name', 'twitter:image', image);
})(); 