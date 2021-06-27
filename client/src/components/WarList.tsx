import { useGetWars } from '../hooks/useGetWars'
import LoadingIcon from './LoadingIcon'
import WarCard from './WarCard'

interface Props {
  showLoadingSpinner?: boolean
  className?: string
}

const WarList = ({ showLoadingSpinner = true, className }: Props) => {
  const { data, isLoading } = useGetWars()

  return (
    <div className={className}>
      {isLoading && showLoadingSpinner && <LoadingIcon />}
      {!isLoading && data?.map(war => <WarCard key={war.id} war={war} />)}
    </div>
  )
}

export default WarList
