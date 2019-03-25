#!/usr/bin/env node

const Ynn = require( 'ynn' );
const app = new Ynn( {
    root : __dirname,
    debugging : true,
    logging : false,
    plugins : {
        db : {
            path : '../lib',
            options : {
                config : {
                    url: 'mongodb://localhost:27017/test',
                    options: {}
                }
            }
        }
    },
    routers() {
        const router = this.router;

        router.get( '/', async ( ctx, next, rt ) => {
            rt.response( {} );
        } );
    }
} );

module.parent || app.listen( Ynn.cargs.port );
module.exports = app;
