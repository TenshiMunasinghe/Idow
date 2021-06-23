import ky from 'ky'
import { useQuery } from 'react-query'
import { FormattedWar } from '../../../server/src/utils/format_war'

const getWars: () => Promise<FormattedWar[]> = async () =>
  await ky.get('/api/wars').json()

export const useGetWars = () => {
  return useQuery('wars', getWars)
}
