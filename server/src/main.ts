import express from 'express'
import { cocClient } from './utils/coc_api'
import { login_bot } from './utils/discord_bot'
import { db, toTimeStamp } from './utils/firebase'
import { formatWar } from './utils/format_war'
import { War } from './utils/get_players_details'

const app = express()

interface ReqWar extends Omit<War, 'spin_time' | 'roaster'> {
  spin_time: string
  roaster: string[]
}

app.use(express.json())

app.listen(5000)

app.get('/api/players', async (req, res) => {
  const snapshot = await db.collection('players').get()
  const tags = snapshot.docs.map(s => s.data().player_tag)
  console.log(tags)

  const players: any = await Promise.all(
    tags.map(t => {
      const { name, townHallLevel, clan } = cocClient.playerByTag(t)
      return { name, townHallLevel, clan }
    })
  )
  res.json(players)
})

app.post('/api/war', (req, res) => {
  try {
    const response = req.body as ReqWar
    db.collection('wars').add({ response })
    res.json(response)
  } catch (error) {
    res.status(400).json({ error })
  }
})

app.get('/api/wars', async (req, res) => {
  const wars = await db
    .collection('wars')
    .where('spin_time', '>', toTimeStamp(new Date()))
    .get()

  res.json(wars.docs.map(d => formatWar(d.data(), d.id)))
})

app.get('/api/war/:id', async (req, res) => {
  const war = await db.collection('wars').doc(req.params.id).get()
  const data = war.data()
  if (!data) {
    res.json(404).json({ error: 'War not found' })
    return
  }
  res.json(formatWar(data, war.id))
})
;(async () => {
  await login_bot()
})()
