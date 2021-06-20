import { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface Props extends InputHTMLAttributes<any> {
  register: UseFormRegisterReturn
}

const Input = ({ register, ...rest }: Props) => {
  return (
    <input className='bg-gray-200 text-gray-900 p-1' {...register} {...rest} />
  )
}

export default Input
