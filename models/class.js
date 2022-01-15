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
    quizes: [
        {
            question: [String],
            answers: [
                {
                    sid: {
                        type: Schema.Types.ObjectId,
                        ref: "Student",
                    },
                    answer: [String],
                    marksObtained: Number,
                },
            ],
            totalmarks: {
                type: Number,
            },
        },
    ],
    assignments: [
        {
            questions: [
                {
                    question: {
                        type: String
                    },

                    marks: {
                        type: Number,
                    },
                },
            ],
            attempted: [
                {
                    studentid: {
                        type: Schema.Types.ObjectId,
                        ref: "Student",
                    },
                    answer: [String],
                },
            ],
        },
    ],
    Material: ["./materials/courseid/intro.pdf"],

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
