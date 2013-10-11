## About this Blog [![devDependency Status](https://david-dm.org/dstroot/my_blog/dev-status.png)](https://david-dm.org/dstroot/my_blog#info=devDependencies)

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

The most important aspects are:

1. It is based on the static site generation tool [Jekyll](http://jekyllrb.com/).

  > My preference would be a nodejs equivalent tool since you have
  > to install Ruby/Ruby Gems to use Jekyll but _sigh_ oh well...

2. It uses the [Bootstrap](http://getbootstrap.com/) front-end framework for layout and design.
 * You can copy the latest Bootstrap .js and .less source into `bootstrap/js` and `bootstrap/less`.  Grunt will compile everything for you (see below)
 * Tweaks to the Boostrap source
3. It uses [Grunt](http://gruntjs.com/) to manage the assets.  I went to the trouble of doing this so I could select exactly what parts of Bootstrap I wanted to use.  An easier and more direct route might be to use the [Bootstrap customizer](http://getbootstrap.com/customize/).

## Technical Dependencies

* You need Nodejs installed mainly because we need to use NPM to install things.
* You need Ruby and RubyGems so you can install Jekyll
* You need Python and Pygments for code highlighting
* You need Grunt installed



## Steps to build and deploy
1. Run `npm install`
2. Copy the latest Bootstrap .js and .less source into `bootstrap/js` and `bootstrap/less`.
3. Tweaks to Bootstrap
  * Change variables.less:
    * @font-family-sans-serif:  "Proxima Nova", Helvetica, Arial, sans-serif;  // was Helvetica Neue
    * @font-size-base:          18px;  // was 14px
  * Turn off stuff in bootstrap.less:

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
@import "component-animations.less";
//@import "glyphicons.less";
//@import "dropdowns.less";
//@import "button-groups.less";
//@import "input-groups.less";
//@import "navs.less";
//@import "navbar.less";
//@import "breadcrumbs.less";
//@import "pagination.less";
//@import "pager.less";
@import "labels.less";
@import "badges.less";
//@import "jumbotron.less";
@import "thumbnails.less";
@import "alerts.less";
//@import "progress-bars.less";
@import "media.less";
//@import "list-group.less";
//@import "panels.less";
//@import "wells.less";
@import "close.less";

// Components w/ JavaScript
@import "modals.less";
@import "tooltip.less";
@import "popovers.less";
//@import "carousel.less";

// Utility classes
@import "utilities.less";
@import "responsive-utilities.less";
```

2. Run `grunt`.  This does a lot of work:
   * Processes the .js
       * Runs [jshint](http://www.jshint.com/) on the .js source files
       * Concatenates the .js source files
       * Minifies the resulting concatenated file using Uglifyjs.
    * Processes the [LESS](http://lesscss.org/) files to CSS
       * Minifies the resulting CSS file.


## Steps to install
1. Ruby is a dependency
2. Gem install jekyll
3. Gem install s3_website



1. **Octopress sports a clean responsive theme** written in semantic HTML5, focused on readability and friendliness toward mobile devices.
2. **Code blogging is easy and beautiful.** Embed code (with [Solarized](http://ethanschoonover.com/solarized) styling) in your posts from gists, jsFiddle or from your filesystem.
3. **Third party integration is simple** with built-in support for Pinboard, Delicious, GitHub Repositories, Disqus Comments and Google Analytics.
4. **It's easy to use.** A collection of rake tasks simplifies development and makes deploying a cinch.
5. **Ships with great plug-ins** some original and others from the Jekyll community &mdash; tested and improved.


## Documentation

Check out [Octopress.org](http://octopress.org/docs) for guides and documentation.


## Contributing

[![Build Status](https://travis-ci.org/imathis/octopress.png?branch=master)](https://travis-ci.org/imathis/octopress)

We love to see people contributing to Octopress, whether it's a bug report, feature suggestion or a pull request. At the moment, we try to keep the core slick and lean, focusing on basic blogging needs, so some of your suggestions might not find their way into Octopress. For those ideas, we started a [list of 3rd party plug-ins](https://github.com/imathis/octopress/wiki/3rd-party-plugins), where you can link your own Octopress plug-in repositories. For the future, we're thinking about ways to easier add them them into our main releases.


## License
(The MIT License)

Copyright © 2009-2013 Brandon Mathis

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the ‘Software’), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED ‘AS IS’, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
