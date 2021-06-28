import { ButtonHTMLAttributes, forwardRef } from 'react'

const SIZE_MAPS = {
  lg: 'px-8 text-lg',
  md: 'px-6 text-base',
  sm: 'px-4 text-sm',
}

const COLOR_MAPS = {
  violet: 'bg-violet-700 text-violet-100 ring-violet-400',
  gray: 'bg-gray-700 text-gray-100 ring-gray-400',
  rose: 'bg-rose-700 text-rose-100 ring-rose-400',
}

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  size: keyof typeof SIZE_MAPS
  color: keyof typeof COLOR_MAPS
}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { color, size, ...attrs } = props

  return (
    <button
      {...attrs}
      ref={ref}
      className={`inline-flex items-center justify-center text-center whitespace-nowrap py-3 font-semibold rounded-md focus:outline-none focus:ring-2 ${SIZE_MAPS[size]} ${COLOR_MAPS[color]}`}>
      {props.children}
    </button>
  )
})

export default Button
