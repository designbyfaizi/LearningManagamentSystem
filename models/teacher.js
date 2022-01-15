const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
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
  salary:{
    type:Number
  },
  contact:{
    type:String
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);
