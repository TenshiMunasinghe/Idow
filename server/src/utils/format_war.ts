import { WarType } from '../main'

export interface FormattedWar extends Omit<WarType, 'spin_time'> {
  spin_time: string
  id: string
}

export const formatWar = (war: WarType, id: string) =>
  ({
    ...war,
    spin_time: war.spin_time.toDate().toString(),
    id,
  } as FormattedWar)
