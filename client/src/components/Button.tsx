import { ButtonHTMLAttributes, forwardRef } from 'react'

const SIZE_MAPS = {
  lg: 'px-8 text-lg',
  md: 'px-6 text-base',
  sm: 'px-4 text-sm',
}

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  color: 'violet' | 'gray' | 'rose'
  size: 'lg' | 'sm' | 'md'
}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { color, size, ...attrs } = props

  return (
    <button
      {...attrs}
      ref={ref}
      className={`inline-flex items-center justify-center text-center whitespace-nowrap py-3 font-semibold rounded-md focus:outline-none focus:ring-2 ${SIZE_MAPS[size]} bg-${color}-700 text-${color}-100 ring-${color}-400`}>
      {props.children}
    </button>
  )
})

export default Button
