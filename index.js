const path = require('path')
const { TwitchCommandClient } = require('twitch-core')

const dotenv = require('dotenv')
dotenv.config()

const client = new TwitchCommandClient({
  username: process.env.BOT_USERNAME,
  oauth: process.env.OAUTH_KEY,
  channels: [process.env.CHANNEL],
  verboseLogging: false,
  botOwners: ['vs_code'],
  serverPort: 9999
})

client.on('message', (msg) => {
  console.log(msg)
})

client.provider.set(
  path.join(__dirname, '/commands.json')
)

client.registerDefaultCommands()

client.connect()