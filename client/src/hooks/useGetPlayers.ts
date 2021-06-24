import ky from 'ky'
import { useQuery } from 'react-query'
import { RoasterType } from '../../../server/src/utils/get_detailed_war'

const getPlayers: () => Promise<RoasterType> = async () =>
  await ky.get('/api/players').json()

export const useGetPlayers = () => useQuery('players', getPlayers)
