const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: { validator: (v) => validator.isEmail(v) },
    },
    password: { type: String, required: true, select: false },
    name: { type: String, required: false, minlength: 2, maxlength: 30 },
  },
  { versionKey: false }
);

module.exports = mongoose.model("user", userSchema);
