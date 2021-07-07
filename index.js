const path = require('path')
const { TwitchCommandClient } = require('twitch-core')
require('dotenv').config()

const client = new TwitchCommandClient({
  username: process.env.BOT_USERNAME,
  oauth: process.env.OAUTH_KEY,
  channels: JSON.parse(process.env.CHANNELS),
  botOwners: ['vs_code']
})

client.on('message', (msg) => { })

client.provider.set(
  path.join(__dirname, '/text-commands.json')
)

client.registerTextCommands()

client.connect()