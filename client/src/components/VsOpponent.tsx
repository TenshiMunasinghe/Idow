interface Props {
  opponent: string
}

const VsOpponent = ({ opponent }: Props) => {
  return (
    <div className='flex items-baseline font-bold '>
      <span className='mr-2'>vs</span>
      <h2 className='text-3xl text-violet-500'>{opponent}</h2>
    </div>
  )
}

export default VsOpponent
