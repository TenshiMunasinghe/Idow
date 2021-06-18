import { parsed } from './config'
import { Player } from './get_players_details'

export const presenceCheck = (roaster: Player[]) => {
  return roaster.filter(m => m.clan.tag !== parsed?.CLAN_TAG)
}
