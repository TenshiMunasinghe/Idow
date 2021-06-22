import { cocClient } from './coc_api'
import { TimeStamp } from './firebase'

export interface Player {
  clan: {
    name: string
    tag: string
  }
  townHallLevel: number
  tag: string
  name: string
}

export interface DetailedWar {
  opponent: string
  spin_time: TimeStamp
  roaster: Player[]
}

export const getPlayerDetails = async (roaster: string[]) => {
  const players: Promise<Player>[] = roaster.map(async (m: string) => {
    const { clan, townHallLevel, tag, name } = await cocClient.playerByTag(m)
    return {
      clan: {
        name: clan.name,
        tag: clan.tag,
      },
      townHallLevel,
      tag,
      name,
    } as Player
  })

  return await Promise.all(players)
}
