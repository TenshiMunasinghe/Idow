import { DocumentIcon } from '@heroicons/react/solid'
import Button from '../components/Button'
import WarCard from '../components/WarCard'
import { useGetWars } from '../hooks/useGetWars'

const Home = () => {
  const { data } = useGetWars()
  return (
    <div className='grid p-5 gap-y-5'>
      <h2 className='text-3xl mb-4'>対戦一覧</h2>
      <Button as='link' to='/war/new' className='bg-gray-700 w-min ml-auto'>
        <span className='whitespace-nowrap'>新規対戦</span>
        <DocumentIcon className='w-6 h-6' />
      </Button>
      {data?.map(war => (
        <WarCard key={war.id} war={war} />
      ))}
    </div>
  )
}

export default Home
