const mongoose = require("mongoose");

const materialSchema = mongoose.Schema({
  name: String,
  category: String,
  class: {
    type: String
  },
  teacher: {
    type: String
  },
  filePath:{
    type: String
  }
});

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
