"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_bot = void 0;
var axios_1 = __importDefault(require("axios"));
var Discord = __importStar(require("discord.js"));
var config_1 = __importDefault(require("./config"));
var get_detailed_roaster_1 = require("./get_detailed_roaster");
var presence_check_1 = require("./presence_check");
var dcClient = new Discord.Client();
var PREFIX = '!';
var handleWar = function (message, args) { return __awaiter(void 0, void 0, void 0, function () {
    var war, data, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!args || args.length === 0) {
                    message.channel.send('War_IDを入力してください\n例: `!roaster <War_ID>`');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, axios_1.default.get("/api/war/" + args[0])];
            case 1:
                war = _c.sent();
                data = war.data;
                if (!war || !data) {
                    message.channel.send('(そんなWar_IDは)ないです。');
                    return [2 /*return*/];
                }
                _a = [__assign({}, data)];
                _b = {};
                return [4 /*yield*/, get_detailed_roaster_1.getDetailedRoaster(data.roaster)];
            case 2: return [2 /*return*/, __assign.apply(void 0, _a.concat([(_b.roaster = _c.sent(), _b)]))];
        }
    });
}); };
var handlePlayers = function (message, option, args) { return __awaiter(void 0, void 0, void 0, function () {
    var invalidTags, requestHandler_1, promises, response, succeeded, errorred, erroredText, succeededText, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!args) {
                    message.channel.send('登録するプレイヤーを入力してください。');
                    return [2 /*return*/];
                }
                invalidTags = args.filter(function (tag) { return tag[0] !== '#'; });
                if (invalidTags.length > 0) {
                    message.channel.send('無効なタグがありました。\n' + invalidTags.join('\n'));
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                requestHandler_1 = option === 'add' ? axios_1.default.put : axios_1.default.delete;
                promises = args.map(function (tag) { return __awaiter(void 0, void 0, void 0, function () {
                    var data, _a, response_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, requestHandler_1("/api/player/" + tag.replace('#', '%23'))];
                            case 1:
                                data = (_b.sent()).data;
                                return [2 /*return*/, __assign(__assign({}, data), { tag: tag })];
                            case 2:
                                _a = _b.sent();
                                response_1 = _a.response;
                                return [2 /*return*/, __assign(__assign({}, response_1.data), { tag: tag })];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(promises)];
            case 2:
                response = _a.sent();
                succeeded = response.filter(function (res) { return !res.error; });
                errorred = response.filter(function (res) { return res.error; });
                erroredText = errorred.length > 0
                    ? '無効なタグがありました。\n' +
                        errorred.map(function (e) { return e.tag; }).join('\n') +
                        '\n\n'
                    : '';
                succeededText = succeeded.length > 0
                    ? succeeded.length + "\u4EBA\u3092" + (option === 'add' ? '追加' : '削除') + "\u3057\u307E\u3057\u305F\u3002\n" + succeeded.map(function (a) { return a.name; }).join('\n')
                    : '';
                message.channel.send(erroredText + succeededText);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
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
                var wars, text, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios_1.default.get('/api/wars')];
                        case 1:
                            wars = _a.sent();
                            text = wars.data
                                .map(function (w) { return "vs `" + w.opponent + "`\nWar_ID - `" + w.id + "`"; })
                                .join('\n\n');
                            message.channel.send(text);
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            console.error(e_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        description: '対戦一覧: `<War_ID>`',
    },
    roaster: {
        action: function (message, args) {
            return __awaiter(this, void 0, void 0, function () {
                var war, roaster;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, handleWar(message, args)];
                        case 1:
                            war = _a.sent();
                            if (!war || !war.roaster)
                                return [2 /*return*/];
                            roaster = Object.keys(war.roaster)
                                .sort(function (a, b) { return parseInt(b) - parseInt(a); })
                                .map(function (th) {
                                return "**TH" + th + "**\n" +
                                    war.roaster[th]
                                        .map(function (_a) {
                                        var name = _a.name, clan = _a.clan;
                                        return name + " @ " + clan.name;
                                    })
                                        .join('\n');
                            })
                                .join('\n\n');
                            message.channel.send("vs **" + war.opponent + "**\n\n" + roaster);
                            return [2 /*return*/];
                    }
                });
            });
        },
        description: '参加メンバー一覧: `<War_ID>`',
    },
    add: {
        action: function (message, args) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    handlePlayers(message, 'add', args);
                    return [2 /*return*/];
                });
            });
        },
        description: 'プレイヤーを登録: <Player_Tag>...',
    },
    remove: {
        action: function (message, args) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    handlePlayers(message, 'remove', args);
                    return [2 /*return*/];
                });
            });
        },
        description: 'プレイヤーの登録を削除: <Player_Tag>...',
    },
    idow: {
        action: function (message, args) {
            return __awaiter(this, void 0, void 0, function () {
                var war, absentPlayers, absentCount, text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, handleWar(message, args)];
                        case 1:
                            war = _a.sent();
                            if (!war || !war.roaster)
                                return [2 /*return*/];
                            absentPlayers = presence_check_1.presenceCheck(war.roaster);
                            absentCount = absentPlayers.length;
                            text = absentCount === 0
                                ? '全員集合してます！'
                                : absentPlayers
                                    .map(function (p) { return "`" + p.name + "`@`" + p.clan.name + "`"; })
                                    .join('\n') + ("\n\n**" + absentCount + "\u4EBA**\u3044\u306A\u3044\u3067\u3059\u3002");
                            message.channel.send("vs **" + war.opponent + "**\n\n" + text);
                            return [2 /*return*/];
                    }
                });
            });
        },
        description: '移動確認',
        //TODO: add player and filter possible errors eg: extra space, missing '#'
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
    commands[command].action(message, args);
});
var login_bot = function () { return __awaiter(void 0, void 0, void 0, function () {
    var e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, dcClient.login(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.BOT_TOKEN)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.error(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login_bot = login_bot;
