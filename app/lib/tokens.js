
/**
 * Internal Dependencies
 */

const store = require('./store')

const NAMESPACE = 'tokens'

exports.get = (teamId) => {
  return store.get(`${ NAMESPACE }:${ teamId }`)
}

exports.set = (teamId, token) => {
  return store.set(`${ NAMESPACE }:${ teamId }`, token)
}
