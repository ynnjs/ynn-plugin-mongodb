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
            const db = rt.app.db;
            const mongoose = db.mongoose
            const Schema = mongoose.Schema
            const model = db.connection.model('users', new Schema({
                user_name: String
            }))
            await model.create({user_name: 'busyhe'})
            await model.deleteMany({user_name: 'busyhe'})
            rt.response( {} );
        } );
    }
} );

module.parent || app.listen( 3000 );
module.exports = app;
