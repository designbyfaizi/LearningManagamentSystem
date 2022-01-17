const jwt = require('jsonwebtoken');

const JWT_STUDENT_SECRET = "Students Against Studies";

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, JWT_STUDENT_SECRET);
        // decode will contain username and id of student
        req.student = decode;
        next();
    }
    catch(err){
        console.log(err);
        if(err.name == 'TokenExpiredError'){
            res.status(401).json({
                status: "ERROR",
                message: 'Token Expired!'
            });

        }
        else{
            res.status(400).json({
                status: "ERROR",
                message: 'Authentication Failed!',
                error: err
            });

        }
    }
}