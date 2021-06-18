import { cocClient } from './coc_api'
import { TimeStamp } from './firebase'

export type Player = { [key: string]: any }

export interface War {
  opponent: string
  spin_time: TimeStamp
  roaster: Player[]
}

export const getPlayerDetails = async (
  war?: FirebaseFirestore.DocumentData
) => {
  if (!war) return

  const roaster: Promise<Player>[] = war.roaster.map(async (m: string) => {
    return (await cocClient.playerByTag(m)) as Player
  })

  return { ...war, roaster: await Promise.all(roaster) } as War
}
