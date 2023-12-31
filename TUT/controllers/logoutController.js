const User = require("../model/User");

const handleLogout = async (req, res) => {
  //on client, also delete access token
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); //No content
  }

  const refreshToken = cookies.jwt;

  //is refresh token in db?
  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  //delete refresh token in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // secure: true - only serves on https (add in production)
  res.sendStatus(204);
};

module.exports = { handleLogout };
