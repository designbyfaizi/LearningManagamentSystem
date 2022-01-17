const express = require('express');
const Class = require("../models/class");
const Student = require("../models/student");
const Teacher = require("../models/teacher");

const containsId = require("../util/containsObject");

const router = express.Router();

//Add Teacher (Working)
router.post("/addteacher", async (req, res, next) => {
    try{
        const {name, age, gender, email, salary, contact} = req.body;

        const teacher = new Teacher({
            name, age, gender, email, salary, contact
        });
        await teacher.save();

        console.log("Teacher Added");
        res.json({
            status: "SUCCESS",
        })
    }
    catch(err){
        console.log(err);
    }
});

//Add Student (Working)
router.post("/addstudent", async (req, res, next) => {
    try{
        const {name, age, gender, email, username, password} = req.body;
        const studentExists = await Student.findOne({username});
        if(studentExists){
            console.log("Username Taken");
            return res.json({
                status: "SUCCESS",
                message: "Username Taken"
            })
        }
        const student = new Student({
            name, age, gender, email, username, password,
            CGPA: 0.0,
            student_result:[]
        });
        await student.save();
        console.log("Student Added");
        res.json({
            status: "SUCCESS",
            message: "Student Added Successfully!"
        })
    }
    catch(err){
        console.log(err);
    }
});

//Add Class - (Working)
router.post("/addclass", async (req, res, next) => {
    try{
        const {name, tid} = req.body;
        const classAdded = await Class.findOne({name});
        if(classAdded){
            console.log("Class Already Added.");
            return res.json({
                status: "ERROR",
                message: "Class already Added!"
            })
        }
        const newClass = new Class({
            name,
            tid,
            students: [],
            material:[],
            result: []
        });

        await newClass.save();
        console.log("Class Added")
        res.json({
            status: "SUCCESS",
        })
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
});

//Get Classes - (Working)
router.get("/classes", async (req, res, next) => {
    try{
        const classes = await Class.find();
        if(classes.length == 0){
            return res.json({
                status: "ERROR",
                message:"No Class Added"
            })
        }

        console.log(classes);
        res.json({
            status: "SUCCESS",
            classes
        })
    }
    catch(err){
        console.log(err);
        res.send(err)
    }
});

//Get Class (Working)
router.get("/class/:id", async (req, res, next) => {
    try{
        const myClass = await Class.findById(req.params.id);

        if(!myClass){
            return res.json({
                status: "ERROR",
                message:"No Class Found."
            });
        }

        res.json({
            status: "SUCCESS",
            class: myClass
        })
    }
    catch(err){
        console.log(err);
        res.send(err)
    }
});

//Modify Class (Working)
router.put("/class/:id", async (req, res, next) => {
    try{
        const {name, tid, students, material, result} = req.body;
        const response = await Class.findByIdAndUpdate(req.params.id, {name, tid, students, material, result});

        if(!response){
            return res.json({
                status: "ERROR",
                message: "No Class Found"
            })
        }
        res.json({
            status: "SUCCESS",
        })
    }
    catch(err){
        console.log(err);
        res.send(err)
    }
});

//Assign Teacher (Working)
router.put("/assignteacher/:id", async (req, res, next) => {
    const {cid} = req.body;
    try{
        const myClass = await Class.findByIdAndUpdate(cid, {
            tid: req.params.id
        })
        if(!myClass){
            return res.json({
                status: "ERROR",
                message: "Class not Found!"
            });
        }
        res.json({
            status: "SUCCESS",
            message: "Teacher Assigned Successfully"
        })
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
});

//Assign Student (Working)
router.put("/assignstudent/:id", async (req, res, next) => {
    const {cid} = req.body;
    try{
        const student = await Student.findById(req.params.id);
        if(!student){
            return res.json({
                status: "ERROR",
                message: "Student not Found"
            })
        }
        const myClass = await Class.findById(cid);
        if(!myClass){
            return res.json({
                status: "ERROR",
                message: "Class not Found!"
            });
        }
        //Checking if student already exists in the list
        const students = myClass.students;
        const alreadyExists = containsId(req.params.id, myClass.students);
    
        if(alreadyExists){
            return res.json({
                status: "ERROR",
                message: "Student Already Exists in Class"
            })
        }
        
        const assignedStudent = {
            sid: student._id
        }
        myClass.students.push(assignedStudent);
        await myClass.save();

        res.json({
            status: "SUCCESS",
            message: "Student Assigned Successfully"
        })
    }
    catch(err){
        console.log(err)
    }
});

//Delete Class (Working)
router.delete("/class/:id", async (req, res, next) => {
    try{
        const myClass = await Class.findByIdAndDelete(req.params.id);

        if(!myClass){
            return res.json({
                status: "ERROR",
                message: "No Class Found"
            })
        }
        res.json({
            status: "SUCCESS",
            message: "Class Deleted Successfully"
        })
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
});

//Delete Teacher (Working)
router.delete("/teacher/:id", async (req, res, next) => {
    try{
        const teacher = await Teacher.findByIdAndDelete(req.params.id);

        if(!teacher){
            return res.json({
                status: "ERROR",
                message: "No Teacher Found"
            })
        }
        res.json({
            status: "SUCCESS",
            message: "Teacher Deleted Successfully"
        })
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
});

//Delete Student (Working)
router.delete("/student/:id", async (req, res, next) => {
    try{
        const student = await Student.findByIdAndDelete(req.params.id);

        if(!student){
            return res.json({
                status: "ERROR",
                message: "No Student Found"
            })
        }
        res.json({
            status: "SUCCESS",
            message: "Student Deleted Successfully"
        })
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
});

//View Students (Working)
router.get("/student", async (req, res, next) => {
    try{
        const students = await Student.find();
        console.log(students)
        if(students.length == 0){
            console.log("No Students Added");
            return res.status.json({
                status: "ERROR",
                message: "No Students Added!"
            })
        }
        res.json({
            status: "SUCCESS",
            students
        })
    } catch(err) {
        res.send(err)
    }
})

//Show Dashboard
router.get("/", async (req, res, next) => {
    try{
        const students = await Student.find();
        const classes = await Class.find();
        const teachers = await Teacher.find();

        res.json({
            status: "SUCCESS",
            data:{
                students, teachers, classes
            }
        })
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
});


module.exports = router;