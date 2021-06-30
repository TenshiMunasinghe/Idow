import express from 'express'
import { cocClient } from './utils/coc_api'
import { login_bot } from './utils/discord_bot'
import { db, TimeStamp, toTimeStamp } from './utils/firebase'
import { FormattedWar, formatWar } from './utils/format_war'
import { getDetailedRoaster } from './utils/get_detailed_roaster'
import { toFirebaseWar } from './utils/to_firebase_war'

const proxy = require('express-http-proxy')

const app = express()

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export interface WarType {
  opponent: string
  spin_time: TimeStamp
  roaster: string[]
}

if (process.env.NODE_ENV === 'production') {
  app.use('/api', proxy(process.env.FIXIE_URL))
}

app.use(express.json())

app.use(express.static('client/build'))

app.listen(process.env.PORT || 5000)

app.get('/api/players', async (req, res) => {
  try {
    const snapshot = await db.collection('players').get()
    const tags = snapshot.docs.map(s => s.data().player_tag)

    const players = await getDetailedRoaster(tags)
    res.json(players)
  } catch (error) {
    res.json({ error })
  }
})

app.put('/api/player/:tag', async (req, res) => {
  const { tag } = req.params

  if (tag[0] !== '#') {
    res.status(400).json({ error: 'INVALID_TAG' })
    return
  }

  try {
    const { name } = await cocClient.playerByTag(tag)

    const collection = db.collection('players')
    const doc = await collection.where('player_tag', '==', tag).get()

    if (!doc.empty) {
      res.status(400).json({ error: 'TAG_EXISTS' })
      return
    }

    await collection.add({ player_tag: tag })

    res.json({ name })
  } catch (error) {
    console.log(error)
    if (error.statusCode === 404) {
      res.status(404).json({ error: 'INVALID_TAG' })
    } else {
      res.status(500).json({ error })
    }
  }
})

app.delete('/api/player/:tag', async (req, res) => {
  const { tag } = req.params

  if (tag[0] !== '#') {
    res.status(400).json({ error: 'INVALID_TAG' })
    return
  }

  try {
    const { name } = await cocClient.playerByTag(tag)

    const collection = db.collection('players')
    const doc = await collection.where('player_tag', '==', tag).get()

    if (doc.empty) {
      res.status(400).json({ error: 'TAG_DOES_NOT_EXIST' })
      return
    }

    await doc.docs[0].ref.delete()

    res.json({ name })
  } catch (error) {
    console.log(error)
    if (error.statusCode === 404) {
      res.status(404).json({ error: 'INVALID_TAG' })
    } else {
      res.status(500).json({ error })
    }
  }
})

app.get('/api/wars', async (req, res) => {
  try {
    const wars = await db
      .collection('wars')
      .where('spin_time', '>', toTimeStamp(new Date()))
      .get()

    res.json(wars.docs.map(d => formatWar(d.data() as WarType, d.id)))
  } catch (error) {
    res.status(500).json({ error })
  }
})

app.get('/api/war/:id', async (req, res) => {
  if (req.params.id === 'new') {
    res.json({ opponent: '', spin_time: '', roaster: [] })
    return
  }
  try {
    const war = await db.collection('wars').doc(req.params.id).get()
    const data = war.data()
    if (!data) {
      res.status(404).json({ error: 'War not found' })
      return
    }
    const formattedWar = formatWar(data as WarType, war.id)
    res.json(formattedWar)
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/api/war', async (req, res) => {
  try {
    const war = req.body as Optional<FormattedWar, 'id'>
    const newWar = await (
      await db.collection('wars').add(toFirebaseWar(war))
    ).get()
    res.json(formatWar(newWar.data() as WarType, newWar.id))
  } catch (error) {
    res.status(400).json({ error })
  }
})

app.put('/api/war/:id', async (req, res) => {
  try {
    const war = req.body as Optional<FormattedWar, 'id'>
    const updatedWar = await db
      .collection('wars')
      .doc(req.params.id)
      .update(toFirebaseWar(war))
    res.json(`Updated at ${updatedWar.writeTime.toDate().toString()}`)
  } catch (error) {
    res.status(400).json({ error })
  }
})

app.delete('/api/war/:id', async (req, res) => {
  try {
    const deleted = await db.collection('wars').doc(req.params.id).delete()
    res.json(`Deleted at ${deleted.writeTime.toDate().toString()}`)
  } catch (error) {
    res.status(400).json({ error })
  }
})
;(async () => {
  await login_bot()
})()
