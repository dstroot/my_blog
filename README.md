## About this Blog  [![devDependency Status](https://david-dm.org/dstroot/my_blog/dev-status.png?theme=shields.io)](https://david-dm.org/dstroot/my_blog#info=devDependencies)

Check out [http://danstroot.com](http://danstroot.com)

### The most important aspects are:
1. It is based on the static site generation tool [Jekyll](http://jekyllrb.com/).

  > My preference would be a nodejs equivalent tool since you have
  > to install Ruby/Ruby Gems to use Jekyll but _sigh_ oh well...

2. It uses the [Bootstrap](http://getbootstrap.com/) front-end framework for layout and design.
3. It uses [gulp](http://gulpjs.com/) to manage the assets.  I went to the trouble of doing this so I could select exactly what parts of Bootstrap I wanted to use.  An easier and more direct route might be to use the [Bootstrap customizer](http://getbootstrap.com/customize/).

### Technical Dependencies
* You need Nodejs installed mainly because we need to use NPM to install things.
* You need Ruby and RubyGems so you can install Jekyll and S3_website
  * `Gem install jekyll`
  * `Gem install s3_website`
* You need gulp installed `npm install -g gulp`

#### Build Tooling

* [Sublime Text](http://www.sublimetext.com/)
* [Nodejs](http://nodejs.org/)
* [gulpjs](http://gulpjs.com/)
* [Bower](http://bower.io/)

Bower has one minor quirk that you need to be aware of – it will install components into a “bower_components” directory by default, which unfortunately is not under the public directory. I suggest you create a directory called “lib” under “public” You can do this by running the command `mkdir public/lib` Next, in the app directory, create a plain text file called “.bowerrc” that contains:

`{ "directory" : "public/lib" }`

This configuration file will tell Bower to install tools into the “public/lib” directory.

### Steps to build and deploy
1. Run `npm install`
2. Run `bower install`
4. Run `gulp`.  This does a lot of work:
   * Processes the .js
       * Runs [jshint](http://www.jshint.com/) on the .js source files
       * Concatenates the .js source files
       * Minifies the resulting concatenated file using Uglifyjs.
    * Processes the [LESS](http://lesscss.org/) files to CSS
       * Minifies the resulting CSS file.
5. Fire it up!  Run `jekyll serve` or `jekyll serve -w`

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

## License
(The MIT License)

Copyright © 2009-2014 Daniel J. Stroot

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the ‘Software’), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED ‘AS IS’, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
