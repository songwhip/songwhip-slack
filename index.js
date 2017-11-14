require('./env')

/**
 * Internal Dependencies
 */

const app = require('./app')

app.listen(process.env.PORT)

process.on('unhandledRejection', (e) => console.log(e))
