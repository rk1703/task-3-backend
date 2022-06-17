const midware = (req, res, next) => {
  console.log("middleware called");
  next();
}

module.exports = midware;
