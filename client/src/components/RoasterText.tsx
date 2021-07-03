import { RoasterType } from '../../../src/utils/get_detailed_roaster'
import { TH_COLORS } from './Players'

interface Props {
  roaster: RoasterType
}

const RoasterText = ({ roaster }: Props) => {
  return (
    <p className='bg-gray-800 px-3 py-5 rounded w-full space-y-4'>
      {Object.keys(roaster)
        .map(key => parseInt(key))
        .sort((a, b) => b - a)
        .map(th => (
          <div className='flex flex-col space-y-1'>
            <span
              className={`font-bold text-lg ${
                TH_COLORS[th] || 'text-gray-300'
              }`}>
              TH{th}
            </span>
            {roaster[th].map(({ name }) => (
              <span>{name}</span>
            ))}
          </div>
        ))}
    </p>
  )
}

export default RoasterText
