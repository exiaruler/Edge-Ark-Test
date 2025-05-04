const api=process.env.REACT_APP_API_URL;
const socketConnect=process.env.REACT_APP_API_SOCKET;
export interface HttpResponse{
    success:boolean;
    statusCode:number;
    messageResponse:string;
}
export async function fetchRequest(route:string,method:string,body=null,file:boolean=false){
    var output=null;
    try{
        const url=api+route;
        var configReq:any=config(method,file,body);
        const request=await fetch(url,configReq);
        output=await request.json();
    }catch(err){
        console.error('error occured');
      throw err;
    }
    return output;
} 

function config(method:string,file:boolean=false,object=null){
    var config:any={
      method:method.toUpperCase(),
      headers:{
        //'Content-Type': 'application/json',
        //"apikey":this.getApiKey(),
      },
    };
    if(object!=null){
        if(file){
            config={
              method:method.toUpperCase(),
              body:object,
              headers:{
                
              },
            };
        }else{
          config={
            method:method.toUpperCase(),
            headers:{
              'Content-Type': 'application/json',
              'body':JSON.stringify(object)
            },
          };
         
        }
    }
    return config;
  }
