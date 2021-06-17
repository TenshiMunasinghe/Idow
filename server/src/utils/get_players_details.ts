import { cocClient } from './coc_api'

export type Player = { [key: string]: any }

export const getPlayerDetails = async (
  war?: FirebaseFirestore.DocumentData
) => {
  if (!war) return

  const roaster: Promise<Player>[] = war.members.map(async (m: string) => {
    return (await cocClient.playerByTag(m)) as Player
  })

  return await Promise.all(roaster)
}
