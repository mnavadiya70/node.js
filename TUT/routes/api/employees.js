const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const verifyJWT = require("../../middleware/verifyJWT");
const { get, getAll, post, put, remove } = employeesController;
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(getAll)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), post)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), put)
  .delete(verifyRoles(ROLES_LIST.Admin), remove);

router.route("/:id").get(get);
module.exports = router;
