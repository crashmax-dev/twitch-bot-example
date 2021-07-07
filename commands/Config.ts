import Lowdb from 'lowdb'
import { TwitchChatCommand, TwitchChatMessage, TwitchCommandClient } from 'twitch-core'

type ConfigProvider = Record<string, string>

export default class Config extends TwitchChatCommand {
  private provider: Lowdb.LowdbSync<ConfigProvider>

  constructor(client: TwitchCommandClient) {
    super(client, {
      name: 'config',
      description: 'provider',
      group: 'system',
      userlevel: 'regular'
    })

    this.provider = client.provider.get<ConfigProvider>('config')
  }

  async prepareRun(msg: TwitchChatMessage, args: string[]) {
    if (args.length > 1) {
      const action = args[0]
      args.shift()
      const key = args[0]
      args.shift()
      const value = args.join(' ')

      switch (action) {
        case 'set':
          this.set(msg, key, value)
          break

        case 'get':
          this.get(msg, key)
          break

        case 'unset':
          this.unset(msg, key)
          break

        default:
          msg.reply(`Action '${action}' is not found!`)
      }
    }
  }

  set(msg: TwitchChatMessage, key: string, value: string) {
    this.provider.set(key, value).write()
    msg.reply(`Set → ${value}`)
  }

  get(msg: TwitchChatMessage, key: string) {
    const value = this.provider.get(key).value()

    if (value !== undefined) {
      msg.reply(`Get → ${value}`)
    } else {
      msg.reply(`Key '${key}' is not found!`)
    }
  }

  unset(msg: TwitchChatMessage, key: string) {
    const value = this.provider.get(key).value()

    if (value !== undefined) {
      this.provider.unset(key).write()
      msg.reply(`Unset → ${value}`)
    } else {
      msg.reply(`Key '${key}' is not found!`)
    }
  }
}