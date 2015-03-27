var fs = require( 'fs' );

module.exports = {

    readFile: function ( filename, opts ) {
        return fs.readFileSync( filename, opts );
    },
    writeFile: function ( filename, data, opts ) {
        return fs.writeFileSync( filename, data, opts );
    },
    appendFile: function ( filename, data, options ) {
        return fs.appendFileSync(filename, data, options);
    },
    readJSON: function ( filepath, opts ) {
        var src = fs.readFileSync( filepath, opts );
        return JSON.parse( src );
    },
    unlink: function ( path ) {
        return fs.unlinkSync( path );
    },
    isDirectory: function ( path ) {
       return fs.statSync( path ).isDirectory();
    },
    readdir: function ( path ) {
        return fs.readdirSync( path );
    },
    open: function ( path, flag, mode ) {
        return fs.openSync( path, flag, mode );
    }, 
    close: function ( fd ) {
        return fs.closeSync( fd );
    }
};
