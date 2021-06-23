import ky from 'ky'
import { useQuery } from 'react-query'
import { DetailedWar } from '../../../server/src/utils/get_detailed_war'

export interface ClientWar extends Omit<DetailedWar, 'spin_time'> {
  spin_time: string
  id: string
}

const getWars: () => Promise<ClientWar[]> = async () =>
  await ky.get('/api/wars').json()

export const useGetWars = () => {
  return useQuery('wars', getWars)
}
