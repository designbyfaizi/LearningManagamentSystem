const express = require('express');
const Class = require("../models/class");
const Quiz = require("../models/quiz");
const Student = require("../models/student");
const Teacher = require("../models/teacher");

const router = express.Router();

//Show Dashboard
router.get("/", () => {})

//View Attempted Quiz (Working)
router.get("/viewattquiz", async (req, res, next) => {
    try{
        const quizzes = await Quiz.find();
        if(quizzes.length == 0){
            console.log("No Attempted Quizzes Found");
            return res.json({
                status: "ERROR",
                message: "No Attempted Quizzes Found"
            });
        }
        const attemptedQuizzes = [];
        //Extracting All Attempted Quizes
        for(let i = 0; i<quizzes.length; i++){
            for(let j = 0; j < quizzes[i].quizData.length; j++){
                if(quizzes[i].quizData[j].attempted === true){
                    attemptedQuizzes.push({
                            questions: quizzes[i].questions,
                            quizData: quizzes[i].quizData[j]
                    })
                }
            }
        }

        res.json({
            status: "SUCCESS",
            attemptedQuizzes,
        })
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})

//Add Quiz (Working)
router.post("/addquiz", async (req, res, next) => {
    //questions is array of strings
    const {cid, questions} = req.body;
    try{
        const myClass = await Class.findById(cid);

        if(!myClass){
            return res.json({
                status: "ERROR",
                message:"No Class Found."
            });
        }
        const students = myClass.students;
        const quizData = [];
        const answers = Array(students.length).fill('');
        const marks = Array(students.length).fill(0);
        for(let i = 0; i<students.length; i++){
            const sid = students[i].sid;
            quizData.push({
                sid,
                answers,
                marks,
                attempted: false,
                total: 0
            })
        }

        const quiz = new Quiz({
            cid,
            questions,
            quizData

        });
        await quiz.save();
        res.json({
            status: "SUCCESS",
            message: "Quiz Added Successfully"
        })
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})

//Download Attempted Quiz
router.get("/quiz/:id", () => {})

//Delete Quiz (Working)
router.delete("/quiz/:id", async (req, res, next) => {
    try{
        const quiz = await Quiz.findById(req.params.id);
        if(!quiz){
            return res.json({
                status: "ERROR",
                message:"Quiz does not exist!"
            })
        }
        await quiz.delete();
        res.json({
            staus:"SUCCESS",
            message:"Quiz Deleted Successfully"
        })
    }
    catch(err){
        console.log(err);
        res.send(err)
    }
})

//View Attempted Assignment
router.get("/viewattassign", () => {})

//Add Assignment
router.post("/addassign", () => {})

//Download Attempted Assignment
router.get("/assign/:id", () => {})

//Delete Assignment
router.delete("/assign/:id", () => {})

//Add Material
router.post("/addmat", () => {})

//View Material
router.get("/materials", () => {})

//Delete Material
router.delete("/material/:id", () => {})

//Add Marks
router.post("/addmarks", () => {})

//Update Marks
router.put("/marks/:id", () => {})

//Delete Marks
router.delete("/marks/:id", () => {})

module.exports = router;