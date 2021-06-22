import groupBy from 'lodash/groupBy'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { DetailedWar } from '../../../server/src/utils/get_players_details'
import FormGroup from '../components/FormGroup'
import Input from '../components/Input'
import { useGetPlayers } from '../hooks/useGetPlayers'
import { useGetWar } from '../hooks/useGetWar'

interface FormData extends Omit<DetailedWar, 'spin_time'> {
  spin_time: Date
}

const TH_COLORS: { [key: number]: string } = {
  11: 'red',
  12: 'cyan',
  13: 'blue',
  14: 'yellow',
}

const War = () => {
  const { id } = useParams<{ id: string }>()
  const war = useGetWar(id)
  const players = useGetPlayers()
  const { register, handleSubmit } = useForm<FormData>()

  const isLoading = war.isLoading || players.isLoading

  const onSubmit = (values: FormData) => console.log(values)

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  const categorizedPlayers = useMemo(() => {
    return groupBy(war.data?.roaster, 'townHallLevel')
  }, [war.data?.roaster])

  const townHalls = Object.keys(categorizedPlayers).sort(
    (a, b) => parseInt(b) - parseInt(a)
  )

  return (
    <div className='p-5'>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !war.data && <div>無効なID</div>}
      {!isLoading && war.data && players.data && (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <FormGroup>
              <label>対戦相手</label>
              <Input register={register('opponent')} />
            </FormGroup>

            <FormGroup>
              <label>マッチング時間</label>
              <Input type='datetime-local' register={register('spin_time')} />
            </FormGroup>

            <div className='grid gap-y-3'>
              {players.data
                .sort((a, b) => b.townHallLevel - a.townHallLevel)
                .map(player => (
                  <FormGroup key={player.tag}>
                    <label>
                      <span
                        className={`text-${
                          TH_COLORS[player.townHallLevel] || 'gray'
                        }-300 mr-3`}>
                        TH{player.townHallLevel}
                      </span>
                      {player.name}
                    </label>
                    <input
                      type='radio'
                      {...register('roaster')}
                      name={player.name}
                      value={player.tag}
                    />
                  </FormGroup>
                ))}
            </div>

            <button
              type='submit'
              className='w-full px-4 py-3 text-lg font-semibold bg-violet-900 rounded'>
              決定
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default War
