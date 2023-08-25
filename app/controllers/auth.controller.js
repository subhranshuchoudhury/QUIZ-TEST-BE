const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  try {
    const response = await user.save();
    if (response) {
      if (req.body.roles) {
        Role.find(
          {
            name: { $in: req.body.roles },
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            user.roles = roles.map((role) => role._id);
            user.save((err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              res.send({ message: "User was registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }).then((role) => {
          user.roles = [role._id];
          user.save().then((savedUser) => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
    return;
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    }).populate("roles", "-__v");

    if (user) {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        username: user.username,
        name: user.name,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    } else {
      return res.status(404).send({ message: "User Not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: err });
    return;
  }
};
