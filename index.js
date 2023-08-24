const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());
// * connect to mongodb

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/quiz");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// * models

const User = require("./models/user.model");
const Question = require("./models/question.model");
const Exam = require("./models/exam.model");

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ message: error });
  }
});

app.post("/user", (req, res) => {
  const user = new User({
    name: req.body.name,
  });
  user
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

app.post("/test", (req, res) => {
  const question = new Question({
    questions: req.body.questions,
  });
  question
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

app.post("/exam", (req, res) => {
  const exam = new Exam({
    name: req.body.name,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    duration: req.body.duration,
    questions: req.body.questions,
  });
  exam
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

app.post("/exam/question/upload", async (req, res) => {
  try {
    const examData = await Exam.findById(req.body.exam_id);
    console.log(examData);
    examData.questions.push(req.body.question);
    await examData.save();
    res.json({ message: "Question uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server error" });
  }
});

app.post("/exam/question/delete", async (req, res) => {
  try {
    const examData = await Exam.findById(req.body.exam_id);
    console.log(examData);
    examData.questions.pull(req.body.question_id);
    await examData.save();
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server error" });
  }
});

app.post("/exam/question/update", async (req, res) => {
  try {
    const response = await Exam.findOneAndUpdate(
      { _id: req.body.exam_id, "questions._id": req.body.question_id },
      {
        $set: {
          "questions.$.question": req.body.question.question,
          "questions.$.options": req.body.question.options,
        },
      }
    );

    if (response) res.json({ message: "question updated" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server error" });
  }
});

app.post("/exam/questions", async (req, res) => {
  // ! Strictly for students
  try {
    const examInfo = await Exam.findById(req.body.exam_id).select(
      "start_time end_time questions.question questions._id questions.options.option questions.options._id"
    ); // * select only required fields

    const questions = examInfo.questions;
    console.log(questions);
    let startExam = examInfo.start_time;
    let endExam = examInfo.end_time;

    if (isNaN(startExam.getTime()) || isNaN(endExam.getTime())) {
      console.log("Invalid start or end exam date.");
      res.json({ message: "UNEXPECTED: contact admin!" });
    } else {
      let currentTime = new Date();
      if (
        currentTime.getTime() > startExam.getTime() &&
        currentTime.getTime() < endExam.getTime()
      ) {
        res.json(questions);
        return;
      } else {
        res.json({ message: "Exam not started or exam has been ended" });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Server error" });
  }
});

const port = 5000 || process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
