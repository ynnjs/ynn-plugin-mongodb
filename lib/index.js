const mongoose = require('mongoose')
const MONGODB = Symbol('mongodb')

const PLUGIN_MONGODB_CTX_CONNECTION = Symbol('plugin#mongodb#ctx#connection')

mongoose.Promise = global.Promise

function createConnection(app, config = {}) {
    const conn = mongoose.createConnection(config.url, config.options)
    app.output.info(`[ynn-plugin-mongodb] connected /${config.url || '[NO DATABASE SELECTED]'}.`)
    return conn
}

module.exports = (app, options = {}) => {
    const name = options.name || 'mongodb'
    const config = options.config || app.config(name, {})

    function connect() {
        return createConnection(app, config)
    }

    app[name] = connect

    Object.defineProperty(app[name], 'connection', {
        get() {
            if (!app[name][MONGODB]) {
                app[name][MONGODB] = createConnection(app, config)
            }
            return app[name][MONGODB]
        },

        set(m) {
            app[name] [MONGODB] = m
        }
    })

    app.preuse((ctx, next) => {
        ctx[name] = function () {
            if (!ctx[PLUGIN_MONGODB_CTX_CONNECTION]) {
                ctx[PLUGIN_MONGODB_CTX_CONNECTION] = connect()
            }
            return ctx[PLUGIN_MONGODB_CTX_CONNECTION]
        }

        const {res} = ctx

        function close() {
            if (ctx[PLUGIN_MONGODB_CTX_CONNECTION]) {
                ctx[PLUGIN_MONGODB_CTX_CONNECTION].close()
            }
            res.removeListener('close', close)
            res.removeListener('finish', close)
        }

        res.once('close', close)
        res.once('finish', close)

        return next()
    })
}
