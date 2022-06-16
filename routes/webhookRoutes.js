const express = require("express");
const webhookController = require("../controllers/webhookController");

const router = express.Router();

router.post("/lipaNaMpesa", webhookController.onLipaNaMpesa);

module.exports = router;
