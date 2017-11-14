
/**
 * External Dependencies
 */

const debug = require('debug')('songwhip-slack:app')
const querystring = require('querystring')
const bodyParser = require('body-parser')
const express = require('express')

/**
 * Internal Dependencies
 */

const tokens = require('./lib/tokens')
const events = require('./events')
const api = require('./api')

/**
 * Locals
 */

const app = module.exports = express()

const {
  SLACK_APP_CLIENT_ID,
  SLACK_APP_CLIENT_SECRET,
} = process.env

app.post('/event', bodyParser.json(), (req, res, next) => {
  debug('/event', req.body)
  const { type, event, team_id } = req.body

  switch (type) {
    case 'event_callback': {
      const handler = events[event.type]
      if (!handler) return next(new Error(`unknown event: ${ event.type }`))
      handler(team_id, event)
      break
    }

    case 'url_verification': {
      const { challenge } = req.body
      res.json({ challenge })
      break
    }

    default: {
      return next(new Error(`unknown event: ${ type }`))
    }
  }

  // send empty 200
  res.send('')
})

app.get('/oauth', async (req, res) => {
  const { code } = req.query

  const {
    team_id,
    access_token,
    team_name,
  } = await api('oauth.access', {
    client_id: SLACK_APP_CLIENT_ID,
    client_secret: SLACK_APP_CLIENT_SECRET,
    code,
  })

  await tokens.set(team_id, access_token)

  res.send(`Success! Songwhip was installed to "${ team_name }"`)
})

app.get('/add', (req, res) => {
  const query = querystring.stringify({
    client_id: SLACK_APP_CLIENT_ID,
    scope: 'links:read chat:write:bot',
  })

  res.redirect(`https://slack.com/oauth/authorize?${ query }`)
})
