import * as Discord from 'discord.js'

const dcConfig = require('../config/discord.json')

const dcClient = new Discord.Client()

const PREFIX = '!'

const commands = {
  commands: {
    action(message: Discord.Message) {
      message.channel.send(
        '__**コマンド一覧**__\n' +
          commandKeys
            .map(
              key => `\`!${key}\` - ${commands[key as Commands].description}`
            )
            .join('\n')
      )
    },
    description: 'コマンド一覧',
  },
  greet: {
    action(message: Discord.Message) {
      console.log('yo')
    },
    description: 'やっはろー！',
  },
}

type Commands = keyof typeof commands

const commandKeys = Object.keys(commands)

dcClient.on('message', message => {
  if (message.author.bot) return
  if (!message.content.startsWith(PREFIX)) return

  const commandBody = message.content.slice(PREFIX.length)

  if (!commandBody) return
  const args = commandBody.split(' ')
  const command = args.shift()?.toLowerCase()

  if (!command) return

  commands[command as Commands].action(message)
})

export const login_bot = () => dcClient.login(dcConfig.bot_token)
