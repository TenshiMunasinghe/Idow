import { DocumentAddIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import WarList from '../components/WarList'

const Home = () => {
  return (
    <div className='grid p-5 gap-y-5'>
      <h2 className='text-2xl mb-2 font-bold'>対戦一覧</h2>
      <Link
        to='/war/new'
        className='flex items-center justify-center space-x-1 text-violet-200 w-min ml-auto'>
        <span className='whitespace-nowrap'>新規対戦</span>
        <DocumentAddIcon className='w-5 h-5' />
      </Link>
      <WarList className='grid lg:grid-cols-2' />
    </div>
  )
}

export default Home
