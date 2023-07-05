const usersDB = {
  users: require("../model/users.json"),
  setUsers: (data) => {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  //on client, also delete access token
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); //No content
  }

  const refreshToken = cookies.jwt;

  //is refresh token in db?
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  //delete refresh token in db
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );

  res.clearCookie("jwt", { httpOnly: true }); // secure: true - only serves on https (add in production)
  res.sendStatus(204);
};

module.exports = { handleLogout };
