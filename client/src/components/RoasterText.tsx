import { Dialog } from '@headlessui/react'
import Markdown from 'markdown-to-jsx'
import { useState } from 'react'
import { RoasterType } from '../../../server/src/utils/get_detailed_war'

interface Props {
  roaster: RoasterType
}

const RoasterText = ({ roaster }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

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
      <p className='bg-gray-800 px-3 py-5 rounded'>
        <Markdown>{text.replaceAll('\n', '<br/>')}</Markdown>
      </p>
      <button
        onClick={() => {
          navigator.clipboard.writeText(text)
          setIsOpen(true)
        }}
        className='w-full bg-violet-700 rounded-md p-3'>
        コピー
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='fixed z-10 inset-0 flex items-center justify-center'>
        <Dialog.Overlay className='fixed inset-0 opacity-50 bg-gray-900' />

        <div className='flex flex-col items-center justify-center bg-violet-200 w-3/5 py-4 px-6 space-y-3 rounded-md text-violet-800 z-10'>
          <Dialog.Title>コピー完了！</Dialog.Title>
          <button
            onClick={() => setIsOpen(false)}
            className='bg-violet-300 py-1 w-full rounded'>
            OK
          </button>
        </div>
      </Dialog>
    </div>
  )
}

export default RoasterText
