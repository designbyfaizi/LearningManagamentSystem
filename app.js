const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const cors = require("cors");

//Routes Import
const adminRoute = require('./routes/admin');
const headRoute = require('./routes/head');
const teacherRoute = require('./routes/teacher');
const studentRoute = require('./routes/student');



const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/admin", adminRoute);
app.use("/head", headRoute);
app.use("/teacher", teacherRoute);
app.use("/student", studentRoute);

app.use("*", (req, res, next) => {
    res.json({
        message: '404: Route not Found :('
    })
})

mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log("Database Connected");
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server Started! 💚");
    });
})
.catch(err => console.log(err));