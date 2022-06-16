exports.onLipaNaMpesa = (req, res, next) => {
  //TODO: FIX THIS
  console.log("-----------Received M-Pesa webhook-----------");
  // format and dump the request payload recieved from safaricom in the terminal
  console.log(prettyjson.render(req.body, options));
  console.log("-----------------------");
  let message = {
    ResponseCode: "00000000",
    ResponseDesc: "success",
  };
  // respond to safaricom servers with a success message
  res.json(message);
};
