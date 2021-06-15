"use strict";
var cocApi = require('clash-of-clans-api');
var cocConfig = require('../config/coc.json');
var cocClient = cocApi({ token: cocConfig.api_token });
var nf = cocClient.clanByTag(cocConfig.clan_tag);
