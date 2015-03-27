var fs = require( './fs' );
var path = require( 'path' );
var util = require( './util' );
var glob = require( 'glob' );

module.exports = function () {

    var tasks = [];

    //处理控制行task
    var cmdTask = {
        option: {
            m: false,
            r: false
        },
        file: []
    };

    var args = [];

    process.argv.slice(2).forEach( function ( arg, index ) {
        if ( /^-/.test( arg ) ) {
            arg = arg.replace( '-', '' ).split( '' );
            arg.forEach( function ( _arg ) {
                args[args.length] = '-' + _arg;
            } );
        } else {
            args[args.length] = arg;
        }
    } );

    var i = 0,
        len = args.length,
        arg;
    while ( i < len ) {

        arg = args[i];

        if ( /^-([a-zA-z])/.exec( arg ) ) {
            arg = RegExp.$1.toLowerCase();
            if ( arg == 'c' || arg == 'o' ) {
                cmdTask[arg] = args[++i];
            } else {
                cmdTask.option[arg] = true;
            }
        } else {
            cmdTask.file.push( arg );
        }
        i++;
    }

    cmdTask.dest = cmdTask.o;
    delete cmdTask.o;

    if ( cmdTask.file.length ) {
        tasks.push( cmdTask );
    }
    
    //处理配置文件task
    if ( cmdTask.c ) {
            
        var config = fs.readJSON( path.resolve( cmdTask.c ) );
        delete cmdTask.c;

        var gOption = util.extend( {}, config.option, { m: false, r: false } );
        
        ( config.task || [] ).forEach( function ( task ) {

            if ( task.file && task.file.length ) {
                task.option = util.extend( {}, task.option, gOption );
                tasks.push( task );
            }
        } );
    }

    //var cwd = process.cwd();
    
    //处理文件路径
    tasks.forEach( function ( task ) {
        var files = task.file;

        if ( util.isString( files ) ) {
            files = [files];
        }

        var _files = [];

        files.forEach( function ( file, index, arr ) {
            //if ( !path.isAbsolute( file ) ) {
            //    file = path.resolve( file );
            //}
            try {
                if ( fs.isDirectory( file ) ) {
                    if ( task.option.r ) {
                        file = path.join( file, '/**/*.js' );
                    } else {
                        file = path.join( file, '/*.js' );
                    }
                }
            } catch ( e ) {}
            
            _files = _files.concat( glob.sync( file ) );
        } );
        
        task.file = util.unique( _files );
    } );
    
    return tasks;
};
