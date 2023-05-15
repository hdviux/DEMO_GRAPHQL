const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userValidator } = require("../validator/validator");

const userControllers = {
  signup: async ({ args, ctx }) => {
    await userValidator.checksignup(args);
    const newUser = new User(args);
    return await newUser.save();
  },
  login: async ({ args, ctx }) => {
    await userValidator.checklogin(args);
    const foundAccount = await userValidator.checkloginaccount(args);
    const validPassword = await bcrypt.compareSync(
      args.password,
      foundAccount.password
    );
    if (!validPassword)
      throw new Error(
        JSON.stringify({
          password: "Sai mật khẩu",
        })
      );
    const accessToken = jwt.sign(
      { userID: foundAccount._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );
    const refreshToken = jwt.sign(
      { userID: foundAccount._id },
      process.env.REFRESH_TOKEN_SECRET
    );
    await User.findOneAndUpdate(foundAccount._id, {
      refreshToken: refreshToken,
    });
    foundAccount.refreshToken = refreshToken;

    return { User: foundAccount, accessToken, refreshToken };
  },
  logout: async ({ args, ctx }) => {
    await User.findOneAndUpdate(ctx.req.userID, {
      refreshToken: "",
    });
    return "LogOut";
  },
};

module.exports = { userControllers };
