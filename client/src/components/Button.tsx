import { ButtonHTMLAttributes, createElement, FC } from 'react'
import { Link } from 'react-router-dom'

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  as?: 'link' | 'button'
  to?: string
}

const Button: FC<Props> = ({
  to = '/',
  onClick,
  type,
  children,
  className,
  as = 'button',
}) => {
  const isLink = as === 'link'
  const element = isLink ? Link : 'button'
  return createElement(
    element,
    {
      type,
      onClick,
      to: to,
      className: `flex items-center justify-center text-center space-x-2 px-4 py-3 font-semibold rounded-md ${className} focus:outline-none focus:ring-2 focus:ring-gray-400`,
    },
    children
  )
}

export default Button
