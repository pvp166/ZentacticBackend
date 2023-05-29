const app = require('./src/app');
const config = require('./src/configs/config.mongodb')
const PORT = config.app.port || 6016
const server = app.listen(PORT, () => {
    console.log(`This is the message from PORT ${PORT}`)
})

process.on('SIGINT', () => {
    console.log('This session has been killed')
})