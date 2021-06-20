import ky from 'ky'
import { useQuery } from 'react-query'
import { ClientWar } from './useGetWars'

const getWar: (id: string) => Promise<ClientWar> = async (id: string) =>
  await ky.get(`/api/war/${id}`).json()

export const useGetWar = (id: string) => useQuery(['war', id], () => getWar(id))
