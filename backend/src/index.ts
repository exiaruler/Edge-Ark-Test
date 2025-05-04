import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import expressWs from 'express-ws';
import teamSocket from './socket/teamSocket';
const matchRoute=require('./route/fixture-route');
const port = process.env.PORT || 8000;;
const app = express()
//const wsInstance=expressWs(app);
expressWs(app);
//const app = expressWs(express()).app;
//const { app: wsApp, getWss } = wsInstance;

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
const mongoUrl="mongodb+srv://admin:123@cluster0.l6cgy.mongodb.net/edge-ark-test?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoUrl).then(() => console.log('Connected to edge-ark-test'));

function createRoute(route:string){
    return "/api/"+route;
}
app.use(createRoute('fixture'),matchRoute);
const router = express.Router();
//wsInstance.app.use('/ws',teamSocket);
//app.use('/ws', teamSocket);
app.listen(port,async() => {
    console.log(`listening on port ${port}`)
    console.log("http://localhost:"+port+"/api");
  });