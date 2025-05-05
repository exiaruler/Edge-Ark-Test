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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const teamControl = require('./controller/teamController');
const matchRoute = require('./route/fixtureRoute');
const port = process.env.PORT || 8000;
;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
function accessOrigin(origins) {
    app.use(function (req, res, next) {
        var origin = req.headers.origin;
        if (origins.indexOf(origin) > -1) {
            res.header("Access-Control-Allow-Origin", origin);
        }
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}
// cors gateway
const allowedOrigin = ["http://localhost:3000"];
app.use((0, cors_1.default)({
    origin: allowedOrigin,
    credentials: true
}));
accessOrigin(allowedOrigin);
app.use(express_1.default.json());
// monogoDB connection
const mongoUrl = "mongodb+srv://admin:123@cluster0.l6cgy.mongodb.net/edge-ark-test?retryWrites=true&w=majority&appName=Cluster0";
mongoose_1.default.connect(mongoUrl).then(() => console.log('Connected to edge-ark-test'));
function createRoute(route) {
    return "/api/" + route;
}
app.use(createRoute('fixture'), matchRoute);
wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
        const msgJson = JSON.parse(message);
        console.log(msgJson);
        var res = null;
        switch (msgJson.route) {
            case '/team/search':
                console.log(msgJson.value);
                res = yield teamControl.findTeamSearch(msgJson.value);
                break;
            default:
        }
        var msgBack = JSON.stringify(res);
        ws.send(msgBack);
    }));
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`listening on port ${port}`);
    console.log("http://localhost:" + port + "/api");
}));
