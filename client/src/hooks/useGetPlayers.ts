import ky from 'ky'
import { useQuery } from 'react-query'
import { Player } from '../../../server/src/utils/get_detailed_war'

const getPlayers: () => Promise<Player[]> = async () =>
  await ky.get('/api/players').json()

export const useGetPlayers = () => useQuery('players', getPlayers)
