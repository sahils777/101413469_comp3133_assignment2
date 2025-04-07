const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  designation: String,
  salary: Number,
  department: String,
  date_of_joining: String,
  profile_pic: String,
});

module.exports = mongoose.model("Employee", employeeSchema);
