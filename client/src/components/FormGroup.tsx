import { UseFormRegisterReturn } from 'react-hook-form'
import Input from './Input'

interface Props {
  inputType: string
  label: string
  value: string
  isEditMode: boolean
  defaultInputValue?: string | number
  register: UseFormRegisterReturn
  required: boolean
}

const FormGroup = ({
  isEditMode,
  label,
  value,
  defaultInputValue,
  register,
  inputType,
  required,
}: Props) => {
  return (
    <div className='flex space-x-2 items-end'>
      <label className='whitespace-nowrap'>{label}</label>
      {isEditMode ? (
        <Input
          type={inputType}
          register={register}
          defaultValue={defaultInputValue}
          required={required}
        />
      ) : (
        <span className='font-semibold text-2xl'>{value}</span>
      )}
    </div>
  )
}

export default FormGroup
