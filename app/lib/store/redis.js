
/**
 * External Dependencies
 */

const debug = require('debug')('songwhip-bots:store:redis')
const redis = require('redis')

const {
  REDIS_HOST,
  REDIS_PORT,
} = process.env

const client = module.exports = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
})

client.on('ready', () => debug('connected'))
