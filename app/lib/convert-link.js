
/**
 * External Dependencies
 */

const debug = require('debug')('songwhip-slack:convert-link')
const fetch = require('node-fetch')

const { SONGWHIP_WEB_ENDPOINT } = process.env

module.exports = async (url) => {
  debug('get', url)
  const response = await fetch(SONGWHIP_WEB_ENDPOINT, {
    method: 'post',
    body: url,
  })

  if (!response.ok) {
    console.error(response.status, response.text)
    throw new Error('error')
  }

  const text = await response.text()
  return JSON.parse(text)
}
