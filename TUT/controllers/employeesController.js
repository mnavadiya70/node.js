const data = {
  employees: require("../data/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAll = (req, res) => {
  res.json(data.employees);
};

const get = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee Id ${req.params.id} not found` });
  }
  res.json(employee);
};

const post = (req, res) => {
  const emp = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!emp.firstname || !emp.lastname) {
    return res
      .status(400)
      .json({ message: "Firstname and Lastname are required" });
  }
  data.setEmployees([...data.employees, emp]);
  res.json(data.employees);
};

const put = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee Id ${req.body.id} not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const filteredArray = data.employees.filter(
    (x) => x.id !== parseInt(req.body.id)
  );
  const newArray = [...filteredArray, employee];
  data.setEmployees(newArray);
  res.json(data.employees);
};

const remove = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee Id ${req.body.id} not found` });
  }
  const filteredArray = data.employees.filter(
    (x) => x.id !== parseInt(req.body.id)
  );
  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};

module.exports = { getAll, get, post, put, remove };
