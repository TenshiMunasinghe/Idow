import * as dotenv from 'dotenv'
import { cocClient } from './coc_api'
import { db } from './firebase'

const config = dotenv.config({ path: '../../config/.env' })

export const presenceCheck = async (warId: string) => {
  try {
    const roaster = await (
      await db.collection('roasters').doc(warId).get()
    ).data()?.members
    const members = (
      await cocClient.clanMembersByTag(config.parsed?.CLAN_TAG)
    ).items.map((p: any) => p.tag)

    return roaster.filter((m: string) => !members.includes(m))
  } catch (e) {
    console.error(e)
  }
}
