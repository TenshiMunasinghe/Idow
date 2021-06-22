import express from 'express'
import { login_bot } from './utils/discord_bot'
import { db, toTimeStamp } from './utils/firebase'
import { formatWar } from './utils/format_war'
import { DetailedWar, getPlayerDetails } from './utils/get_players_details'

const app = express()

export interface WarType extends Omit<DetailedWar, 'spin_time' | 'roaster'> {
  spin_time: string
  roaster: string[]
}

app.use(express.json())

app.listen(5000)

app.get('/api/players', async (req, res) => {
  const snapshot = await db.collection('players').get()
  const tags = snapshot.docs.map(s => s.data().player_tag)

  const players = await getPlayerDetails(tags)
  res.json(players)
})

app.post('/api/war', (req, res) => {
  try {
    const response = req.body as WarType
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
  const formattedWar = formatWar(data, war.id)
  const roaster = await getPlayerDetails(data.roaster)
  res.json({ ...formattedWar, roaster })
})
;(async () => {
  await login_bot()
})()
