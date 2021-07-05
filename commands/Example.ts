import { CommandOptions, TwitchChatCommand, TwitchChatMessage, TwitchCommandClient } from 'twitch-core'

interface CommandArgs {
  arg1: string
  arg2: number
}

export default class Example extends TwitchChatCommand {
  constructor(client: TwitchCommandClient, options: CommandOptions) {
    super(client, options)
  }

  async run(msg: TwitchChatMessage, { arg1, arg2 }: CommandArgs) {
    msg.reply(`args → ${arg1} ${!isNaN(arg2) ? (arg2 * 2) : 'not a number!'}`)
  }
}