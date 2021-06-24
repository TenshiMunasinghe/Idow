import { DocumentIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import WarCard from '../components/WarCard'
import { useGetWars } from '../hooks/useGetWars'

const Home = () => {
  const { data } = useGetWars()
  return (
    <div className='grid p-5 gap-y-5'>
      <h2 className='text-3xl mb-4'>対戦一覧</h2>
      <Link
        to='/war/new'
        className='flex space-x-2 bg-gray-700 rounded-md w-min ml-auto p-2'>
        <span className='whitespace-nowrap'>新規対戦</span>
        <DocumentIcon className='w-6 h-6' />
      </Link>
      {data?.map(war => (
        <WarCard key={war.id} war={war} />
      ))}
    </div>
  )
}

export default Home
