import config from './config'

const clashApi = require('clash-of-clans-api')

export const cocClient = clashApi({
  token: config?.COC_API_TOKEN,
})
