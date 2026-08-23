const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const { verify, verifyAdmin } = require("../middleware/auth")

//post 
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

//get
router.get("/details", verify, userController.getProfile);

//patch
router.patch("/:id/set-as-admin", verify, verifyAdmin, userController.updateUserAdmin);
router.patch("/update-password", verify, userController.updatePassword);
/*router.patch("/change-password", verify, userController.changePassword);*/

module.exports = router;
