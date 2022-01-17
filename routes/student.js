const express = require('express');
const authController = require("../controllers/auth");
const isStudentAuth = require("../middleware/is-student-auth");
const Student = require("../models/student");

const router = express.Router();

// Student Login
router.post("/login", authController.postStudentLogin);

//Show Dashboard
router.get("/", isStudentAuth, async (req, res, next) => {
    try{
        const studentId = req.student.id;
        const student = await Student.findById(studentId);

        res.json({student})
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})

//View Quiz
router.get("/viewquiz", isStudentAuth, async (req, res, next) => {
    try{
        const studentId = req.student.id;
        res.send(studentId)
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})

//Attempt Quiz
router.get("/attemptquiz", () => {})

//View Assignment
router.get("/viewassignment", () => {})

//Submit Assignment
router.post("/submitassignment", () => {})

//View Material
router.get("/material", () => {})

//Download Material
router.get("/material/:id", () => {})

//View Grade
router.get("/result/:subid", () => {})

//View Marks
router.get("/result", () => {});


module.exports = router;