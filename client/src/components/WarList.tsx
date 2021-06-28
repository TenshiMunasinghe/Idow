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
    <div className={'relative ' + className}>
      {showLoadingSpinner && (
        <div className={'absolute inset-0 flex justify-center items-center'}>
          <LoadingIcon />
        </div>
      )}
      {!isLoading && data?.map(war => <WarCard key={war.id} war={war} />)}
    </div>
  )
}

export default WarList
