exports.testAuth = (req, res) => {
  res.json({ message: "Fine" });
};

exports.testAuthTwo = (req, res) => {
  console.log(req.ip);
  res.json({ IP: req.ip });
};
