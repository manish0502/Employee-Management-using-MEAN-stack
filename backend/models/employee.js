const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const EmployeeSchema = new mongoose.Schema({

  name: { type: String },

  email: { type: String, unique: true },

  position: { type: String },

  dept: { type: String  },

} ,{ timestamps: true });

EmployeeSchema.plugin(uniqueValidator);

module.exports =  mongoose.model("Employee", EmployeeSchema);