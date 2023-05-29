const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 6016
    },
    db : {
        name: process.env.DEV_DB_NAME || 'zentactic',
        host: process.env.DEV_DB_HOST || 'localhost',
        port: process.env.DEV_DB_PORT || 27017
    }
}

const pro = {
    app: {
        host: process.env.PRO_APP_PORT || 3000
    },
    db : {
        name: process.env.PRO_DB_NAME || 'zentactic',
        host: process.env.PRO_DB_HOST || 'localhost',
        port: process.env.PRO_DB_PORT || 27017
    }
}
const config = {dev, pro}
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env];