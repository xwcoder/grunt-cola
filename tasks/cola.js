/*
 * grunt-cola
 * https://github.com/xwcoder/grunt-cola
 *
 * Copyright (c) 2015 creep
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var path = require( 'path' );
  var compress = require( './lib/compress' );

  grunt.registerMultiTask('cola', 'grunt plugin for cola (colac)', function () {

    var defineMap = {};

    global.defineArray = [];
    global.useArray = [];

    function clean () {
        defineMap = {};
        global.defineArray = [];
        global.useArray = [];
    }

    function clear () {
        global.defineArray = [];
        global.useArray = [];
    }

    require( './lib/define' ).setUp();

    var options = this.options( {
      min: false,
      banner: ''
    } );

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {

      clean();

      var src = file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      src.forEach( function ( filepath ) {
          clear();
          require( path.resolve( filepath ) );

          defineMap[filepath] = {
              defineArray: global.defineArray,
              useArray: global.useArray
          }
      } );

      var defineArr = [];
      var useArr = [];
      var content;

      if ( file.dest ) { // 合并文件
        for ( var p in defineMap ) {
          defineArr = defineArr.concat( defineMap[p].defineArray );
          useArr = useArr.concat( defineMap[p].useArray );
        }

        //content = defineArr.join( '\n' ) + useArr.join( '\n' );
        content = defineArr.concat( useArr ).join( '\n' );

        if ( options.min ) { //压缩
          content = compress( content );
        }

        content = options.banner + content;

        grunt.file.write( file.dest, content );
        grunt.log.writeln('File "' + file.dest + '" created.');

      }

      if ( file.dist ) {

        for ( var p in defineMap ) {

          content = defineMap[p].defineArray.join( '\n' ) + defineMap[p].useArray.join( '\n' );

          if ( options.m ) {
            content = compress( content );
          }

          content = options.banner + content;

          var distFilepath = path.join( file.dist, p );

          grunt.file.write( distFilepath, content );

          grunt.log.writeln('File "' + distFilepath + '" created.');
        }
      }

    });
  });

};
