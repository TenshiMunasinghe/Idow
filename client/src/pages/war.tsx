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
import { DetailedWar } from '../../../server/src/utils/get_detailed_war'
import FormGroup from '../components/FormGroup'
import Input from '../components/Input'
import Roaster from '../components/Roaster'
import { useGetPlayers } from '../hooks/useGetPlayers'
import { useGetWar } from '../hooks/useGetWar'
import { dateToString } from '../utils/dateToString'

export interface FormData extends Omit<DetailedWar, 'spin_time' | 'roaster'> {
  spin_time: Date
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

const War = () => {
  const { id } = useParams<{ id: string }>()
  const war = useGetWar(id)
  const players = useGetPlayers()
  const { register, handleSubmit } = useForm<FormData>()

  const [isEditMode, setIsEditMode] = useState(false)
  const [roasterTags, setRoasterTags] = useState<RoasterTags>(war.data?.roaster)

  useEffect(() => {
    setRoasterTags(war.data?.roaster)
  }, [war.data?.roaster])

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
      {!isLoading && !war.data && <div>無効なID</div>}
      {!isLoading && war.data && players.data && (
        <context.Provider value={{ isEditMode, roasterTags, setRoasterTags }}>
          <div
            onClick={toggleEditMode}
            className={`bg-${isEditMode ? 'violet' : 'gray'}-700 text-${
              isEditMode ? 'violet' : 'gray'
            }-200 w-min mb-5 rounded-md ml-auto p-2`}>
            <PencilIcon className='w-5 h-5' />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
            <FormGroup>
              <label>対戦相手</label>
              {isEditMode ? (
                <Input
                  register={register('opponent')}
                  defaultValue={war.data.opponent}
                />
              ) : (
                <span className='font-semibold'>{war.data.opponent}</span>
              )}
            </FormGroup>

            <FormGroup>
              <label>マッチング時間</label>
              {isEditMode ? (
                <Input type='datetime-local' register={register('spin_time')} />
              ) : (
                <span>{dateToString(new Date(war.data.spin_time))}</span>
              )}
            </FormGroup>

            <Roaster townHalls={townHalls} roaster={players.data} />

            {isEditMode && (
              <button
                type='submit'
                className='w-full px-4 py-3 text-lg font-semibold bg-violet-800 rounded-md'>
                決定
              </button>
            )}
          </form>
        </context.Provider>
      )}
    </div>
  )
}

export default War
