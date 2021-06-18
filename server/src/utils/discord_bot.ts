import * as Discord from 'discord.js'
import { parsed } from './config'
import { db, toTimeStamp } from './firebase'
import { getPlayerDetails } from './get_players_details'
import { presenceCheck } from './presence_check'

const dcClient = new Discord.Client()

const PREFIX = '!'

type Commands = {
  [key: string]: {
    action: (message: Discord.Message, args?: string[]) => void
    description: string
  }
}

const handleWar = async (message: Discord.Message, args?: string[]) => {
  if (!args || args.length === 0) {
    message.channel.send('War_IDを入力してください\n例: !roaster <War_ID>')
    return
  }
  const war = await db.collection('wars').doc(args[0]).get()

  const data = war.data()

  if (!war.exists || !data) {
    message.channel.send('(そんなWar_IDは)ないです。')
    return
  }

  return await getPlayerDetails(data)
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
        .collection('wars')
        .where('spin_time', '>', toTimeStamp(new Date()))
        .get()

      const text = wars.docs
        .map(w => `vs ${w.data().opponent}\nWar_ID - ${w.id}`)
        .join('\n\n')

      message.channel.send(text)
    },
    description: '対戦一覧: <War_ID>',
  },

  roaster: {
    async action(message, args) {
      const war = await handleWar(message, args)

      if (!war || !war.roaster) return

      message.channel.send(
        `vs ${war.opponent}` +
          war.roaster
            .map(({ name, clan }) => `**${name}** @ ${clan.name}`)
            .join('\n')
      )
    },
    description: '参加メンバー一覧: <War_ID>',
  },

  idow: {
    async action(message, args) {
      const war = await handleWar(message, args)

      if (!war || !war.roaster) return

      const absentPlayers = presenceCheck(war.roaster)

      const absentCount = absentPlayers.length

      const text =
        absentCount === 0
          ? '全員集合してます！'
          : absentPlayers
              .map(p => `**${p.name}** @ ${p.clan.name}`)
              .join('\n') + `\n**${absentCount}人**いないです。`

      message.channel.send(text)
    },
    description: '移動確認',
  },
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

  commands[command].action(message, args)
})

export const login_bot = async () => {
  try {
    await dcClient.login(parsed?.BOT_TOKEN)
  } catch (e) {
    console.error(e)
  }
}
