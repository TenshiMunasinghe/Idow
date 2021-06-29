import { Dialog } from '@headlessui/react'
import { ClipboardCopyIcon } from '@heroicons/react/solid'
import Markdown from 'markdown-to-jsx'
import { useState } from 'react'
import { RoasterType } from '../../../src/utils/get_detailed_roaster'
import Button from './Button'

interface Props {
  roaster: RoasterType
}

const RoasterText = ({ roaster }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const text = Object.keys(roaster)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .map(th => `**TH${th}**\n` + roaster[th].map(({ name }) => name).join('\n'))
    .join('\n\n')

  return (
    <div className='flex lg:block flex-col space-y-3 lg:space-y-8'>
      <p className='bg-gray-800 px-3 py-5 rounded w-full'>
        <Markdown>{text.replaceAll('\n', '<br/>')}</Markdown>
      </p>
      <Button
        color='violet'
        size='lg'
        onClick={() => {
          navigator.clipboard.writeText(text)
          setIsOpen(true)
        }}>
        <span>コピー</span>
        <ClipboardCopyIcon className='w-5 h-5' />
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='fixed z-10 inset-0 flex items-center justify-center'>
        <Dialog.Overlay className='fixed inset-0 opacity-50 bg-gray-900' />

        <div className='flex flex-col items-center justify-center bg-violet-200 w-3/5 py-4 px-6 space-y-3 rounded-md text-violet-800 z-10'>
          <Dialog.Title className='lg:text-xl text-center'>
            コピー完了！
          </Dialog.Title>
          <Button onClick={() => setIsOpen(false)} color='violet' size='lg'>
            OK
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

export default RoasterText
