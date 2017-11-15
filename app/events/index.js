
/**
 * External Dependencies
 */

const debug = require('debug')('songwhip-slack:events')

/**
 * Internal Dependencies
 */

const convert = require('../lib/convert-link')
const tokens = require('../lib/tokens')
const api = require('../api')

exports.link_shared = async (teamId, { channel, links }) => {
  debug('link_shared', links)
  const link = links[0].url

  const json = await convert(link)
  const token = await tokens.get(teamId)

  if (!token) {
    debug('no token for team: %s', teamId)
    return
  }

  const text = `${ json.url }?utm_source=slack&utm_medium=slack-app&utm_campaign=auto-convert-link`

  await api('chat.postMessage', {
    channel,
    text,
    unfurl_links: true,
    unfurl_media: true,
  }, token)
}
