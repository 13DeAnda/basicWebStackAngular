module.exports = function(grunt) {
  grunt.initConfig({
    protractor_coverage: {
      options: {
        keepAlive: true,
        noColor: false,
        collectorPort: 3001,
        coverageDir: 'test/',
        args: {
            baseUrl: 'http://localhost:8000'
        }
      },
      local: {
          options: {
              configFile: 'testing.js'
          }
      },
    },
    makeReport: {
        src: 'test/*.js',
        options: {
            type: 'lcov',
            dir: 'test/',
            print: 'detail'
        }
    },
    jshint: {
      files: ['Gruntfile.js', 'app/components/**/*.js', 'app.js']
    },

    watch: {
      files: ['<%= jshint.files %>', 'app/components/**/*', 'app/style/app.scss', 'app/index.html'],
      tasks: ['jshint', 'clean', 'sass', 'copy', 'concat'],
      options: {
        livereload: true
      }
    },
    css: {
      files: '**/*.scss',
      tasks: ['sass']
    },
    sass: {
      dist: {
        files: {
          'app/static/css/app.css': 'app/style/app.scss'

        }
      }
    },
    clean: [
      'static/html/',
      'static/js/',
      'static/css/',
      'static/node_modules'

    ],
    concat: {
      controllers: {
        src: ['app/components/**/*_controller.js'],
        dest: 'app/static/js/controllers.js'
      },
      directives: {
        src: ['app/components/**/*_directive.js'],
        dest: 'app/static/js/directives.js'
      },
      services: {
        src: ['app/components/**/*_service.js'],
        dest: 'app/static/js/services.js'
      },
      library: {
        src: ['app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
              'app/bower_components/angular-route/angular-route.js',
              'app/bower_components/marked/lib/marked.js',
              'app/bower_components/angular-marked/dist/angular-marked.min.js'],
        dest: 'app/static/js/external.js'
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: [],
            dest: 'app/static/js/',
            filter: 'isFile'
          },
          {
            expand: true,
            flatten: true,
            src: ['app/app.js'],
            dest: 'app/static/js/',
            filter: 'isFile'
          },
          {
            expand: true,
            flatten: true,
            src: ['app/components/**/*.html'],
            dest: 'app/static/html/',
            filter: 'isFile'
          },
          {
            expand: true,
            flatten: true,
            src: ['app/bower_components/angular/angular.js',
                  'app/bower_components/ngtouch/build/ngTouch.min.js'
                  ],
            dest: 'app/static/bower_components/',
            filter: 'isFile'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-protractor-coverage');


  grunt.registerTask('default', ['jshint', 'clean', 'sass', 'copy', 'concat']);
  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('server', 'Start a web server', function() {
    grunt.log.writeln('Starting web server on port 8000');
    require('./server.js').listen(8000);
  });

};