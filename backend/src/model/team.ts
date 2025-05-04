import mongoose, { Schema } from 'mongoose';
const schemea=mongoose.Schema;
// team model storage
const teamSchema=new schemea({
    team:{
        type:String,
        required:true,
        index:true
    },
    fixtures:[{
        type:Schema.Types.ObjectId,
        ref:"Fixture"
    }]
})
const team=mongoose.model('Team',teamSchema);
module.exports=team;