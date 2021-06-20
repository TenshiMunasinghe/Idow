import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='full-width bg-gray-800 p-3'>
      <Link to='/' className='font-extrabold text-xl'>
        Idow
      </Link>
    </nav>
  )
}

export default Navbar
