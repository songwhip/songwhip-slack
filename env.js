const dotenv = require('dotenv')
const path = require('path')

const {
  NODE_ENV = 'development',
  PROJECT_DOMAIN,
} = process.env

const IS_GITCH = PROJECT_DOMAIN.includes('gitch')

// gitch handles env vars
if (!IS_GITCH) {
  // load the contents of the `.env` file into `process.env`
  dotenv.config({ path: path.resolve(__dirname, `./.env.${NODE_ENV}`) })
}
