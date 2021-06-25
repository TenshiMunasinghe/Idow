import { ButtonHTMLAttributes, forwardRef } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { className, ...attrs } = props
  return (
    <button
      {...attrs}
      ref={ref}
      className={`flex items-center justify-center text-center space-x-2 px-4 py-3 font-semibold rounded-md ${className} focus:outline-none focus:ring-2 focus:ring-gray-400`}>
      {props.children}
    </button>
  )
})

export default Button
