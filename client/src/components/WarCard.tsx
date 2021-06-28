import { FC } from 'react'
import { Link } from 'react-router-dom'
import { FormattedWar } from '../../../server/src/utils/format_war'
import { dateToString } from '../utils/dateToString'

interface Props {
  war: FormattedWar
}

const War: FC<Props> = ({ war }) => {
  return (
    <Link
      to={`/war/${war.id}`}
      className='p-2 lg:p-4 space-y-2 border-2 border-gray-700 bg-gray-800 rounded-sm'>
      <div className='space-y-1'>
        <div className='flex items-baseline font-bold '>
          <span className='mr-2'>vs</span>
          <h2 className='text-2xl text-violet-500'>{war.opponent}</h2>
        </div>{' '}
        <div>{dateToString(new Date(war.spin_time))}</div>
      </div>
    </Link>
  )
}

export default War
