import axios from 'axios'
import * as Discord from 'discord.js'
import config from './config'
import { FormattedWar } from './format_war'
import { DetailedWar, getDetailedRoaster } from './get_detailed_roaster'
import { presenceCheck } from './presence_check'

const dcClient = new Discord.Client()

const PREFIX = process.env.NODE_ENV === 'development' ? '?' : '!'

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

const handlePlayers = async (
  message: Discord.Message,
  option: 'add' | 'remove',
  args?: string[]
) => {
  if (!args) {
    message.channel.send('登録するプレイヤーを入力してください。')
    return
  }

  const invalidTags = args.filter(tag => tag[0] !== '#')

  if (invalidTags.length > 0) {
    message.channel.send('無効なタグがありました。\n' + invalidTags.join('\n'))
    return
  }

  try {
    const requestHandler = option === 'add' ? axios.put : axios.delete

    const promises = args.map(async tag => {
      try {
        const { data } = await requestHandler(
          `/api/player/${tag.replace('#', '%23')}`
        )
        return { ...data, tag }
      } catch ({ response }) {
        return { ...response.data, tag }
      }
    })

    const response = await Promise.all(promises)

    const succeeded = response.filter(res => !res.error)
    const errorred = response.filter(res => res.error)

    const erroredText =
      errorred.length > 0
        ? '無効なタグがありました。\n' +
          errorred.map(e => e.tag).join('\n') +
          '\n\n'
        : ''

    const succeededText =
      succeeded.length > 0
        ? `${succeeded.length}人を${
            option === 'add' ? '追加' : '削除'
          }しました。\n` + succeeded.map(a => a.name).join('\n')
        : ''

    message.channel.send(erroredText + succeededText)
  } catch (error) {
    console.error('error')
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
      try {
        const wars = await axios.get<FormattedWar[]>('/api/wars')

        for (const war of wars.data) {
          message.channel.send(`vs \`${war.opponent}\``)
          message.channel.send(`${war.id}`)
        }
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
      // [player_name]
      // ...

      // TH13
      // [player_name]
      // ..."
      const roaster = Object.keys(war.roaster)
        .sort((a, b) => parseInt(b) - parseInt(a))
        .map(
          th =>
            `**TH${th}**\n` + war.roaster[th].map(({ name }) => name).join('\n')
        )
        .join('\n\n')

      message.channel.send(`vs **${war.opponent}**\n\n` + roaster)
    },
    description: '参加メンバー一覧: `<War_ID>`',
  },

  add: {
    async action(message, args) {
      handlePlayers(message, 'add', args)
    },
    description: 'プレイヤーを登録: <Player_Tag>...',
  },

  remove: {
    async action(message, args) {
      handlePlayers(message, 'remove', args)
    },
    description: 'プレイヤーの登録を削除: <Player_Tag>...',
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
              .map(p => `\`${p.name}\`@\`${p.clan?.name || '無所属'}\``)
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
    return
  }

  commands[command].action(message, args)
})

export const login_bot = async () => {
  try {
    await dcClient.login(config?.BOT_TOKEN)
  } catch (e) {
    console.error(e)
  }
}
