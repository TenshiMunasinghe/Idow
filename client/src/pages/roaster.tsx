import { useParams } from 'react-router-dom'
import WarInfo from '../components/WarInfo'
import { useGetWar } from '../hooks/useGetWar'

const Roaster = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useGetWar(id)

  return (
    <div className='p-5'>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !data && <div>無効なID</div>}
      {!isLoading && !isError && data && <WarInfo war={data} />}
    </div>
  )
}

export default Roaster
