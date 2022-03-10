const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true },
    bornAt: { type: Date, required: true },
    location: { type: {type:String}, coordinates:[]},
    about: { type: String, required: true },
    image: { type: String, required: true },
    email: { type: String, required: true },
    balance: { type: Number, required: true },
    userName: { type: String, required: true },
    gsm: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
