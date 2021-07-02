import { parsed } from './config'

const clashApi = require('clash-of-clans-api')

console.log(process.env.NODE_ENV)

const options =
  process.env.NODE_ENV === 'production'
    ? {
        token: process.env.COC_API_TOKEN_PROD,
      }
    : { token: parsed?.COC_API_TOKEN_TEST }

export const cocClient = clashApi(options)
