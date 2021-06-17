import * as dotenv from 'dotenv'
import { Player } from './get_players_details'

const config = dotenv.config({ path: '../config/.env' })

export const presenceCheck = (roaster: Player[]) => {
  return roaster.filter(m => m.clan.tag !== config.parsed?.CLAN_TAG)
}
