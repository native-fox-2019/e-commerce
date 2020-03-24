function errorHandler (err, req, res, next) {
  if (err.name === 'SequelizeValidationError') {
    let msg = [];
    err.errors.forEach(x => {
      msg.push(x.message);
    });
    res.status(400).json({
      status: 400,
      msg
    })
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({
      status: 400,
      msg: 'Your email has already been registered'
    })
  } else if (err.name === 'BadRequestError') {
    res.status(400).json({
      status: 400,
      msg: err.message
    })
  } else if (err.name === 'NotFoundError') {
    res.status(404).json({
      status: 404,
      msg: err.message
    })
  }
  else {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = errorHandler;