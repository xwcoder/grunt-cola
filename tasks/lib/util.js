var isType = function ( type ) {
    return function ( obj ) {
        return {}.toString.call( obj ) == '[object ' + type + ']';
    }
};

var isObject = isType( 'Object' );
var isString = isType( 'String' );

function extend ( t, s, defaults ) {
    if ( defaults ) {
        extend( t, defaults );
    }

    if ( isObject( s ) ) {
        for ( var p in s ) {
            t[p] = s[p];
        }
    }

    return t;
}

function extendIf ( t, s, defaults ) {

    if ( defaults ) {
        extendIf( t, defaults );
    }
    
    if ( isObject( s ) ) {
        for ( var p in s ) {
            if ( typeof t[p] == 'undefined' ) {
                t[p] = s[p];
            }
        }
    }
    return t;
}

module.exports = {

    extend: extend,

    extendIf: extendIf,

    isObject: isObject,

    isString: isString,

    unique : function ( array ) {
        var ret = [];
        for ( var i = 0; i < array.length; i++ ) {
            var item = array[ i ];
            if ( ret.indexOf( item ) === -1 ) {
                ret.push( item );
            }
        }
         
        return ret;
    }
};
