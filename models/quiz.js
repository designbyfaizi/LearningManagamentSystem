const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizSchema = new Schema({
    cid: {
        type: Schema.Types.ObjectId,
        ref: "Class",
    },

    questions: [
        {
            type: String,
        },
    ],
    quizData: [
        {
            sid: {
                type: Schema.Types.ObjectId,
                ref: "Student",
            },
            answers: [
                {
                    type: String,
                },
            ],
            marks: [
                {
                    type: Number,
                },
            ],
            attempted: {
                type: Boolean,
            },
            total: {
                type: Number,
            },
        },
    ],
});

module.exports = mongoose.model("Quiz", quizSchema);
