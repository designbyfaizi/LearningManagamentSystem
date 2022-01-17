const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name:{
    type:String
  },
  age:{
    type:Number
  },
  gender:{
    type:String,
  },
  email:{
    type:String,
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  CGPA:{
    type:Number
  },
  student_result:[{
    courseid:{
      type:String
    },
    GPA: {
      type:Number
    }
  }]
});

module.exports = mongoose.model('Student',studentSchema); 
