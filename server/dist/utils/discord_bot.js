"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Discord = __importStar(require("discord.js"));
var dotenv = __importStar(require("dotenv"));
var firebase_1 = require("./firebase");
var config = dotenv.config({ path: '../config/.env' });
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
    wars: {
        action: function (message) {
            return __awaiter(this, void 0, void 0, function () {
                var wars, text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, firebase_1.db
                                .collection('roasters')
                                .where('spin_time', '<', firebase_1.toTimeStamp(new Date()))
                                .get()];
                        case 1:
                            wars = _a.sent();
                            text = wars.docs
                                .map(function (w) { return "vs " + w.data().opponent + "\nWar_ID - " + w.id; })
                                .join('\n\n');
                            message.channel.send(text);
                            return [2 /*return*/];
                    }
                });
            });
        },
        description: '対戦一覧: <War_ID>',
    },
    roasters: {
        action: function (message, args) {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); });
        },
        description: '参加メンバー一覧: <War_ID>',
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
    if (!Object.keys(commands).includes(command)) {
        message.channel.send('(そんなコマンド)ないです。');
        return;
    }
    commands[command].action(message);
});
exports.login_bot = function () { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, dcClient.login((_a = config.parsed) === null || _a === void 0 ? void 0 : _a.BOT_TOKEN)];
            case 1:
                _b.sent();
                return [3 /*break*/, 3];
            case 2:
                e_1 = _b.sent();
                console.error(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
