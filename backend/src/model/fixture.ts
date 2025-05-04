import mongoose from 'mongoose';
const schemea=mongoose.Schema;
// match model storage
const fixtureSchema=new schemea({
    fixtureMid:{
        type:String,
        required:true,
        index:true
    },
    season:{
        type:Number,
        required:true
    },
    competitionName:{
        type:String
    },
    fixtureDateTime:{
        type:Date,
        required:true
    },
    fixtureRound:{
        type:Number,
        required:true
    },
    homeTeam:{
        type:schemea.Types.ObjectId,
        ref:"Team",
        required:true
    },
    awayTeam:{
        type:schemea.Types.ObjectId,
        ref:"Team",
        required:true
    }
})
const fixture=mongoose.model('Fixture',fixtureSchema);
module.exports=fixture;