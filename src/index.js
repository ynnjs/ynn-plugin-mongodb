const mongoose = require('mongoose');
const MONGODB = Symbol( 'mongodb' );

mongoose.Promise = global.Promise;

module.exports = ( app, options = {} ) => {
    const config = options.mongodb || app.config( 'mongodb' );

    Object.defineProperty( app, options.name || 'mongodb', {
        get() {
            if( app[ MONGODB ] ) return app[ MONGODB ];
            app[ MONGODB ] = mongoose.createConnection(config, {useNewUrlParser: true});
            return app[ MONGODB ];
        },

        set( r ) {
            app[ MONGODB ] = r;
        }
    } );
};
