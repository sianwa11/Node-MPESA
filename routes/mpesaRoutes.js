const express = require("express");

const mpesaController = require("../controllers/mpesaController");

const router = express.Router();

router.get(
  "/get-token",
  mpesaController.getAccessToken,
  mpesaController.showToken
);

router.post(
  "/lipaNaMPESA",
  mpesaController.getAccessToken,
  mpesaController.lipaNaMPESA
);

module.exports = router;
