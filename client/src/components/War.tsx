import { Link } from 'react-router-dom'
import { ClientWar } from '../hooks/useGetWars'

interface Props {
  war: ClientWar
}

const War = ({ war }: Props) => {
  const date = new Date(war.spin_time)

  return (
    <Link
      key={war.id}
      to={`/roaster/${war.id}`}
      className='grid p-2 gap-y-2 border-2 border-gray-700 bg-gray-800 rounded-sm'>
      <div className='flex items-baseline'>
        <span className='mr-2'>vs</span>
        <h3 className='text-2xl'>{war.opponent}</h3>
      </div>
      <div>
        {date.getMonth()}月{date.getDay()}日{' '}
        {String(date.getHours()).padStart(2, '0')}:
        {String(date.getMinutes()).padStart(2, '0')}
      </div>
      <div>準備 {war.prep_time}</div>
      <div>対戦 {war.war_time}</div>
    </Link>
  )
}

export default War
