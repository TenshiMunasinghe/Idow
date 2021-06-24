import { memo, useContext } from 'react'
import { RoasterType } from '../../../server/src/utils/get_detailed_war'
import { context } from '../pages/war'
import Players from './Players'

interface Props {
  townHalls: number[]
  roaster: RoasterType
}

const Roaster = ({ townHalls, roaster }: Props) => {
  const { roasterTags } = useContext(context)

  return (
    <div className='grid gap-y-3'>
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
