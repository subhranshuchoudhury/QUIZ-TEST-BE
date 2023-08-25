const db = require("../models");
const Quiz = db.quiz;
const mongoose = require("mongoose");

exports.createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz({
      name: req.body.name,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      duration: req.body.duration,
      questions: req.body.questions,
      userId: req.userId,
    });
    await quiz.save();
    res.json({ message: "Quiz created successfully" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server error" });
  }
};

exports.addQuestion = async (req, res) => {
  console.log(req.body);
  try {
    const quiz = await Quiz.findOne({
      _id: req.body.quizId,
      userId: req.userId,
    });
    quiz.questions.push(req.body.question);
    await quiz.save();
    console.log(quiz);
    res.json({ message: "Question uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server error" });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const response = await Quiz.findOneAndUpdate(
      { _id: req.body.quizId, userId: req.userId },
      {
        $set: {
          name: req.body.name,
          start_time: req.body.start_time,
          end_time: req.body.end_time,
          duration: req.body.duration,
        },
      }
    );

    if (response) res.json({ message: "Quiz updated" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server error" });
  }
};

exports.updateQuizQuestion = async (req, res) => {
  try {
    const response = await Quiz.findOneAndUpdate(
      {
        _id: req.body.quizId,
        userId: req.userId,
        "questions._id": req.body.questionId,
      },
      {
        $set: {
          "questions.$.question": req.body.question.question,
          "questions.$.options": req.body.question.options,
        },
      }
    );

    if (response) res.json({ message: "Question updated" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server error" });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndDelete({
      _id: req.body.quizId,
      userId: req.userId,
    });

    if (quiz) res.json({ message: "Quiz deleted" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server error" });
  }
};

exports.deleteQuizQuestion = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.body.quizId,
      userId: req.userId,
    });
    console.log(quiz);
    quiz.questions.pull(req.body.questionId);
    await quiz.save();
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server error" });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    // ! Change if you know what you are doing.
    // ! Dangerous

    const quizInfo = await Quiz.findById(req.body.quizId).select(
      "start_time end_time questions.question questions._id questions.options.option questions.options._id"
    );

    const questions = quizInfo.questions;
    let startExam = quizInfo.start_time;
    let endExam = quizInfo.end_time;

    if (isNaN(startExam.getTime()) || isNaN(endExam.getTime())) {
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
        res.json({ message: "Quiz not started or quiz has been ended" });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Server error" });
  }
};

exports.getQuizAnalyze = async (req, res) => {
  try {
    // * get only question and only correct option
    const quiz = await Quiz.findById(req.body.quizId).select(
      "questions._id questions.options._id questions.options.is_correct"
    );
    const correctOptionIds = quiz.questions.map((question) => {
      return {
        questionId: question._id,
        correctId: question.options
          .filter((option) => option.is_correct)
          .map((option) => option._id)[0],
      };
    });

    const userAnswer = req.body.userAnswer;

    const uniqueUserAnswers = userAnswer.filter((answer, index, array) => {
      return (
        array.findIndex((a) => a.questionId === answer.questionId) === index
      );
    });

    let score = 0;
    for (let i = 0; i < uniqueUserAnswers.length; i++) {
      let answer = uniqueUserAnswers[i];
      let question = correctOptionIds.find(
        (q) => q.questionId.toString() === answer.questionId
      );
      if (question && question.correctId.toString() === answer.correctId) {
        score++;
      }
    }

    res.json({ score });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server error" });
  }
};
