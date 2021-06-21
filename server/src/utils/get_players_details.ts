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

export const getPlayerDetails = async (
  war?: FirebaseFirestore.DocumentData
) => {
  if (!war) return

  const roaster: Promise<Player>[] = war.roaster.map(async (m: string) => {
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

  return { ...war, roaster: await Promise.all(roaster) } as DetailedWar
}
