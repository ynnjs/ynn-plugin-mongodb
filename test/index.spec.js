const Ynn = require('ynn')

async function create(options = {}) {
    const app = new Ynn(Object.assign({
        root: __dirname,
        debugging: false,
        logging: false,
        plugins: {}
    }, options))

    await app.ready()

    return app
}

describe('connections', () => {
    it('create connections', async () => {
        const app = await create({
            plugins: {
                db: {
                    path: '../lib',
                    options: {
                        config: {
                            url: 'mongodb://localhost:27017/test',
                            options: {}
                        }
                    }
                }
            },
            routers() {
                this.router.add('/', async (ctx) => {
                    expect(app.db()).not.toEqual(app.db())
                    expect(app.db.connection).not.toEqual(app.db())
                    expect(app.db.connection).toEqual(app.db.connection)
                    ctx.body = {}
                })
            }
        })
        await app.sham('/').catch(() => {
        })

        //return new Promise( resolve => {
        //setTimeout( resolve, 1000 );
        //} );
    })
})

xdescribe('create connection pools', () => {

})

xdescribe('reuse connections', () => {
})

xdescribe('use the plugin multiple times', () => {

})
