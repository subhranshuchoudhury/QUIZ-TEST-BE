const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE",
  });
  next();
});

app.use(express.json());

const db = require("./app/models");
const Role = db.role;

// creating user role

const createRoles = async () => {
  Role.estimatedDocumentCount().then((count) => {
    if (count === 0) {
      new Role({
        name: "admin",
      })
        .save()
        .then((resp) => {
          console.log("--> ADMIN CREATED");
        })
        .catch((err) => {
          console.log("ERROR WHILE CREATING ADMIN");
        });

      new Role({
        name: "moderator",
      })
        .save()
        .then((resp) => {
          console.log("--> MODERATOR CREATED");
        })
        .catch((err) => {
          console.log("ERROR WHILE CREATING MODERATOR");
        });

      new Role({
        name: "user",
      })
        .save()
        .then((resp) => {
          console.log("--> USER CREATED");
        })
        .catch((err) => {
          console.log("ERROR WHILE CREATING USER");
        });
    } else {
      console.log("--> Roles already created");
    }
  });
};

db.mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log("--> Connected to database");
    createRoles();
  })
  .catch((err) => {
    console.log("--> Error connecting to database", err);
    process.exit();
  });

// routes

require("./app/routes/test.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/quiz.routes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("--> Server active on 5000");
});
