const express = require("express");
const { summaryController, paragraphController } = require("../controller/tryAiController");
const router = express.Router();



router.post("/summary", summaryController);
router.post("/paragraph", paragraphController);



module.exports = router