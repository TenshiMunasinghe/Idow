import { parsed } from './config'

const clashApi = require('clash-of-clans-api')

export const cocClient = clashApi({
  token: parsed?.COC_API_TOKEN,
})
