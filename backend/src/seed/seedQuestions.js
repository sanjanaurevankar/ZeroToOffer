const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Question = require("../models/Question");
const questions = require("../data/questions.json");

dotenv.config();

const seedQuestions = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");

        await Question.deleteMany();
        console.log("Old Questions Deleted");

        await Question.insertMany(questions);
        console.log("Questions Seeded Successfully");

        process.exit();
    }catch(error){
        console.log(error);
        process.exit(1);

    }
};

seedQuestions();