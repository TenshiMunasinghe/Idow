import { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  to: string
}

const War: FC<Props> = ({ children, to }) => {
  return (
    <Link
      to={to}
      className='p-2 space-y-2 border-2 border-gray-700 bg-gray-800 rounded-sm'>
      {children}
    </Link>
  )
}

export default War
