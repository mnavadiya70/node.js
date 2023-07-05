const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const verifyJWT = require("../../middleware/verifyJWT");
const { get, getAll, post, put, remove } = employeesController;

router.route("/").get(getAll).post(post).put(put).delete(remove);

router.route("/:id").get(get);
module.exports = router;
