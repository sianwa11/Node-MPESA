const axios = require("axios");

exports.getAccessToken = async (req, res, next) => {
  const consumer_key = process.env.MPESA_CONSUMER_KEY;
  const consumer_secret = process.env.MPESA_CONSUMER_SECRET;
  const url = process.env.MPESA_OAUTH_URL;
  const buffer = new Buffer.from(consumer_key + ":" + consumer_secret);
  const auth = `Basic ${buffer.toString("base64")}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: auth,
      },
    });

    req.token = data["access_token"];

    return next();
  } catch (err) {
    return res.send({
      success: false,
      message: err["response"]["statusText"],
    });
  }
};

exports.showToken = (req, res, next) => {
  res.status(200).json({ token: req.token });
};

exports.lipaNaMPESA = (req, res, next) => {};
