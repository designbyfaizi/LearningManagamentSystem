const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    cid: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },
    assignmentTitle:{
        type: String,
        required: true
    },
    questions: [
        {
            type: String,
        },
    ],
    assignmentData: [
        {
            sid: {
                type: Schema.Types.ObjectId,
                ref: "Student",
            },
            path:{
                type: String
            },
            attempted: {
                type: Boolean,
            },
            total: {
                type: Number,
            },
        },
    ],
});

module.exports = mongoose.model("Assignment", assignmentSchema);
