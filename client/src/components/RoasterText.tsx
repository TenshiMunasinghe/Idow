import { RoasterType } from '../../../src/utils/get_detailed_roaster'
import { TH_COLORS } from './Players'

interface Props {
  roaster: RoasterType
}

const RoasterText = ({ roaster }: Props) => {
  return (
    <div className='bg-gray-800 px-3 py-5 rounded w-full space-y-4'>
      {Object.keys(roaster)
        .map(key => parseInt(key))
        .sort((a, b) => b - a)
        .map(th => (
          <p className='flex flex-col space-y-1' key={'text' + th}>
            <span
              className={`font-bold text-lg ${
                TH_COLORS[th] || 'text-gray-300'
              }`}>
              TH{th}
            </span>
            {roaster[th].map(({ name }) => (
              <span key={name}>{name}</span>
            ))}
          </p>
        ))}
    </div>
  )
}

export default RoasterText
