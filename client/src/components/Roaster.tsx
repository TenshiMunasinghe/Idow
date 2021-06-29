import { memo, useContext } from 'react'
import { RoasterType } from '../../../server/src/utils/get_detailed_roaster'
import { context } from '../pages/war'
import Players from './Players'

interface Props {
  townHalls: number[]
  roaster: RoasterType
}

const Roaster = ({ townHalls, roaster }: Props) => {
  const { roasterTags } = useContext(context)

  return (
    <div className='space-y-2'>
      <label>参加メンバー</label>
      <div className='text-violet-200 font-bold text-lg'>
        計 {roasterTags?.length}
      </div>
      {townHalls.map(th => (
        <Players key={th} townHall={th} players={roaster[th]} />
      ))}
    </div>
  )
}

export default memo(Roaster)
