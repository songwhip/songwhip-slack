
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

  // when there is only one link there's no value in
  // us posting the songwhip link to the channel
  if (Object.keys(json.links).length < 2) {
    debug('abort: only one result')
    return
  }

  const text = `${ json.url }?utm_source=slack-app`

  await api('chat.postMessage', {
    channel,
    text,
    unfurl_links: true,
    unfurl_media: true,
  }, token)
}
