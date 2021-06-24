import { PencilIcon } from '@heroicons/react/solid'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { WarType } from '../../../server/src/main'
import { FormattedWar } from '../../../server/src/utils/format_war'
import { RoasterType } from '../../../server/src/utils/get_detailed_war'
import FormGroup from '../components/FormGroup'
import Roaster from '../components/Roaster'
import RoasterText from '../components/RoasterText'
import { useGetPlayers } from '../hooks/useGetPlayers'
import { useGetWar } from '../hooks/useGetWar'
import { dateToString } from '../utils/dateToString'

export interface FormData extends Omit<WarType, 'spin_time'> {
  spin_time: string
}

// like:
//  {
//   '11': ['#htrhst', ...],
//   '12': ['fdgfgfa',...]
//  }
type RoasterTags = string[] | undefined

interface Context {
  isEditMode: boolean
  roasterTags: RoasterTags
  setRoasterTags: Dispatch<SetStateAction<RoasterTags>>
}

export const context = createContext<Context>({
  isEditMode: false,
  roasterTags: [],
  setRoasterTags: () => {},
})

const newWar: Omit<FormattedWar, 'id'> = {
  opponent: '',
  spin_time: '',
  roaster: [],
}

const War = () => {
  const { id } = useParams<{ id: string }>()
  const war = useGetWar(id)
  const players = useGetPlayers()
  const { register, handleSubmit } = useForm<FormData>()

  const [isEditMode, setIsEditMode] = useState(false)
  const [roasterTags, setRoasterTags] = useState<RoasterTags>(war.data?.roaster)

  const warData = id === 'new' ? newWar : war.data

  useEffect(() => {
    setRoasterTags(warData?.roaster)
  }, [warData?.roaster])

  const isLoading = war.isLoading || players.isLoading

  const onSubmit = (values: FormData) => console.log(values)

  const townHalls = useMemo(
    () =>
      players.data
        ? Object.keys(players.data)
            .map(th => parseInt(th))
            .sort((a, b) => b - a)
        : [],
    [players.data]
  )

  const toggleEditMode = () => setIsEditMode(prev => !prev)

  return (
    <div className='p-5'>
      {isLoading && <div>Loading...</div>}
      {!isLoading && war.isError && id !== 'new' && <div>無効なID</div>}
      {!isLoading && warData && players.data && (
        <context.Provider value={{ isEditMode, roasterTags, setRoasterTags }}>
          <div
            onClick={toggleEditMode}
            className={`bg-${isEditMode ? 'violet' : 'gray'}-700 text-${
              isEditMode ? 'violet' : 'gray'
            }-200 w-min mb-5 rounded-md ml-auto p-2`}>
            <PencilIcon className='w-5 h-5' />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
            <FormGroup
              label='対戦相手'
              inputType='text'
              isEditMode={isEditMode}
              register={register('opponent')}
              defaultInputValue={warData.opponent}
              value={warData.opponent}
            />

            <FormGroup
              label='マッチング時間'
              inputType='datetime-local'
              isEditMode={isEditMode}
              register={register('spin_time')}
              value={dateToString(new Date(warData.spin_time))}
            />

            <Roaster townHalls={townHalls} roaster={players.data} />

            {isEditMode && (
              <button
                type='submit'
                className='w-full px-4 py-3 text-lg font-semibold bg-violet-800 rounded-md'>
                決定
              </button>
            )}
          </form>
          <RoasterText
            roaster={Object.keys(players.data).reduce((obj, th) => {
              const playerDetails = players.data[th].filter(player =>
                roasterTags?.includes(player.tag)
              )
              if (playerDetails.length === 0) return obj

              obj[th] = players.data[th].filter(player =>
                roasterTags?.includes(player.tag)
              )
              return obj
            }, {} as RoasterType)}
          />
        </context.Provider>
      )}
    </div>
  )
}

export default War
