const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        question:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Question",
            required:true,
        },

        solved:{
            type:Boolean,
            default:true,
        },

        favorite:{
            type:Boolean,
            default : false,
        },

        notes:{
            type:String,
            default : "",
        },

        revisionCount:{
            type:Number,
            default : 0,
        },

        lastSolvedAt:{
            type:Date,
        },
    },
    {
        timestamps:true,
    }
);

userProgressSchema.index(
    {user:1,question:1},
    {unique:true}
)

module.exports = mongoose.model("UserProgress" , userProgressSchema)