function errorHandler(err, req, res, next) {
  // log the error
  console.error(err.stack)

  res.status(500)
  res.send({ msg: "Internal server error" })
}

module.exports = { errorHandler }
