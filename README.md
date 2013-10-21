## About this Blog [![Build Status](https://secure.travis-ci.org/dstroot/my_blog.png)](http://travis-ci.org/dstroot/my_blog) [![devDependency Status](https://david-dm.org/dstroot/my_blog/dev-status.png)](https://david-dm.org/dstroot/my_blog#info=devDependencies)

Check out [http://danstroot.com](http://danstroot.com).

## Setting up a site or blog (high level)

There is actually quite a few things to do even for a simple site:
* Obtain a domain
  * Reserve Twitter name
  * Reserve Facebook name
  * Reserve Google+ name
  * etc.
* Move the domain DNS to AWS
* Setup hosting (I'm using AWS S3 and Cloudfront since this is a static site)
* Setup [Google Apps](http://www.google.com/enterprise/apps/business/) hosting for email
* Setup Mailchimp for newsletter signups
* Setup Disqus for site comments
* Setup Google Analytics
* Setup feedburner for rss/atom feed syndication (still need to figure out how to get feed subscribers over to mailchimp so I have one email list...)
* Setup NewRelic or Pingdom for uptime monitoring

### The most important aspects are:
1. It is based on the static site generation tool [Jekyll](http://jekyllrb.com/).

  > My preference would be a nodejs equivalent tool since you have
  > to install Ruby/Ruby Gems to use Jekyll but _sigh_ oh well...

2. It uses the [Bootstrap](http://getbootstrap.com/) front-end framework for layout and design.
 * You can copy the latest Bootstrap .js and .less source into `bootstrap/js` and `bootstrap/less`.  Grunt will compile everything for you (see below)
3. It uses [Grunt](http://gruntjs.com/) to manage the assets.  I went to the trouble of doing this so I could select exactly what parts of Bootstrap I wanted to use.  An easier and more direct route might be to use the [Bootstrap customizer](http://getbootstrap.com/customize/).

### Technical Dependencies
* You need Nodejs installed mainly because we need to use NPM to install things.
* You need Ruby and RubyGems so you can install Jekyll and S3_website
  * `Gem install jekyll`
  * `Gem install s3_website`
* You need Python and Pygments for code highlighting
* You need Grunt installed

### Steps to build and deploy
1. Run `npm install`
2. Copy the latest Bootstrap .js and .less source into `bootstrap/js` and `bootstrap/less`.
3. Tweaks to Bootstrap - Turn off stuff in bootstrap.less:
    ```
    // Core variables and mixins
    @import "variables.less";
    @import "mixins.less";

    // Reset
    @import "normalize.less";
    //@import "print.less";

    // Core CSS
    @import "scaffolding.less";
    @import "type.less";
    @import "code.less";
    @import "grid.less";
    @import "tables.less";
    @import "forms.less";
    @import "buttons.less";

    // Components
    //@import "component-animations.less";
    //@import "glyphicons.less";
    //@import "dropdowns.less";
    //@import "button-groups.less";
    //@import "input-groups.less";
    //@import "navs.less";
    //@import "navbar.less";
    //@import "breadcrumbs.less";
    //@import "pagination.less";
    //@import "pager.less";
    //@import "labels.less";
    //@import "badges.less";
    //@import "jumbotron.less";
    //@import "thumbnails.less";
    //@import "alerts.less";
    //@import "progress-bars.less";
    //@import "media.less";
    //@import "list-group.less";
    //@import "panels.less";
    //@import "wells.less";
    //@import "close.less";

    // Components w/ JavaScript
    //@import "modals.less";
    //@import "tooltip.less";
    //@import "popovers.less";
    //@import "carousel.less";

    // Utility classes
    @import "utilities.less";
    @import "responsive-utilities.less";
    ```
4. Run `grunt`.  This does a lot of work:
   * Processes the .js
       * Runs [jshint](http://www.jshint.com/) on the .js source files
       * Concatenates the .js source files
       * Minifies the resulting concatenated file using Uglifyjs.
    * Processes the [LESS](http://lesscss.org/) files to CSS
       * Minifies the resulting CSS file.

## License
(The MIT License)

Copyright © 2009-2013 Brandon Mathis

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the ‘Software’), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED ‘AS IS’, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
