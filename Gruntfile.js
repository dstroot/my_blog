/* jshint node: true */

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/**\n' +
            '* <%= pkg.name %>.js v<%= pkg.version %>\n' +
            '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            '* <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
            '*/\n',
    jqueryCheck: 'if (!jQuery) { throw new Error(\"<%= pkg.name %> requires jQuery\") }\n\n',


    // -----------------------------------
    //
    // TASK: clean  [Remove old files]
    //
    // -----------------------------------
    clean: {
      css: [
        'assets/css/<%= pkg.name %>.css',
        'assets/css/<%= pkg.name %>.min.css',
        'assets/css/<%= pkg.name %>.css.map'
      ],
      js: [
        'assets/js/<%= pkg.name %>.js',
        'assets/js/<%= pkg.name %>.min.js'
      ]
    },


    // -----------------------------------
    //
    // TASK: jshint  [Validate .js]
    //
    // -----------------------------------
    jshint: {
      // define the files to lint
      files: ['gruntfile.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // override JSHint defaults
        jshintrc: '.jshintrc',
        // A directive for telling JSHint about global variables that are defined elsewhere.
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },


    // -----------------------------------
    //
    // TASK: jscs      [.js style checker]
    //
    // -----------------------------------
    jscs: {
      options: {
        config: '.jscs.json',
      },
      gruntfile: {
        src: ['Gruntfile.js']
      }
    },


    // -----------------------------------
    // Notes:
    //
    // We have several options regarding how we process CSS
    // Ideally, our end goal is one, minified, CSS file.
    // If we have only LESS source code then we are in good shape
    // because we can just use Recess to compile and minify the CSS.
    // However we may also have some CSS snippets that we don't need/
    // want to convert to less (such as the syntax.css file).
    // Therefore we have more steps but more flexibility:
    //
    // 1. Compile LESS to a CSS file [recess]
    // 2. Concatenate all CSS files together [concat]
    // 3. Minify the CSS
    //
    // -----------------------------------



    // -----------------------------------
    //
    // TASK: concat  [Concatenate .js and .css]
    //
    // -----------------------------------
    concat: {
      options: {        // Task-level options may go here, overriding task defaults.
        banner: '<%= banner %><%= jqueryCheck %>',
        stripBanners: false
      },
      js: {
        options: {      // "js" target options may go here, overriding task-level options.
          banner: '<%= banner %><%= jqueryCheck %>',
          stripBanners: false
        },
        src: [

          // Bootstrap
          'assets/js/vendor/bootstrap/js/transition.js',
          //'assets/js/vendor/bootstrap/js/alert.js',
          'assets/js/vendor/bootstrap/js/button.js',
          //'assets/js/vendor/bootstrap/js/carousel.js',
          //'assets/js/vendor/bootstrap/js/collapse.js',
          //'assets/js/vendor/bootstrap/js/dropdown.js',
          //'assets/js/vendor/bootstrap/js/modal.js',
          //'assets/js/vendor/bootstrap/js/tooltip.js',
          //'assets/js/vendor/bootstrap/js/popover.js',
          //'assets/js/vendor/bootstrap/js/scrollspy.js',
          //'assets/js/vendor/bootstrap/js/tab.js',
          'assets/js/vendor/bootstrap/js/affix.js',

          // Unveil http://luis-almeida.github.io/unveil/
          'assets/js/vendor/unveil/jquery.unveil.js',

          // To Top
          'assets/js/vendor/totop.js/totop.js'

        ],
        dest: 'assets/js/<%= pkg.name %>.js'
      },
      css: {
        options: {     // "css" target options may go here, overriding task-level options.
          banner: '/*! <%= pkg.name %>.css v<%= pkg.version %> */\n',
          stripBanners: true
        },
        src: [
          'assets/css/<%= pkg.name %>.css',      // Main CSS file built from main.less
          'assets/css/pygments-manni.css'        // Code syntax highlighting
          //'assets/css/syntax.css'                // Code syntax highlighting
        ],
        dest: 'assets/css/<%= pkg.name %>.css'
      }
    },


    // -----------------------------------
    //
    // TASK: uglify           [Minify .js]
    // https://github.com/gruntjs/grunt-contrib-uglify
    // -----------------------------------
    uglify: {
      options: {
        banner: '<%= banner %>',
        mangle: false,
        report: 'min'
      },
      js: {
        files: {
          'assets/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },


    // -----------------------------------
    //
    // TASK: cssmin          [Minify .css]
    //
    // -----------------------------------
    cssmin: {
      css: {
        src: 'assets/css/<%= pkg.name %>.css',
        dest: 'assets/css/<%= pkg.name %>.min.css'
      }
    },


    // -----------------------------------
    //
    // TASK: less [Compile/minify LESS/CSS]
    //
    // -----------------------------------
    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'assets/css/<%= pkg.name %>.css.map'
        },
        files: {
          'assets/css/<%= pkg.name %>.css': 'less/<%= pkg.name %>.less'
        }
      },
      minify: {
        options: {
          strictMath: true,
          cleancss: true,
          report: 'min'
        },
        files: {
          'assets/css/<%= pkg.name %>.min.css': 'less/<%= pkg.name %>.less'
        }
      }
    },


    // -----------------------------------
    //
    // TASK: jekyll       [Build the html]
    //
    // -----------------------------------
    jekyll: {
      docs: {}
    },


    // -----------------------------------
    //
    // TASK: validation[Validate the html]
    //
    // -----------------------------------

    // reset: grunt.option('reset') || false,
    // stoponerror: false,

    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        failHard: true,
        //reset: true,
        reset: grunt.option('reset') || false,
        stoponerror: false,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'Element img is missing required attribute src.'
        ]
      },
      files: {
        src: ['_site/**/*.html']
      }
    },


    // -----------------------------------
    //
    // TASK: htmlmin     [Minify the HTML]
    //
    // -----------------------------------
    htmlmin: {                          // Task
      dist: {                           // Target
        options: {                      // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand : true,
          cwd    : '_site/',            //cwd: All src matches are relative to (but don't include) this path.
          src    : '**/*.html',
          dest   : '_site/'
        }]
      }
    },


    // -----------------------------------
    //
    // TASK: imagemin    [Optimize Images]
    //
    // -----------------------------------
    imagemin: {                          // Task
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'assets/img/',            // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: '/Users/Dan/Dropbox/public/blog-images/'  // Destination path prefix
        }]
      }
    },



    // -----------------------------------
    //
    // TASK: connect       [static server]
    //
    // -----------------------------------
    // https://github.com/gruntjs/grunt-contrib-connect
    connect: {
      server: {
        options: {
          port: 3000,
          base: '_site'
        }
      }
    },


    // -----------------------------------
    //
    // TASK: watch
    //
    // -----------------------------------
    watch: {
      js: {
        files: ['bootstrap/js/*.js'],   //'assets/**/*.js'
        tasks: ['dist-js'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: ['less/*.less', 'less/bootstrap/*.less'],
        tasks: ['dist-css'],
        options: {
          livereload: true,
        }
      },
      html: {
        files: ['*.html', '_includes/*.html', '_layouts/*.html', '_posts/*.md'],
        tasks: ['jekyll'],
        options: {
          livereload: true,
        }
      }
    },


    // -----------------------------------
    //
    // TASK: bower
    //
    // -----------------------------------
    bower: {
      install: {
        options: {
          copy: false
        }
      }
    },


    // -----------------------------------
    //
    // TASK: exec           [Upload to S3]
    // `exec` runs commands
    // -----------------------------------
    exec: {
      echo_grunt_version: {
        cmd: function() { return 'echo ' + this.version; }
      },
      s3: {
        //cmd: function() { return 's3_website push --headless'; }
        cmd: 's3_website push --headless',
        stdout: true,
        stderr: true
      }
    }


  });

 /**
  *  This section is where we require the necessary plugins.
  *  Let's just tell Grunt to read our package.json devDependencies:
  */


  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});


 /**
  *  Grunt task configuration
  */


  // Setup for development with Watch, supporting Live Reload
  grunt.registerTask('develop', ['jekyll', 'connect', 'watch']);

  // HTML validation task
  grunt.registerTask('validate-docs', ['jekyll', 'validation']);

  // Validate the .js and HTML5
  grunt.registerTask('test', ['jscs', 'jshint', 'validate-docs']);

  // Image preparation task
  grunt.registerTask('prep-images', ['imagemin']);

  // JS preparation task.
  grunt.registerTask('prep-js', ['clean:js', 'concat:js', 'uglify']);

  // CSS preparation task.
  grunt.registerTask('prep-css', ['clean:css', 'less:compileCore', 'concat:css', 'cssmin']);

  // HTML preparation task.
  grunt.registerTask('prep-html', ['jekyll', 'htmlmin']);

  // Full distribution task.
  grunt.registerTask('dist', ['prep-css', 'prep-js', 'prep-images', 'prep-html']);

  // Default task.
  grunt.registerTask('default', ['test', 'dist']);

  // Full Monte
  grunt.registerTask('full', ['test', 'dist', 'exec']);

};
