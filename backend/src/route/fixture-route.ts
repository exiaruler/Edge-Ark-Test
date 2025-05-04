import * as express from 'express';
import multer from 'multer';
import fs from 'fs';
import { Response } from '../response/response-interface';
const matchCont=require('../controller/fixture-controller');
const upload = multer({ dest: 'uploads/' })
const router:express.Router=express.Router();

router.post('/upload',upload.single('file'),async (req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    // validate file is a .csv
    console.log(req.file);
    var file=req.file;
    var errorOut:Response={
        success: false,
        statusCode: 400,
        messageResponse: 'Upload fail'
    };
    if(file){
        var fileName=file?.originalname;
        var fileType='.csv';
        const filePath=file?.path||'';
        if(fileName?.includes(fileType)){
            var upload:Response=await matchCont.upload(filePath);
            await removeFile(filePath);
            if(!upload.success){
                resp.status(upload.statusCode).json(upload);
            }else{ resp.json(upload);}
        }else
        {
            await removeFile(filePath);
            errorOut={
                success: false,
                statusCode: 422,
                messageResponse: 'File type is not .csv'
            };
            resp.status(errorOut.statusCode).json(errorOut);
        }
    }else resp.status(errorOut.statusCode).json(errorOut);
});
// test route to view fixtures
router.get('/fixtures',async (req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    const fixtures=await matchCont.getAllFixtures();
    resp.json(fixtures);
})
router.delete('/delete-all',async (req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    const deleteResp=await matchCont.deleteAll();
    resp.json(deleteResp);
})
function removeFile(file:string){
    var error='';
    try{

    }catch(err){

    }
    fs.unlink(file, (err) => {
        if (err) {
          console.error('Failed to delete file:', err);
        }
    });
}

module.exports = router;