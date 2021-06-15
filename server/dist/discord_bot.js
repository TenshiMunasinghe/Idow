"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = __importStar(require("discord.js"));
var dcConfig = require('../config/discord.json');
var dcClient = new Discord.Client();
var PREFIX = '!';
var commands = {
    commands: {
        action: function (message) {
            message.channel.send('__**コマンド一覧**__\n' +
                commandKeys
                    .map(function (key) { return "`!" + key + "` - " + commands[key].description; })
                    .join('\n'));
        },
        description: 'コマンド一覧',
    },
    greet: {
        action: function (message) {
            console.log('yo');
        },
        description: 'やっはろー！',
    },
};
var commandKeys = Object.keys(commands);
dcClient.on('message', function (message) {
    var _a;
    if (message.author.bot)
        return;
    if (!message.content.startsWith(PREFIX))
        return;
    var commandBody = message.content.slice(PREFIX.length);
    if (!commandBody)
        return;
    var args = commandBody.split(' ');
    var command = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (!command)
        return;
    commands[command].action(message);
});
exports.login_bot = function () { return dcClient.login(dcConfig.bot_token); };
