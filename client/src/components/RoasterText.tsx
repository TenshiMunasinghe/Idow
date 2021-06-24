import Markdown from 'markdown-to-jsx'
import { RoasterType } from '../../../server/src/utils/get_detailed_war'

interface Props {
  roaster: RoasterType
}

const RoasterText = ({ roaster }: Props) => {
  const text = Object.keys(roaster)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .map(
      th =>
        `**TH${th}**\n` +
        roaster[th].map(({ name, clan }) => `${name} @ ${clan.name}`).join('\n')
    )
    .join('\n\n')
  return (
    <div className='py-7 space-y-3'>
      <div className='bg-gray-800 px-3 py-5 rounded'>
        <Markdown>{text.replaceAll('\n', '<br/>')}</Markdown>
      </div>
      <button
        onClick={() => navigator.clipboard.writeText(text)}
        className='w-full bg-violet-700 rounded-md p-3'>
        コピー
      </button>
    </div>
  )
}

export default RoasterText
