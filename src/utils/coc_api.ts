import { parsed } from './config'

const clashApi = require('clash-of-clans-api')

const options =
  process.env.NODE_ENV === 'production'
    ? {
        token: process.env.COC_API_TOKEN_PROD,
        request: {
          proxy: process.env.FIXIE_URL,
        },
      }
    : { token: parsed?.COC_API_TOKEN_TEST }

export const cocClient = clashApi(options)
