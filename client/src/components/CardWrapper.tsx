import { Link } from 'react-router-dom'
import { ClientWar } from '../hooks/useGetWars'
import WarInfo from './WarInfo'

interface Props {
  war: ClientWar
}

const War = ({ war }: Props) => {
  return (
    <Link
      key={war.id}
      to={`/roaster/${war.id}`}
      className='p-2 space-y-2 border-2 border-gray-700 bg-gray-800 rounded-sm'>
      <WarInfo war={war} />
    </Link>
  )
}

export default War
