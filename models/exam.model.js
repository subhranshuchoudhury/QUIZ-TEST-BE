const mongoose = require("mongoose");
const questionModel = require("./question.model");
const { Schema, model } = mongoose;

const ExamSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  questions: [questionModel.schema],
});

module.exports = model("Exam", ExamSchema);
