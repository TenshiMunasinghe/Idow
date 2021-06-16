import * as Discord from 'discord.js'
import * as dotenv from 'dotenv'
import { db, toTimeStamp } from './firebase'

const config = dotenv.config({ path: '../config/.env' })

const dcClient = new Discord.Client()

const PREFIX = '!'

type Commands = {
  [key: string]: {
    action: (message: Discord.Message, args?: string[]) => void
    description: string
  }
}

const commands: Commands = {
  commands: {
    action(message) {
      message.channel.send(
        '__**コマンド一覧**__\n' +
          commandKeys
            .map(key => `\`!${key}\` - ${commands[key].description}`)
            .join('\n')
      )
    },
    description: 'コマンド一覧',
  },

  wars: {
    async action(message) {
      const wars = await db
        .collection('roasters')
        .where('spin_time', '<', toTimeStamp(new Date()))
        .get()

      const text = wars.docs
        .map(w => `vs ${w.data().opponent}\nWar_ID - ${w.id}`)
        .join('\n\n')

      message.channel.send(text)
    },
    description: '対戦一覧: <War_ID>',
  },

  roasters: {
    async action(message, args) {},
    description: '参加メンバー一覧: <War_ID>',
  },

  // idow: {
  //   async action(message, args) {
  //     if(!args) {
  //       message.channel
  //     }
  //     const members = await presenceCheck()
  //   },
  //   description: '移動確認',
  // },
}
const commandKeys = Object.keys(commands)

dcClient.on('message', message => {
  if (message.author.bot) return
  if (!message.content.startsWith(PREFIX)) return

  const commandBody = message.content.slice(PREFIX.length)

  if (!commandBody) return

  const args = commandBody.split(' ')
  const command = args.shift()?.toLowerCase()

  if (!command) return

  if (!Object.keys(commands).includes(command)) {
    message.channel.send('(そんなコマンド)ないです。')
    return
  }

  commands[command].action(message)
})

export const login_bot = async () => {
  try {
    await dcClient.login(config.parsed?.BOT_TOKEN)
  } catch (e) {
    console.error(e)
  }
}
