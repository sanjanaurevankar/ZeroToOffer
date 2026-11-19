const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {

        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:false,
        },
    
        title:{
            type:String,
            required:true,
        },
        platform:{
            type:String,
            default:"Leetcode",
        },
        difficulty:{
            type:String,
            enum:["Easy","Medium","Hard"],
            required:true,
        },
        topic:{
            type:String,
            required:true
        },
        pattern:{
            type:String,
        },
        company:{
            type:String,
        },
        status:{
            type:String,
            enum:["Todo","Solved","Revising"],
            default:"Todo",
        },
        revisionCount:{
            type:Number,
            default:0,
        },
        notes:{
            type:String,
        },
        link:{
            type:String,
        },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("Question",questionSchema)