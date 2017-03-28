module.exports = grunt => {

  require('load-grunt-tasks')(grunt)

  grunt.initConfig({

    bower_concat: {
      all: {
        dest: {
          'js': './public/assets/js/libs/libs.js',
          'css': './public/assets/css/libs/libs.css'
        },
        mainFiles: {
          bootstrap: ['dist/css/bootstrap.css', 'dist/js/bootstrap.js']
        },
        include: ['requirejs','normalize-css', 'jquery', 'bootstrap', 'ngLocale', 'angular', 'angular-route'],
        dependencies: {
          'jquery': 'normalize-css',
          'bootstrap': 'jquery',
          'angular-route': 'angular'
        },
        bowerOptions: {
          relative: false
        }
      }
    },

    copy: {
      img: {
        files: [
          {
            expand: true, 
            cwd: './app/assets/img',
            src: '**', 
            dest: './public/assets/img'
          }
        ],
      },
    },

    browserify: {
      dist: {
        options: {
           transform: [
              ["babelify", {presets: ['es2015' ]}]
           ]
        },
        files: {
          "./public/assets/js/custom/compiled.js": ["./app/main.js"]
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compact'
        },
        files: {
          './public/assets/css/custom/compiled.css': './app/assets/css/main.scss'
        }
      }
    },

    clean: {
      img: {
        options: { force: true },
        src: ['./public/assets/img']
      },
      css: {
        options: { force: true },
        src: ['./public/assets/css/custom']
      },
      js: {
        options: { force: true },
        src: ['./public/assets/js/custom']
      },
      libs: {
        options: { force: true },
        src: ['./public/assets/js/libs', './public/assets/css/libs']
      }
    },

    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      img: {
        files: ['./app/assets/img/**/*'],
        tasks: ['clean:img', 'copy:img']
      },
      bower: {
        files: ['./bower_components/*'],
        tasks: ['clean:libs', 'bower_concat']
      },
      sass: {
        files: ['./app/assets/css/**/*.scss'],
        tasks: ['clean:css', 'sass']
      },
      js: {
        files: ['./app/**/*.js'],
        tasks: ['clean:js', 'browserify']
      }
    }

  })

  require('time-grunt')(grunt)

  grunt.registerTask("default", ['clean:img', 'copy:img', 'clean:libs', 'bower_concat', 'clean:css', 'sass', 'clean:js', 'browserify']);
};