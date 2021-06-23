import { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface Props extends InputHTMLAttributes<any> {
  register: UseFormRegisterReturn
}

const Input = ({ register, ...rest }: Props) => {
  return (
    <input
      className='bg-gray-200 text-gray-900 p-0 px-2 h-full rounded-sm focus:outline-none focus:ring-2 focus:ring-violet-600'
      {...register}
      {...rest}
    />
  )
}

export default Input
