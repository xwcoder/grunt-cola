var UglifyJS = require( 'uglify-js' );

module.exports = function ( content ) {

    return UglifyJS.minify( content, {
        fromString: true,
        output: {
            ascii_only : true,
            max_line_len : null
        }
    } ).code;
};

