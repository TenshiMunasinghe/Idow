import _axios from 'axios'
import * as Discord from 'discord.js'
import { parsed } from './config'
import { FormattedWar } from './format_war'
import { DetailedWar, getDetailedRoaster } from './get_detailed_war'
import { presenceCheck } from './presence_check'

const dcClient = new Discord.Client()

const axios = _axios.create({ baseURL: 'http://localhost:5000' })

const PREFIX = '!'

type Commands = {
  [key: string]: {
    action: (message: Discord.Message, args?: string[]) => void
    description: string
  }
}

const handleWar = async (message: Discord.Message, args?: string[]) => {
  if (!args || args.length === 0) {
    message.channel.send('War_IDを入力してください\n例: `!roaster <War_ID>`')
    return
  }
  const war = await axios.get<FormattedWar>(`/api/war/${args[0]}`)

  const { data } = war

  if (!war || !data) {
    message.channel.send('(そんなWar_IDは)ないです。')
    return
  }

  return {
    ...data,
    roaster: await getDetailedRoaster(data.roaster),
  } as DetailedWar
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
      try {
        const wars = await axios.get<FormattedWar[]>('/api/wars')

        const text = wars.data
          .map((w: any) => `vs \`${w.opponent}\`\nWar_ID - \`${w.id}\``)
          .join('\n\n')

        message.channel.send(text)
      } catch (e) {
        console.error(e)
      }
    },
    description: '対戦一覧: `<War_ID>`',
  },

  roaster: {
    async action(message, args) {
      const war = await handleWar(message, args)

      if (!war || !war.roaster) return

      //  generates text like:

      // "TH14
      // [player_name] @ [clan_name]
      // ...

      // TH13
      // [player_name] @ [clan_name]
      // ..."
      const roaster = Object.keys(war.roaster)
        .sort((a, b) => parseInt(b) - parseInt(a))
        .map(
          th =>
            `**TH${th}**\n` +
            war.roaster[th]
              .map(({ name, clan }) => `${name} @ ${clan.name}`)
              .join('\n')
        )
        .join('\n\n')

      message.channel.send(`vs **${war.opponent}**\n\n` + roaster)
    },
    description: '参加メンバー一覧: `<War_ID>`',
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
              .map(p => `\`${p.name}\`@\`${p.clan.name}\``)
              .join('\n') + `\n\n**${absentCount}人**いないです。`

      message.channel.send(`vs **${war.opponent}**\n\n` + text)
    },
    description: '移動確認',
    //TODO: add player and filter possible errors eg: extra space, missing '#'
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
