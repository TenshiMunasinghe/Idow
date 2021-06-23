import ky from 'ky'
import { useQuery } from 'react-query'
import { Roaster } from '../../../server/src/utils/get_detailed_war'

const getPlayers: () => Promise<Roaster> = async () =>
  await ky.get('/api/players').json()

export const useGetPlayers = () => useQuery('players', getPlayers)
