/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

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
      dist: [
         'assets/css/<%= pkg.name %>.css'
       , 'assets/css/<%= pkg.name %>.min.css'
       , 'assets/js/<%= pkg.name %>.js'
       , 'assets/js/<%= pkg.name %>.min.js'
      ]
    },

    // -----------------------------------
    //
    // TASK: jshint  [Validate .js]
    //
    // -----------------------------------

    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'bootstrap/js/*.js'],   //'assets/**/*.js'
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // override JSHint defaults
        jshintrc: 'bootstrap/js/.jshintrc',
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
    // TASK: concat  [Concatenate .js]
    //
    // -----------------------------------

    concat: {
      options: {
        banner: '<%= banner %><%= jqueryCheck %>',
        stripBanners: false
      },
      bootstrap: {
        src: [
          'bootstrap/js/transition.js',
          'bootstrap/js/alert.js',
          'bootstrap/js/button.js',
          //'bootstrap/js/carousel.js',
          //'bootstrap/js/collapse.js',
          //'bootstrap/js/dropdown.js',
          'bootstrap/js/modal.js',
          //'bootstrap/js/tooltip.js',
          //'bootstrap/js/popover.js',
          //'bootstrap/js/scrollspy.js',
          //'bootstrap/js/tab.js',
          'bootstrap/js/affix.js'
          //'assets/js/application.js'
        ],
        dest: 'assets/js/<%= pkg.name %>.js'
      }
    },

    // -----------------------------------
    //
    // TASK: uglify  [Minify .js]
    //
    // -----------------------------------

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      bootstrap: {
        src: ['<%= concat.bootstrap.dest %>'],
        dest: 'assets/js/<%= pkg.name %>.min.js'
      }
    },

    // -----------------------------------
    //
    // TASK: recess  [Compile/minify LESS/CSS]
    //
    // -----------------------------------

    recess: {
      options: {
        compile: true
      },
      bootstrap: {
        src: ['bootstrap/less/bootstrap.less'],
        dest: 'assets/css/<%= pkg.name %>.css'
      },
      min: {
        options: {
          compress: true
        },
        src: ['bootstrap/less/bootstrap.less'],
        dest: 'assets/css/<%= pkg.name %>.min.css'
      }
    },

    // -----------------------------------
    //
    // TASK: jekyll  [Build the html]
    //
    // -----------------------------------

    jekyll: {
      docs: {}
    },

    // -----------------------------------
    //
    // TASK: validation  [Validate the html]
    //
    // -----------------------------------

    validation: {
      options: {
        reset: true,
      },
      files: {
        expand: true,    // expands the items below to a list
        src: ["_site/**/*.html"]
      }
    },

    // -----------------------------------
    //
    // TASK: htmlmin  [Minify the HTML]
    //
    // -----------------------------------

    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand : true,
          cwd    : '_site/',  //cwd: All src matches are relative to (but don't include) this path.
          src    : '**/*.html',
          dest   : '_site/'
        }]
      }
    },

    // -----------------------------------
    //
    // TASK: watch  [Rebuild the CSS as needed]
    //
    // -----------------------------------

    watch: {
      recess: {
        files: 'bootstrap/less/*.less',
        tasks: ['recess']
      }
    }

  });


  // These plugins provide necessary tasks.
  //---------------------------------------
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-recess');


  // Docs HTML validation task
  grunt.registerTask('validate-docs', ['jekyll', 'validation']);

  grunt.registerTask('test', ['jshint', 'validate-docs']);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['recess']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js']);
  //grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js', 'htmlmin']);

  // Default task.
  grunt.registerTask('default', ['test', 'dist']);

};
