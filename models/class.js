const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: {
        type: String,
        max: 40,
    },
    tid: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
    },

    students: [
        {
            sid: {
                type: Schema.Types.ObjectId,
                ref: "Student",
            },
        },
    ],
    material: ["./materials/courseid/intro.pdf"],

    result: [
        {
            studentid: {
                type: Schema.Types.ObjectId,
                ref: "Student",
            },
            GPA: {
                type: Number,
            },
        },
    ],
});

module.exports = mongoose.model("Class", classSchema);
