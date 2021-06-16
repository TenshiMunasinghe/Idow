import * as dotenv from 'dotenv'

const clashApi = require('clash-of-clans-api')

const config = dotenv.config({ path: '../config/.env' })

export const cocClient = clashApi({
  token: config.parsed?.COC_API_TOKEN,
})
