import { Optional } from '../main'
import { toTimeStamp } from './firebase'
import { FormattedWar } from './format_war'

export const toFirebaseWar = (war: Optional<FormattedWar, 'id'>) => ({
  ...war,
  spin_time: toTimeStamp(new Date(war.spin_time)),
})
