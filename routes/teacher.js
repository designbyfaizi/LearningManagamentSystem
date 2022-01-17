const express = require("express");
const Class = require("../models/class");
const Quiz = require("../models/quiz");
const Assignment = require("../models/assignment");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Material = require("../models/material");

const router = express.Router();

//Show Dashboard
router.get("/", () => {});

//View Attempted Quiz (Working)
router.get("/viewattquiz", async (req, res, next) => {
    try {
        const quizzes = await Quiz.find();
        const attemptedQuizzes = [];
        //Extracting All Attempted Quizes
        for (let i = 0; i < quizzes.length; i++) {
            for (let j = 0; j < quizzes[i].quizData.length; j++) {
                if (quizzes[i].quizData[j].attempted === true) {
                    attemptedQuizzes.push({
                        title: quizzes[i].quizTitle,
                        questions: quizzes[i].questions,
                        quizData: quizzes[i].quizData[j],
                    });
                }
            }
        }
        if (attemptedQuizzes.length == 0) {
            console.log("No Attempted Quizzes Found");
            return res.json({
                status: "ERROR",
                message: "No Attempted Quizzes Found",
            });
        }
        res.json({
            status: "SUCCESS",
            attemptedQuizzes,
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Add Quiz (Working)
router.post("/addquiz", async (req, res, next) => {
    //questions is array of strings
    const { cid, quizTitle, questions } = req.body;
    try {
        const myClass = await Class.findById(cid);

        if (!myClass) {
            return res.json({
                status: "ERROR",
                message: "No Class Found.",
            });
        }
        const students = myClass.students;
        const quizData = [];
        const answers = Array(students.length).fill("");
        const marks = Array(students.length).fill(0);
        for (let i = 0; i < students.length; i++) {
            const sid = students[i].sid;
            quizData.push({
                sid,
                answers,
                marks,
                attempted: false,
                total: 0,
            });
        }

        const quiz = new Quiz({
            cid,
            quizTitle,
            questions,
            quizData,
        });
        await quiz.save();
        res.json({
            status: "SUCCESS",
            message: "Quiz Added Successfully",
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Download Attempted Quiz (Working)
router.get("/quiz/:id", async (req, res, next) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            console.log("Quiz not Found");
            return res.json({
                status: "ERROR",
                message: "Quiz not Found!",
            });
        }
        res.json({
            status: "SUCCESS",
            quiz,
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Delete Quiz (Working)
router.delete("/quiz/:id", async (req, res, next) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.json({
                status: "ERROR",
                message: "Quiz does not exist!",
            });
        }
        await quiz.delete();
        res.json({
            staus: "SUCCESS",
            message: "Quiz Deleted Successfully",
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//View Attempted Assignments
router.get("/viewattassign", async (req, res, next) => {
    try {
        const assignments = await Assignment.find();
        const attemptedAssignments = [];
        //Extracting All Attempted Quizes
        for (let i = 0; i < assignments.length; i++) {
            for (let j = 0; j < assignments[i].assignmentData.length; j++) {
                if (assignments[i].assignmentData[j].attempted === true) {
                    attemptedAssignments.push({
                        questions: assignments[i].questions,
                        quizData: assignments[i].assignmentData[j],
                    });
                }
            }
        }
        if (attemptedAssignments.length == 0) {
            console.log("No Attempted Assignments Found");
            return res.json({
                status: "ERROR",
                message: "No Attempted Assignments Found",
            });
        }

        res.json({
            status: "SUCCESS",
            attemptedAssignments,
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Add Assignment (Working)
router.post("/addassign", async (req, res, next) => {
    //Questions is an Array of Strings
    const { cid, assignmentTitle, questions } = req.body;
    try {
        const myClass = await Class.findById(cid);

        if (!myClass) {
            return res.json({
                status: "ERROR",
                message: "No Class Found.",
            });
        }
        const students = myClass.students;
        const assignmentData = [];
        // const answers = Array(students.length).fill("");
        // const marks = Array(students.length).fill(0);
        for (let i = 0; i < students.length; i++) {
            const sid = students[i].sid;
            const path = `/assignments/${cid}/${assignmentTitle}/${sid}`;
            assignmentData.push({
                sid,
                path,
                attempted: false,
                total: 0,
            });
        }

        const assignment = new Assignment({
            cid,
            assignmentTitle,
            questions,
            assignmentData,
        });
        await assignment.save();
        res.json({
            status: "SUCCESS",
            message: "Assignment Added Successfully",
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Download Attempted Assignment
router.get("/assign/:id", async (req, res, next) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) {
            console.log("Assignment not Found");
            return res.json({
                status: "ERROR",
                message: "Assignment not Found!",
            });
        }
        res.json({
            status: "SUCCESS",
            assignment,
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Delete Assignment
router.delete("/assign/:id", async () => {
    try {
        const id = req.params.id;
        const assignment = await Assignment.findByIdAndDelete(id);
        res.json({
            status: "SUCCESS",
            assignment,
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Add Material
router.post("/addmat", async () => {
    try {
        const material = new Material(req.body);
        await material.save();
        res.json({
            status: "SUCCESS",
            material,
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//View Material
router.get("/materials", async () => {
    try {
        const materials = await Material.findById({});
        res.json({
            status: "SUCCESS",
            materials,
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Delete Material
router.delete("/material/:id", async () => {
    try {
        const id = req.params.id;
        const material = await Material.findByIdAndDelete(id);
        res.json({
            status: "SUCCESS",
            material,
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Add Marks
router.post("/addmarks", () => {});

//Update Marks
router.put("/marks/:id", () => {});

//Delete Marks
router.delete("/marks/:id", () => {});

module.exports = router;
