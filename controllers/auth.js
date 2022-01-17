const Student = require("../models/student");
const jwt = require("jsonwebtoken");
const JWT_STUDENT_SECRET = "Students Against Studies";

exports.postStudentLogin = async (req, res, next) => {
    const {username, password} = req.body;
    try{
        const student = await Student.findOne({username});
        // If student does not exist
        if(!student){
            console.log("Invalid Username/Password");
            return res.json({
                status: "ERROR",
                message:"Invalid Username/Password"
            });
        }
        // If student exists, Check his password
        if(password !== student.password){
            console.log("Invalid Username/Password");
            return res.json({
                status: "ERROR",
                message:"Invalid Username/Password"
            });
        }

        // If password matches
        //Create JWT Token and send to Client
        const payload = {
            username: student.username,
            id: student._id
        }
        let token = jwt.sign(payload, JWT_STUDENT_SECRET, {expiresIn: '30d'});
        console.log(`${student.username} Logged In`);
        res.json({
            status: "SUCCESS",
            token,
            student
        })
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
}