// This is a browserify test to see if I could use Browserify to create one monolithic .js file
//
// // require modules you need
var jquery    = require('./assets/js/vendor/jquery/jquery.js');
var fitvids   = require('./assets/js/vendor/fitvids/jquery.fitvids.js');
var totop     = require('./assets/js/vendor/totop.js/totop.js');
var unveil    = require('./assets/js/vendor/unveil/jquery.unveil.js');
var affix     = require('./assets/js/vendor/bootstrap/js/transition.js');
var affix     = require('./assets/js/vendor/bootstrap/js/button.js');
var affix     = require('./assets/js/vendor/bootstrap/js/affix.js');

// Start the affix behavior
$('#sidebar').affix({
  offset: {
    // top: determines how far to scroll before applying .affixed class
    top: function () {
      var offsetTop      = $('#sidebar').offset().top                              // How far are we from top in total?
      var bodyPaddingTop = parseInt($(document.body).css("padding-top"), 10) || 0  // Account for body padding
      return (this.top = offsetTop - bodyPaddingTop - 1)    // removing one pixel to turn on affix immediately
    }
  , bottom: function () {
      var footerOuterHeight = $('footer').outerHeight(true) || 0                   // Account for footer
      return (this.bottom = footerOuterHeight)
    }
  }
});

// Fire up image lazyloading
$("img.lazy").unveil(500, function() {
  $(this).load(function() {
    this.style.opacity = 1;
  });
});

// fire up top navigation
$().totop();

// Fit Videos
$(".posts").fitVids();
