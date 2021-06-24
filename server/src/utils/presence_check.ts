import { isArray } from 'lodash'
import { parsed } from './config'
import { Player, RoasterType } from './get_detailed_war'

export const presenceCheck = (roaster: Player[] | RoasterType) => {
  const roasterArr = isArray(roaster)
    ? roaster
    : Object.keys(roaster).reduce((r, k) => {
        return r.concat(roaster[k])
      }, [] as Player[])

  return roasterArr.filter(m => m.clan.tag !== parsed?.CLAN_TAG)
}
