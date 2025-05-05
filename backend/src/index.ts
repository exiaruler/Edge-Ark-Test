import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
require('dotenv').config();
import { WebSocketServer, WebSocket } from 'ws';
import { WSMessage } from './response/wsReceivedMsg';
const teamControl=require('./controller/teamController');
const matchRoute=require('./route/fixtureRoute');
const port = process.env.PORT || 8000;;
const app = express()
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

function accessOrigin(origins:any){
    app.use(function(req,res,next){
      var origin=req.headers.origin;
      if(origins.indexOf(origin)>-1){
        res.header("Access-Control-Allow-Origin",origin);
      }
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    })
}
// cors gateway
const allowedOrigin=["http://localhost:3000"];
  app.use(cors({
    origin: allowedOrigin,
    credentials:true
}));
accessOrigin(allowedOrigin);
app.use(express.json());
// monogoDB connection
const mongoUrl=process.env.MONGO_CONNECTION||'';
mongoose.connect(mongoUrl).then(() => console.log('Connected to edge-ark-test'));

function createRoute(route:string){
    return "/api/"+route;
}
app.use(createRoute('fixture'),matchRoute);
wss.on('connection', (ws: WebSocket) => {
  ws.on('message', async (message: string) => {
    const msgJson:WSMessage=JSON.parse(message);
    var res=null;
    switch(msgJson.route){
      case '/team/search':
        res=await teamControl.findTeamSearch(msgJson.value);
        break;
      default:
    }
    var msgBack=JSON.stringify(res);
    ws.send(msgBack);
  });

  ws.on('close', () => {
  
  });
});

server.listen(port,async() => {
    console.log(`listening on port ${port}`)
    console.log("http://localhost:"+port+"/api");
  });