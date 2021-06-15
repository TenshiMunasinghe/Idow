const cocApi = require('clash-of-clans-api')

const cocConfig = require('../config/coc.json')

const cocClient = cocApi({ token: cocConfig.api_token })

const nf = cocClient.clanByTag(cocConfig.clan_tag)
