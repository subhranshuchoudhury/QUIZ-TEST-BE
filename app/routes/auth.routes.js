const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/auth/register",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  ); // register route

  app.post("/auth/login", controller.signin); // login route

  app.post("/auth/forgot-password-1", controller.forgotPasswordStageOne); // forgot password route
  app.post("/auth/forgot-password-2", controller.forgotPasswordStageTwo); // forgot password route

  // ! TEACHER ROUTES
};
