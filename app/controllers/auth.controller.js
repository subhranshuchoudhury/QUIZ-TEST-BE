const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// * Mail Transporter

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "subhransuchoudhury00@gmail.com",
    pass: "0Zc2YJzmh7bFUEHI",
  },
});

const sendMail = async (to, subject, otp) => {
  try {
    const info = await transporter.sendMail({
      from: "' Quizzer <subhransuchoudhury00@gmail.com>'", // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: `Your Quizzer password is ${otp}`, // plain text body
      html: `<b>Your Quizzer login password is: <h3 style="color:green;">${otp}</h3>NOTE: This should kept with safety.</b>`, // html body
    });
    console.log("Message sent:", info.messageId);
    return 200;
  } catch (error) {
    console.log(error);
    return 400;
  }
};

exports.signup = async (req, res) => {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(OTP, 8),
  });

  const mailStatus = await sendMail(user.email, "🔐 Quizzer Password", OTP);

  if (mailStatus === 400) {
    res.status(500).send({ message: "Error sending OTP" });
    return;
  }

  try {
    const response = await user.save();
    if (response) {
      if (req.body.email.includes("@soa.ac.in")) {
        // const roles = Role.find({
        //   name: { $in: req.body.roles },
        // });
        // user.roles = roles.map((role) => role._id);
        // user.save().then((savedUser) => {
        //   res.send({ message: "User was registered successfully!" });
        // });

        Role.findOne({ name: "moderator" }).then((role) => {
          user.roles = [role._id];
          user.save().then((savedUser) => {
            res.send({ message: "User was registered successfully!" });
          });
        });
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
