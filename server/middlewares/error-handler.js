const errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    res.status(400).json(err.errors.map(el => el.message));
  } else if (err.status === 403) {
    res.status(403).json({ message: err.message });
  } else if (err.status === 404) {
    res.status(404).json({ message: err.message });
  } else if (err.status === 400) {
    res.status(400).json({ message: err.message })
  }
  res.status(500).json(err);
}

module.exports = errorHandler;