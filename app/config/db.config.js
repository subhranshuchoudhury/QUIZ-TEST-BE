require("dotenv").config();
module.exports = {
  URL: `${process.env.MONGO_URI}`,
};
