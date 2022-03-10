var User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.getUser = async function (query) {
  try {
    var users = await User.find(query);
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

exports.register = async function (info) {
  try {
    const newUser = new User({
      name: info.name,
      surname: info.surname,
      age:info.age,
      bornAt:info.bornAt,
      location: info.location,
      about:info.about,
      image: info.image,
      email: info.email,
      balance:info.balance,
      userName: info.userName,
      gsm: info.gsm,
      password: CryptoJS.AES.encrypt(
        info.password,
        process.env.PASS_SECRET
      ).toString(),
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    return newUser;
  } catch (error) {
    return error;
  }
};


exports.login = async function (info) {
  try {
    let user = "";
    if (info.mail) {
      console.log(info.mail);
      user = await User.findOne({ mail: info.mail });
    } else if (info.gsm) {
      console.log(info.mail);
      user = await User.findOne({ gsm: info.gsm });
    }
    if (!user) {
      return "wrong mail or gsm";
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    );
    if (hashedPassword.toString(CryptoJS.enc.Utf8) == null) {
      console.log("hash null");
      return "null hash";
    }
    const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (Originalpassword != info.password) {
      return "Wrong Pass";
    } else {
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
          isBusinness: user.isBusinness,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );
      const { password, ...others } = user._doc;
      const data = { ...others, accessToken };
      return data;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

exports.update = async function (userId, info) {
  try {
    if (info.password) {
      info.password = CryptoJS.AES.encrypt(
        info.password,
        process.env.PASS_SECRET
      ).toString();
    }
    const updatedUser = User.findByIdAndUpdate(
      userId,
      { $set: info },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    return error;
  }
};

exports.delete = async function (userId){
    try {
        var deletedUser = User.findByIdAndDelete(userId);
        return deletedUser;
    } catch (error) {
        return error;
    }
}
