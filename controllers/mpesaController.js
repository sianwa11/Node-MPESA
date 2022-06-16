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

exports.lipaNaMPESA = async (req, res, next) => {
  const url = process.env.MPESA_STKPUSH_URL;
  const token = `Bearer ${req.token}`;

  try {
    const { data } = await axios.post(
      url,
      {
        BusinessShortCode: "174379",
        Password:
          "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",
        Timestamp: "20160216165627",
        TransactionType: "CustomerPayBillOnline",
        Amount: "1",
        PartyA: "254799863096",
        PartyB: "174379",
        PhoneNumber: "254799863096",
        CallBackURL: "https://78f3-197-231-178-123.ngrok.io/hooks/lipaNaMpesa",
        AccountReference: "Test",
        TransactionDesc: "Test",
      },
      { headers: { Authorization: token } }
    );

    return res.status(200).json({
      success: true,
      message: data,
    });
  } catch (err) {
    return res.send({
      success: false,
      message: err["response"]["statusText"],
    });
  }
};
