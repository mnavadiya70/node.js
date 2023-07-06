const Employee = require("../model/Employee");

const getAll = async (req, res) => {
  const employees = await Employee.find();
  if (!employees) return res.status(204).json({ message: "No employees" });
  res.json(employees);
};

const get = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "ID is required" });
  const employee = await Employee.findOne({
    _id: req.params.id,
  }).exec();
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee Id ${req.params.id} not found` });
  }
  res.json(employee);
};

const post = async (req, res) => {
  if (!req.body.firstname || !req.body.lastname) {
    return res
      .status(400)
      .json({ message: "Firstname and Lastname are required" });
  }
  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

const put = async (req, res) => {
  if (!req.body.id) return res.status(400).json({ message: "ID is required" });
  const employee = await Employee.findOne({
    _id: req.body.id,
  }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches Id ${req.body.id}` });
  }
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  const result = employee.save();
  res.status(201).json(result);
};

const remove = async (req, res) => {
  if (!req.body.id) return res.status(400).json({ message: "ID is required" });
  const employee = await Employee.findOne({
    _id: req.body.id,
  }).exec();
  if (!employee) {
    return res
      .status(400)
      .json({ message: `No employee matched Id ${req.body.id}` });
  }

  const result = await Employee.deleteOne({ _id: req.body.id });
  res.status(201).json(result);
};

module.exports = { getAll, get, post, put, remove };
