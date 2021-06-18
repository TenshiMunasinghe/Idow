import { Box } from '@chakra-ui/react'
import { useGetWars } from '../hooks/useGetWars'

const Home = () => {
  const { data } = useGetWars()
  if (!data) return null
  console.log(data.map(war => new Date(war.spin_time)))

  return <Box>Hello Idow!</Box>
}

export default Home
