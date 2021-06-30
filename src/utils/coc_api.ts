import { parsed } from './config'

const clashApi = require('clash-of-clans-api')

const token =
  'COC_API_TOKEN_' + (process.env.NODE_ENV === 'production' ? 'PROD' : 'TEST')

export const cocClient = clashApi({
  token: parsed ? parsed[token] : '',
})
