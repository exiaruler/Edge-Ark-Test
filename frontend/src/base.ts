const api=process.env.REACT_APP_API_URL;
export interface HttpResponse{
  success:boolean;
  statusCode:number;
  messageResponse:string;
}
export interface WSMessage{
  route:string;
  value:string;
}
export async function fetchRequest(route:string,method:string,body=null,file:boolean=false){
    var output:HttpResponse={
      success: false,
      statusCode: 0,
      messageResponse: ""
    };
    try{
        const url=api+route;
        const configReq:any=config(method,file,body);
        const request=await fetch(url,configReq);
        output=await request.json();
    }catch(err){
        console.error('error occured');
        output.messageResponse="API error occur";
        output.statusCode=404;
    }
    return output;
} 

function config(method:string,file:boolean=false,object=null){
    var config:any={
      method:method.toUpperCase(),
      headers:{
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
