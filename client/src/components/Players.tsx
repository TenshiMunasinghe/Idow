import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { ChangeEvent, useContext } from 'react'
import { Player } from '../../../src/utils/get_detailed_roaster'
import { context } from '../pages/war'

interface Props {
  townHall: number
  players: Player[]
}

export const TH_COLORS: { [key: number]: string } = {
  11: 'text-red-300',
  12: 'text-cyan-300',
  13: 'text-blue-300',
  14: 'text-yellow-300',
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
          <Disclosure.Button className='flex w-full max-w-2xl items-center py-2 px-4 rounded-md bg-gray-700 focus:outline-none focus:ring-1 focus:ring-violet-500 overflow-hidden'>
            <span
              className={`text-lg font-semibold ${
                TH_COLORS[townHall] || 'text-gray-300'
              }`}>
              TH{townHall}
            </span>
            <span className='text-lg ml-1 letter'>({selected.length})</span>
            <ChevronUpIcon
              className={`${
                open ? 'transform rotate-180' : ''
              } w-5 h-5 ml-auto text-gray-300`}
            />
          </Disclosure.Button>
          <Disclosure.Panel
            as='ul'
            className='my-2 px-5 divide-y-2 divide-gray-700'>
            {players.map(player => (
              <li
                key={player.tag}
                className='flex justify-between items-center py-3'>
                {isEditMode ? (
                  <>
                    <label>{player.name}</label>
                    <input
                      className='text-violet-600 w-5 h-5 rounded-sm focus:outline-none focus:ring-2 focus:ring-violet-600 ml-2'
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
