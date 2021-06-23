import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { ChangeEvent, useContext } from 'react'
import { Player } from '../../../server/src/utils/get_detailed_war'
import { context } from '../pages/war'

interface Props {
  townHall: number
  players: Player[]
}

const TH_COLORS: { [key: number]: string } = {
  11: 'red',
  12: 'cyan',
  13: 'blue',
  14: 'yellow',
}

const Players = ({ townHall, players }: Props) => {
  const { isEditMode, roasterTags, setRoasterTags } = useContext(context)

  const isInRoaster = (tag: string) => roasterTags?.includes(tag)

  const selected = players.filter(p => isInRoaster(p.tag))

  if (!isEditMode && selected.length === 0) return null

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tag = event.target.value
    setRoasterTags(prev => {
      if (!prev) return prev
      const next = [...prev]
      if (isInRoaster(tag)) {
        const idx = next.indexOf(tag)
        next.splice(idx, 1)
      } else {
        next.push(tag)
      }
      return next
    })
  }

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`flex w-full items-center pr-3 rounded-md bg-gray-700 focus:outline-none focus:ring-1 focus:ring-violet-500 overflow-hidden`}>
            <span
              className={`font-semibold py-2 px-3 text-gray-800 bg-${
                TH_COLORS[townHall] || 'gray'
              }-300`}>
              TH{townHall}
            </span>
            <span className='px-3 py-2 bg-violet-300 text-gray-800'>
              計 {selected.length}
            </span>
            <ChevronUpIcon
              className={`${
                open ? 'transform rotate-180' : ''
              } w-5 h-5 text-gray-300 ml-auto`}
            />
          </Disclosure.Button>
          <Disclosure.Panel as='ul' className='my-2'>
            {players.map(player => (
              <li key={player.tag}>
                {isEditMode ? (
                  <>
                    <label>{player.name}</label>
                    <input
                      className='text-violet-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-violet-600 ml-2'
                      type='checkbox'
                      name={player.name}
                      value={player.tag}
                      checked={isInRoaster(player.tag)}
                      onChange={onChange}
                    />
                  </>
                ) : (
                  isInRoaster(player.tag) && <span>{player.name}</span>
                )}
              </li>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Players
