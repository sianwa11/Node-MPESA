const express = require("express");
const morgan = require("morgan");

const mpesaRoutes = require("./routes/mpesaRoutes");
const webhookRoutes = require("./routes/webhookRoutes");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Node-MPESA 😀" });
});

app.use("/api/", mpesaRoutes);
app.use("/hooks/", webhookRoutes);

module.exports = app;
