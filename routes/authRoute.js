const express = require("express");
const {loginController
    ,registerController,logoutController
} = require("../controller/authController");

const router = express.Router();


//routes
router.post("/login", loginController);
router.post("/register", registerController);
router.post("/logout", logoutController);

module.exports = router;
