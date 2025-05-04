import {Response} from './response-interface';

function newResponse():Response{
    const response:Response={
        success: false,
        statusCode: 200,
        messageResponse: ""
    };
    return response;
}
module.exports={
    newResponse
}