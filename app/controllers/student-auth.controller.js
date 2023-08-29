const config = require("../config/auth.config");
const db = require("../models");
const Student = db.student;
const Role = db.role;
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.studentRegister = async (req, res) => {
  // ! TESTING

  res.status(200).json({ message: "working" });
};

exports.studentRegisterTesting = async (req, res) => {
  try {
    const student = new Student({
      name: req.body.name,
      email: req.body.email,
      regdNo: req.body.regdNo,
      password: bcrypt.hashSync(req.body.password, 8),
      section: req.body.section,
      branch: req.body.branch,
      semester: req.body.semester,
      admissionYear: req.body.admissionYear,
      gender: req.body.gender,
      verified: req.body.verified,
      allowed: req.body.allowed,
      phone: req.body.phone,
      primaryPhone: req.body.primaryPhone,
      secondaryPhone: req.body.secondaryPhone,
      dateOfBirth: req.body.dateOfBirth,
    });

    try {
      const roles = await Role.find({
        name: { $in: "user" },
      });
      student.roles = roles.map((role) => role._id);
      student.save().then((user) => {
        res.send({ message: "Account registered successfully!" });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.studentLogin = async (req, res) => {
  const { regdNo, password } = req.body;
  try {
    const student = await Student.findOne({
      regdNo,
    }).populate("roles", "-__v");

    if (student) {
      const passwordIsValid = bcrypt.compareSync(password, student.password);

      if (!student.verified) {
        return res.status(301).send({
          accessToken: null,
          message: "Account not verified!",
        });
      }

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: student.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < student.roles.length; i++) {
        authorities.push("ROLE_" + student.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        name: student.name,
        email: student.email,
        roles: authorities,
        accessToken: token,
      });
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
    return;
  }
};
