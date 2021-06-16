import express from 'express'
import { cocClient } from './utils/coc_api'
import { login_bot } from './utils/discord_bot'
import { db, toTimeStamp } from './utils/firebase'

const app = express()

app.use(express.json())

app.listen(5000)

app.get('/api/players', async (req, res, next) => {
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

app.post('/api/roasters', (req, res, next) => {
  const response = { ...req.body, date: toTimeStamp(new Date()) }
  db.collection('roasters').add({ response })
  res.json(response)
})
;(async () => {
  await login_bot()
})()
