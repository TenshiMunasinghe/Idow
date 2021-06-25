import { Dialog } from '@headlessui/react'
import { PencilIcon, TrashIcon } from '@heroicons/react/solid'
import ky from 'ky'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { WarType } from '../../../server/src/main'
import { FormattedWar } from '../../../server/src/utils/format_war'
import { RoasterType } from '../../../server/src/utils/get_detailed_war'
import Button from '../components/Button'
import FormGroup from '../components/FormGroup'
import LoadingIcon from '../components/LoadingIcon'
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

const currentDate = new Date().toISOString().split('.')[0] + 'Z'

export const context = createContext<Context>({
  isEditMode: false,
  roasterTags: [],
  setRoasterTags: () => {},
})

const War = () => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const war = useGetWar(id)
  const players = useGetPlayers()
  const { register, handleSubmit } = useForm<FormData>()

  const [isEditMode, setIsEditMode] = useState(id === 'new')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [roasterTags, setRoasterTags] = useState<RoasterTags>(war.data?.roaster)

  const cancelBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setRoasterTags(war.data?.roaster)
  }, [war.data?.roaster])

  const isLoading = war.isLoading || players.isLoading

  const onSubmit = useCallback(
    async (values: FormData) => {
      const spin_time = values.spin_time || war.data?.spin_time
      if (!roasterTags || !spin_time) {
        alert('マッチング時間を入力してください')
        return
      }

      const data: Omit<FormattedWar, 'id'> = {
        ...values,
        roaster: roasterTags,
        spin_time,
      }
      if (war.data?.id) {
        await ky.put(`/api/war/${war.data?.id}`, { json: data })
        history.go(0)
      } else {
        const newWar: FormattedWar = await ky
          .post('/api/war', { json: data })
          .json()
        history.push(`/war/${newWar.id}`)
      }
    },
    [roasterTags, war.data?.spin_time, war.data?.id, history]
  )

  const townHalls = useMemo(
    () =>
      players.data
        ? Object.keys(players.data)
            .map(th => parseInt(th))
            .sort((a, b) => b - a)
        : [],
    [players.data]
  )

  const deleteWar = useCallback(async () => {
    await ky.delete(`/api/war/${war.data?.id}`)
    history.push('/')
  }, [war.data?.id, history])

  return (
    <div className='p-5'>
      {isLoading && <LoadingIcon />}
      {!isLoading && war.isError && id !== 'new' && <div>無効なID</div>}
      {!isLoading && war.data && players.data && (
        <context.Provider value={{ isEditMode, roasterTags, setRoasterTags }}>
          <div className='flex mb-5 ml-auto space-x-3 justify-end'>
            {id !== 'new' && (
              <Button
                onClick={() => setIsDialogOpen(true)}
                className='bg-rose-700 text-gray-200 w-min'>
                <span className='whitespace-nowrap'>削除</span>
                <TrashIcon className='w-5 h-5' />
              </Button>
            )}
            <Button
              onClick={() => setIsEditMode(prev => !prev)}
              className={`bg-${isEditMode ? 'violet' : 'gray'}-700 text-${
                isEditMode ? 'violet' : 'gray'
              }-200 w-min`}>
              <span className='whitespace-nowrap'>編集</span>
              <PencilIcon className='w-5 h-5' />
            </Button>
          </div>

          <Dialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            initialFocus={cancelBtnRef}
            className='fixed z-10 inset-0 flex items-center justify-center'>
            <Dialog.Overlay className='fixed inset-0 opacity-50 bg-gray-900' />
            <div className='bg-rose-200 z-10 grid p-5 rounded-md items-center justify-center gap-y-2'>
              <Dialog.Title className='flex-grow text-rose-800 text-center'>
                本当に削除しますか？
              </Dialog.Title>
              <div className='flex space-x-3'>
                <Button
                  onClick={deleteWar}
                  className='bg-rose-300 text-rose-800'>
                  はい
                </Button>
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  ref={cancelBtnRef}
                  className='bg-gray-300 text-gray-800'>
                  キャンセル
                </Button>
              </div>
            </div>
          </Dialog>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
            <FormGroup
              label='対戦相手'
              type='text'
              isEditMode={isEditMode}
              register={register('opponent')}
              defaultValue={war.data.opponent}
              currentValue={war.data.opponent}
              required={true}
            />

            <FormGroup
              label='マッチング時間'
              type='datetime-local'
              isEditMode={isEditMode}
              register={register('spin_time')}
              currentValue={dateToString(new Date(war.data.spin_time))}
              min={currentDate}
              required={false}
            />

            <Roaster townHalls={townHalls} roaster={players.data} />

            {isEditMode && (
              <Button
                className='text-gray-200 bg-violet-700 w-full'
                type='submit'>
                決定
              </Button>
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
