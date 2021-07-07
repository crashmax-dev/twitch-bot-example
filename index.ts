import { join } from 'path'
import { TwitchCommandClient, TwitchChatMessage } from 'twitch-core'

import dotenv from 'dotenv'
dotenv.config()

const client = new TwitchCommandClient({
  username: process.env.BOT_USERNAME,
  oauth: process.env.OAUTH_KEY,
  channels: JSON.parse(process.env.CHANNELS),
  botOwners: ['vs_code']
})

client.on('message', (msg: TwitchChatMessage) => { })

client.provider.set(
  join(__dirname, 'config/text-commands.json'),
  join(__dirname, 'config/commands.json'),
  join(__dirname, 'config/config.json')
)

client.registerTextCommands()

client.registerDefaultCommands()

client.registerCommandsIn(
  join(__dirname, '/commands')
)

client.connect()