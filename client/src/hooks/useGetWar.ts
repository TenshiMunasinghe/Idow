import ky from 'ky'
import { useQuery } from 'react-query'
import { FormattedWar } from '../../../src/utils/format_war'

const getWar: (id: string) => Promise<FormattedWar> = async (id: string) =>
  await ky.get(`/api/war/${id}`).json()

export const useGetWar = (id: string) => useQuery(['war', id], () => getWar(id))
