import { parsed } from './config'

const clashApi = require('clash-of-clans-api')

export const cocClient = clashApi({
  token:
    process.env.NODE_ENV === 'production'
      ? process.env.COC_API_TOKEN_PROD
      : parsed?.COC_API_TOKEN_TEST,
})
