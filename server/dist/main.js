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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var discord_bot_1 = require("./utils/discord_bot");
var firebase_1 = require("./utils/firebase");
var format_war_1 = require("./utils/format_war");
var get_detailed_war_1 = require("./utils/get_detailed_war");
var to_firebase_war_1 = require("./utils/to_firebase_war");
var app = express_1.default();
app.use(express_1.default.json());
app.listen(5000);
app.get('/api/players', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var snapshot, tags, players;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, firebase_1.db.collection('players').get()];
            case 1:
                snapshot = _a.sent();
                tags = snapshot.docs.map(function (s) { return s.data().player_tag; });
                return [4 /*yield*/, get_detailed_war_1.getDetailedRoaster(tags)];
            case 2:
                players = _a.sent();
                res.json(players);
                return [2 /*return*/];
        }
    });
}); });
app.get('/api/wars', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var wars, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, firebase_1.db
                        .collection('wars')
                        .where('spin_time', '>', firebase_1.toTimeStamp(new Date()))
                        .get()];
            case 1:
                wars = _a.sent();
                res.json(wars.docs.map(function (d) { return format_war_1.formatWar(d.data(), d.id); }));
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/war/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var war, data, formattedWar, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (req.params.id === 'new') {
                    res.json({ opponent: '', spin_time: new Date().toString(), roaster: [] });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, firebase_1.db.collection('wars').doc(req.params.id).get()];
            case 2:
                war = _b.sent();
                data = war.data();
                if (!data) {
                    res.status(404).json({ error: 'War not found' });
                    return [2 /*return*/];
                }
                formattedWar = format_war_1.formatWar(data, war.id);
                res.json(formattedWar);
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post('/api/war', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var war, newWar, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                war = req.body;
                return [4 /*yield*/, firebase_1.db.collection('wars').add(to_firebase_war_1.toFirebaseWar(war))];
            case 1: return [4 /*yield*/, (_a.sent()).get()];
            case 2:
                newWar = _a.sent();
                res.json(format_war_1.formatWar(newWar.data(), newWar.id));
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(400).json({ error: error_2 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.put('/api/war/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var war, updatedWar, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                war = req.body;
                return [4 /*yield*/, firebase_1.db
                        .collection('wars')
                        .doc(req.params.id)
                        .update(to_firebase_war_1.toFirebaseWar(war))];
            case 1:
                updatedWar = _a.sent();
                res.json("Updated at " + updatedWar.writeTime.toDate().toString());
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(400).json({ error: error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.delete('/api/war/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, firebase_1.db.collection('wars').doc(req.params.id).delete()];
            case 1:
                deleted = _a.sent();
                res.json("Deleted at " + deleted.writeTime.toDate().toString());
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(400).json({ error: error_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, discord_bot_1.login_bot()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
