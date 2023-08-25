const { authJwt } = require("../middlewares");
const controller = require("../controllers/quiz.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/create-quiz",
    [authJwt.verifyToken],
    [authJwt.isModerator],
    controller.createQuiz
  );

  app.post(
    "/api/update-quiz",
    [authJwt.verifyToken],
    [authJwt.isModerator],
    controller.updateQuiz
  );

  app.post(
    "/api/add-quiz-question",
    [authJwt.verifyToken],
    [authJwt.isModerator],
    controller.addQuestion
  );

  app.post(
    "/api/update-quiz-question",
    [authJwt.verifyToken],
    [authJwt.isModerator],
    controller.updateQuizQuestion
  );

  app.post(
    "/api/delete-quiz",
    [authJwt.verifyToken],
    [authJwt.isModerator],
    controller.deleteQuiz
  );

  app.post(
    "/api/delete-quiz-question",
    [authJwt.verifyToken],
    [authJwt.isModerator],
    controller.deleteQuizQuestion
  );

  app.post("/api/get/quiz", [authJwt.verifyToken], controller.getQuiz);

  app.post(
    "/api/get/quiz/analyze",
    [authJwt.verifyToken],
    controller.getQuizAnalyze
  );
};
