import { ClientWar } from '../hooks/useGetWars'
import { dateToString } from '../utils/dateToString'
import VsOpponent from './VsOpponent'

interface Props {
  war: ClientWar
}

const WarInfo = ({ war }: Props) => {
  return (
    <div className='space-y-1'>
      <VsOpponent opponent={war.opponent} />
      <div>{dateToString(new Date(war.spin_time))}</div>
      <div>
        <span>準備</span> {war.prep_time}
      </div>
      <div>
        <span>対戦</span> {war.war_time}
      </div>
    </div>
  )
}

export default WarInfo
