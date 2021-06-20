import WarCard from '../components/WarCard'
import { useGetWars } from '../hooks/useGetWars'

const Home = () => {
  const { data } = useGetWars()
  return (
    <div className='grid p-5 gap-y-5'>
      <h2 className='text-3xl mb-4'>対戦一覧</h2>
      {data?.map(war => (
        <WarCard key={war.id} war={war} />
      ))}
    </div>
  )
}

export default Home
