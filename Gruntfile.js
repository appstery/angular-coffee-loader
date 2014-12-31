'use strict';
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*\n  <%= pkg.name %> <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n  Author: Marcin Wierzbicki <marcin.wierzbicki@appstery.com>\n  Licence: MIT\n*/\n'
      },
      build: {
        src: 'src/**/*.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    coffee: {
      glob2multiple: {
        expand: true,
        flatten: true,
        src: ['src/*.coffee'],
        dest: 'src',
        ext: '.js'
      },
      spec: {
        expand: true,
        flatten: true,
        src: ['spec/*.coffee'],
        dest: 'spec',
        ext: '.js'
      },
      options: {
        lint: true
      }
    },
    
    jasmine: {
      test: {
        src: 'src/*.js',
        options: {
          keepRunner: true,
          specs: 'spec/*Spec.js',
          vendor: [
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.js'
          ]
        }
      }
    },

    watch: {
      scripts: {
        files: ['**/*.coffee'],
        tasks: ['coffee'],
        options: {
          spawn: false,
        },
      },
    },

    connect: {
      server: {
        options: {
          port: 8888
        }
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'spec/**/*Spec.js'],
      options: {
        jshintrc: true
      }
    }



  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', ['coffee', 'uglify']);

  grunt.registerTask('spec', ['coffee', 'jasmine', 'connect', 'watch']);

  grunt.registerTask('test', ['coffee', 'jasmine']);

};
