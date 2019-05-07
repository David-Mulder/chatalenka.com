var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var permalinks = require('metalsmith-permalinks');
var assets = require('metalsmith-assets');
var multiLanguage = require('metalsmith-multi-language');
var permalinks = require('metalsmith-permalinks');
var branch = require('metalsmith-branch')
// var partial = require('metalsmith-partial');
var partial = require('metalsmith-discover-partials');
var collections = require('metalsmith-collections');
var localizeCollection = require('metalsmith-localize-collection');
var cleanCSS = require('metalsmith-clean-css');
var htmlMinifier = require("metalsmith-html-minifier");
var imageResizer = require('metalsmith-image-resizer');

const debug = process.argv.length > 2 && process.argv[2] === 'prod' ? false : true;

function plugin(opts) {
  // opts.pattern = opts.pattern || []; 
  return function (files, metalsmith, done) {
    var metadata = metalsmith.metadata();
    for (const locale of metadata.locales) {
      metadata[locale] = {};
      for (const collectionName of Object.keys(metadata.collections)) {
        metadata[locale][collectionName] = metadata.collections[collectionName].map(page => page.altFiles[locale]);
      }
    }
    setImmediate(done);
    Object.keys(files).forEach(function (file) {
      // if(multimatch(file, opts.pattern).length) {
      //   debug('myplugin working on: %s', file);

      //   //
      //   // here would be your code
      //   //

      // }
    });
  };
}
// setTimeout(() => {}, 100000);

let a = Metalsmith(__dirname)
  .metadata({
    title: "My Static Site & Blog",
    description: "It's about saying »Hello« to the World.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(collections())
  .use(partial({
    directory: './layouts/partials',
    pattern: /\.html$/
  }))
  // .use()
  .use(markdown())
  .use(multiLanguage({ default: 'en', locales: ['sk', 'en'] }))
  .use(permalinks())
  .use(assets({
    source: './assets',
    destination: './'
  }))
  .use(assets({
    source: './admin',
    destination: './admin'
  }))
  // .use(branch('posts/*').use(
  //   permalinks({
  //     pattern: ':locale/:title'
  //   })
  // ))
  .use(plugin({}))
  .use(layouts({
    engine: 'handlebars'
  }))
  .use(imageResizer({
    glob: "img/**/*.jpg",
    includeSize: true,
    fake: debug ? true : false,
    sizes: [{
      height: 820
    }, {
      height: 410
    }, {
      height: 1640
    }, {
      width: 2560
    }]
  }));

// if (!debug) {
//   a = a
//     .use(cleanCSS({
//       files: '**/*.css',
//       cleanCSS: {
//         rebase: true
//       }
//     }))
//     .use(htmlMinifier({
//       pattern: "**/*.html"
//     }))
// }

a.build(function (err, files) {
  if (err) { throw err; }
  console.log('finished');
});
