
/**
 * External Dependencies
 */

const debug = require('debug')('songwhip-bots:store')

/**
 * Internal Dependencies
 */

const redis = require('./redis')

/**
 * Locals
 */

const NAMESPACE = 'songwhip-slack'

exports.set = (key, value) => {
  return new Promise((resolve, reject) => {
    debug('set reply')
    redis.set(`${NAMESPACE}:${key}`, value, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

exports.exists = (key) => {
  return new Promise((resolve, reject) => {
    debug('exists "%s"', key)
    redis.exists(`${NAMESPACE}:${key}`, (err, result) => {
      if (err) return reject(err)
      debug('exists result: "%s"', result)
      resolve(!!result)
    })
  })
}

exports.get = (key) => {
  return new Promise((resolve, reject) => {
    debug('get "%s"', key)
    redis.get(`${NAMESPACE}:${key}`, (err, result) => {
      if (err) return reject(err)
      debug('get result: "%s"', result)
      resolve(result)
    })
  })
}
