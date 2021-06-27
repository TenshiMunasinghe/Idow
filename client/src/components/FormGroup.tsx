import { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import Input from './Input'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  currentValue: string
  isEditMode: boolean
  register: UseFormRegisterReturn
}

const FormGroup = ({
  isEditMode,
  label,
  currentValue,
  register,
  ...attrs
}: Props) => {
  return (
    <div className='flex flex-col space-y-2'>
      <label className='whitespace-nowrap'>{label}</label>
      {isEditMode ? (
        <Input {...attrs} register={register} />
      ) : (
        <span className='font-semibold text-2xl'>{currentValue}</span>
      )}
    </div>
  )
}

export default FormGroup
