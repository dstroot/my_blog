'use strict';

// Install: you must install gulp both globally *and* locally.
// Make sure you `$ npm install -g gulp`

/**
 * Dependencies
 */

var gulp  = require('gulp');
var $     = require('gulp-load-plugins')({ lazy: true });
var del           = require('del');
var runSequence   = require('run-sequence');
var pngcrush      = require('imagemin-pngcrush');
var terminus      = require('terminus');
var pagespeed     = require('psi');
var exec          = require('child_process').exec;
var critical      = require('critical');

/**
 * Banner
 */

var pkg = require('./package.json');
var banner = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n');

/**
 * Paths
 */

var paths = {
  clean: [
    'assets/js/myblog*.js',
    'assets/css/myblog*.css',
    'assets/css/myblog*.map',
    '_site'
  ],
  js: [
    // Bootstrap
    'assets/lib/bootstrap/js/transition.js',
    // 'assets/lib/bootstrap/js/alert.js',
    'assets/lib/bootstrap/js/button.js',
    // 'assets/lib/bootstrap/js/carousel.js',
    // 'assets/lib/bootstrap/js/collapse.js',
    // 'assets/lib/bootstrap/js/dropdown.js',
    // 'assets/lib/bootstrap/js/modal.js',
    // 'assets/lib/bootstrap/js/tooltip.js',
    // 'assets/lib/bootstrap/js/popover.js',
    // 'assets/lib/bootstrap/js/scrollspy.js',
    // 'assets/lib/bootstrap/js/tab.js',
    'assets/lib/bootstrap/js/affix.js',

    // Unveil http://luis-almeida.github.io/unveil/
    'assets/lib/unveil/jquery.unveil.js',

    // To Top
    'assets/lib/totop.js/totop.js'
  ],
  lint: [
    'assets/js/*.js',
    'gulpfile.js'
  ],
  html: [
    '_site/**/*.html',
    '!_site/assets/lib/**/*.html'   // ignore
  ],
  css: [
    'assets/css/myblog.css',               // Main CSS file built from main.less
    'assets/css/font-awesome.css',         // Font Awesome Fonts
    'assets/css/pygments-manni.css'        // Code syntax highlighting
  ],
  less: [
    'less/**/*.less'
  ]
};

/**
 * Clean
 */

gulp.task('clean', function (cb) {
  del(paths.clean, cb);
});


/**
 * Process CSS
 */

// Return the stream so that gulp knows the task is asynchronous
// and waits for it to terminate before starting dependent tasks.

gulp.task('styles', function () {
  return gulp.src('./less/myblog.less')     // Read in Less file
    .pipe($.sourcemaps.init())              // Initialize gulp-sourcemaps
    .pipe($.less({ strictMath: true }))     // Compile Less files
    .pipe($.autoprefixer([                  // Autoprefix for target browsers
      'last 2 versions',
      '> 1%',
      'Firefox ESR',
      'Opera 12.1'
    ], { cascade: true }))
    .pipe($.csscomb())                      // Coding style formatter for CSS
    .pipe($.csslint('.csslintrc'))          // Lint CSS
    .pipe($.csslint.reporter())             // Report issues
    .pipe($.rename(pkg.name + '.css'))      // Rename to "packagename.css"
    .pipe($.sourcemaps.write())             // Write sourcemap
    .pipe(gulp.dest('./assets/css'))        // Save CSS here
    .pipe($.rename({ suffix: '.min' }))     // Add .min suffix
    .pipe($.csso())                         // Minify CSS
    .pipe($.header(banner, { pkg : pkg }))  // Add banner
    .pipe($.size({ title: 'CSS:' }))        // What size are we at?
    .pipe(gulp.dest('./assets/css'))        // Save minified CSS
    .pipe($.livereload());                  // Initiate a reload
});

/**
 * Process Scripts
 */

gulp.task('scripts', function () {
  return gulp.src(paths.js)                 // Read .js files
    .pipe($.concat(pkg.name + '.js'))       // Concatenate .js files
    .pipe(gulp.dest('./assets/js'))         // Save main.js here
    .pipe($.rename({ suffix: '.min' }))     // Add .min suffix
    .pipe($.uglify({ outSourceMap: true })) // Minify the .js
    .pipe($.header(banner, { pkg : pkg }))  // Add banner
    .pipe($.size({ title: 'JS:' }))         // What size are we at?
    .pipe(gulp.dest('./assets/js'))         // Save minified .js
    .pipe($.livereload());                  // Initiate a reload
});

/**
 * Process Images
 */

gulp.task('images', function () {
  return gulp.src('assets/img/*.{png,jpg,gif}')
    .pipe($.changed('./assets/img'))        // Only process new/changed
    .pipe($.imagemin({                      // Compress images
      progressive: true,   // JPG
      interlaced: true,    // GIF
      svgoPlugins: [{ removeViewBox: false }],  // SVG
      use: [pngcrush()]    // PNG
    }))
    .on('error', console.error)
    .pipe(gulp.dest('./assets/img'));      // Write processed images
});

/**
 * JSHint Files
 */

gulp.task('lint', function () {
  return gulp.src(paths.lint)               // Read .js files
    .pipe($.jshint())                       // lint .js files
    .pipe($.jshint.reporter('jshint-stylish'));
});

/**
 * JSCS Files
 */

gulp.task('jscs', function () {
  return gulp.src(paths.lint)               // Read .js files
    .pipe($.jscs())                         // jscs .js files
    .on('error', function (e) {
      $.util.log(e.message);
      $.jscs().end();
    })
    .pipe(terminus.devnull({ objectMode: true }));
});

/**
 * Jekyll
 */

gulp.task('jekyll', function (cb) {
  exec('jekyll build', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);  // finished task
  });
});

/**
 * Validate HTML
 */

gulp.task('htmlhint', function () {
  return gulp.src(paths.html)
    .pipe($.htmlhint())
    .pipe($.htmlhint.reporter())
});


/**
 * Inline Critical CSS
 */

gulp.task('copystyles', function () {
  return gulp.src(['assets/css/myblog.css'])
    .pipe($.rename({
      basename: "site" // site.css
    }))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('critical', ['copystyles'], function () {
    critical.generateInline({
        base: '_site/',
        src: 'index.html',
        // css: ['_site/assets/css/myblog.css'],
        styleTarget: 'assets/css/main.css',
        htmlTarget: 'index.html',
        width: 1000,
        height: 1000,
        minify: true
    });
});

/**
 * Upload to S3
 */

gulp.task('s3', function (cb) {
  exec('s3_website push', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);  // finished task
  });
})


// var s3 = require('gulp-s3-upload')({
//   key:       process.env.S3_ID,
//   secret:    process.env.S3_SECRET
// });
//
//
// gulp.task('s3', function() {
//   gulp.src('./_site/**/*.*')
//   .pipe(s3({
//     bucket: 'danstroot.com', //  Required
//     acl:    'public-read'    //  Optional ACL permissions, defaults to public-read.
//   }));
// });


/**
 * HTML Minify
 */

gulp.task('htmlminify', function () {
  return gulp.src(paths.html)
    .pipe($.htmlmin({
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeCommentsFromCDATA: true,
      removeOptionalTags: true,
      removeComments: true,
      minifyJS: true
    }))
    .pipe(gulp.dest('./_site'))
});

/**
 * Build Task
 *   - Build all the things...
 */

gulp.task('build', function (cb) {
  runSequence(
    'clean',
    ['styles', 'scripts', 'images'],
    'jekyll',
    'htmlhint',
    'htmlminify',
    cb);
});

/**
 * Default Task
 */

gulp.task('default', ['build'], function () {
  gulp.watch(paths.less, ['styles']);
  gulp.watch(paths.js, ['scripts']);
  gulp.watch('assets/img/**/*', ['images']);
});

/**
 * Run PageSpeed Insights
 */

// By default, we use the PageSpeed Insights
// free (no API key) tier. You can use a Google
// Developer API key if you have one. See
// http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'

gulp.task('pagespeed', pagespeed.bind(null, {
  url: 'http://danstroot.com',  // http://danstroot.com.s3-website-us-east-1.amazonaws.com/
  strategy: 'desktop'
}));
