const usersDB = {
  users: require("../model/users.json"),
  setUsers: (data) => {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }
  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) {
    return res.sendStatus(409); // Conflict
  }
  try {
    // encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //store the new user
    const newUser = {
      username: user,
      password: hashedPwd,
    };
    const users = [...usersDB.users, newUser];
    usersDB.setUsers([...users]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify([...users])
    );
    console.log([...users]);
    res.status(201).json({ message: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
