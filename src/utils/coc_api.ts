import { parsed } from './config'

const clashApi = require('clash-of-clans-api')

export const cocClient = clashApi({
  token:
    process.env.NODE_ENV === 'development'
      ? parsed?.COC_API_TOKEN_TEST
      : process.env.COC_API_TOKEN,
})
