import groupBy from 'lodash/groupBy'
import { cocClient } from './coc_api'
import { FormattedWar } from './format_war'

export interface Player {
  clan: {
    name: string
    tag: string
  } | null
  townHallLevel: number
  tag: string
  name: string
}

export interface RoasterType {
  [key: string]: Player[]
}

export interface DetailedWar extends Omit<FormattedWar, 'roaster'> {
  roaster: RoasterType
}

export const getDetailedRoaster = async (roaster: string[]) => {
  const playersPromise: Promise<Player>[] = roaster.map(async (m: string) => {
    const { clan, townHallLevel, tag, name } = await cocClient.playerByTag(m)
    return {
      clan: clan
        ? {
            name: clan.name,
            tag: clan.tag,
          }
        : null,
      townHallLevel,
      tag,
      name,
    } as Player
  })

  try {
    const players = await Promise.all(playersPromise)

    return groupBy(players, 'townHallLevel') as RoasterType
  } catch (e) {
    console.error(e)
  }
}
