
/**
 * External Dependencies
 */

const debug = require('debug')('songwhip-slack:api')
const fetch = require('node-fetch')
const qs = require('querystring')

const ENDPOINT = 'https://slack.com/api/'

module.exports = async (path, params, token) => {
  debug('%s', params, token)
  const contentType = getContentType(path)
  const body = formatBody(contentType, params)
  let headers = { 'Content-Type': contentType }

  if (token) headers.Authorization = `Bearer ${ token }`

  const response = await fetch(`${ ENDPOINT }/${ path }`, {
    method: 'post',
    headers,
    body,
  })

  return response.json()
}

function getContentType(path) {
  switch (path) {
    case 'oauth.access': return 'application/x-www-form-urlencoded'
    default: return 'application/json; charset=utf-8'
  }
}

function formatBody(contentType, params) {
  switch (contentType) {
    case 'application/x-www-form-urlencoded': return qs.stringify(params)
    default: return JSON.stringify(params)
  }
}
