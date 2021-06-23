import { isArray } from 'lodash'
import { parsed } from './config'
import { Player, Roaster } from './get_detailed_war'

export const presenceCheck = (roaster: Player[] | Roaster) => {
  const roasterArr = isArray(roaster)
    ? roaster
    : Object.keys(roaster).reduce((r, k) => {
        return r.concat(roaster[k])
      }, [] as Player[])

  return roasterArr.filter(m => m.clan.tag !== parsed?.CLAN_TAG)
}
