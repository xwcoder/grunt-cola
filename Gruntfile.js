/*
 * grunt-cola
 * https://github.com/xwcoder/grunt-cola
 *
 * Copyright (c) 2015 creep
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  require('time-grunt')(grunt);

  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    cola: {
      //default_options: {
      //  options: {
      //  },
      //  files: {
      //    'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123'],
      //    'tmp/default_options2': ['test/fixtures/testing', 'test/fixtures/123']
      //  }
      //},
      //custom_options: {
      //  options: {
      //    separator: ': ',
      //    punctuation: ' !!!'
      //  },
      //  files: {
      //    'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
      //  }
      //},
      video: {
        options: {
          min: true,
          //banner: '/* creep <=% grunt.template.today( "yyyy-mm-dd h:MM:ss" ) %> */\n'
          banner: '/* creep <%= pkg.name %> <%= grunt.template.today( "yyyy-mm-dd HH:MM:ss" ) %> */\n'
        },
        files: [
          { src: 'testlib/**/*.js', dest: 'dist/all.js', dist: 'dist/build' }
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'cola', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
