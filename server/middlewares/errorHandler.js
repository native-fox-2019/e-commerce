function errorHandler (err, req, res, next) {
  console.log(err);
  res.json(err);
  // res.status(500).json({
  //   status: 500,
  //   msg: 'Internal server Error'
  // })
}

module.exports = errorHandler;