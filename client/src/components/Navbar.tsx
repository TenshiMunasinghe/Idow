import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='full-width bg-gray-800 py-3 px-5 lg:py-4 lg:px-6'>
      <Link to='/' className='font-extrabold text-xl lg:text-2xl'>
        Idow
      </Link>
    </nav>
  )
}

export default Navbar
