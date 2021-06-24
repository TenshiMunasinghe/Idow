import { FC } from 'react'

interface Props {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  width?: string
}

const Button: FC<Props> = ({ onClick, type, width = 'full', children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-${width} px-4 py-3 text-lg font-semibold bg-violet-800 rounded-md`}>
      {children}{' '}
    </button>
  )
}

export default Button
