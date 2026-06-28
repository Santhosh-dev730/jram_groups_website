const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace about us columns
html = html.replace(/<div class="col-lg-6 mb-0 mb-lg-0">/g, '<div class="col-xl-6 col-lg-12 mb-4 mb-xl-0">');
html = html.replace(/<div class="col-lg-6 d-flex flex-column">/g, '<div class="col-xl-6 col-lg-12 d-flex flex-column">');

// Replace service content and visual columns
html = html.replace(/col-lg-6 col-md-12 pe-lg-5 mb-5 mb-lg-0 service-content/g, 'col-xl-6 col-lg-12 pe-xl-5 mb-5 mb-xl-0 service-content');
html = html.replace(/col-lg-6 col-md-12 ps-lg-5 mb-5 mb-lg-0 service-content/g, 'col-xl-6 col-lg-12 ps-xl-5 mb-5 mb-xl-0 service-content');
html = html.replace(/col-lg-6 col-md-12 service-visual/g, 'col-xl-6 col-lg-12 service-visual');

// Replace order classes if any (e-commerce has order-lg-1 etc)
// Actually ecommerce slide has:
// <div class="col-lg-6 col-md-12 service-visual order-first order-lg-last">
// <div class="col-lg-6 col-md-12 ps-lg-5 mb-5 mb-lg-0 service-content">
html = html.replace(/order-lg-last/g, 'order-xl-last');

fs.writeFileSync('index.html', html);
console.log("Done");
