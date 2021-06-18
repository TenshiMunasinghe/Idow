import { cocClient } from './coc_api'

export type Player = { [key: string]: any }

type War = {
  opponent: string
  spin_time: any
  roaster: Player[]
}

export const getPlayerDetails = async (
  war?: FirebaseFirestore.DocumentData
) => {
  if (!war) return

  const roaster: Promise<Player>[] = war.members.map(async (m: string) => {
    return (await cocClient.playerByTag(m)) as Player
  })

  return { ...war, roaster: await Promise.all(roaster) } as War
}
