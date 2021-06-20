import CardWrapper from '../components/CardWrapper'
import WarInfo from '../components/WarInfo'
import { useGetWars } from '../hooks/useGetWars'

const Home = () => {
  const { data } = useGetWars()
  return (
    <div className='grid p-5 gap-y-5'>
      <h2 className='text-3xl mb-4'>対戦一覧</h2>
      {data?.map(w => (
        <CardWrapper key={w.id} to={`/war/${w.id}`}>
          <WarInfo war={w} />
        </CardWrapper>
      ))}
    </div>
  )
}

export default Home
