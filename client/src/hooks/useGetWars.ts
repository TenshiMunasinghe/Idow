import ky from 'ky'
import { useQuery } from 'react-query'
import { War } from '../../../server/src/utils/get_players_details'

export interface ClientWar extends Omit<War, 'spin_time'> {
  spin_time: string
  id: string
}

const getWars: () => Promise<ClientWar[]> = async () => {
  return await ky.get('/api/wars').json()
}

export const useGetWars = () => {
  return useQuery('wars', getWars)
}
