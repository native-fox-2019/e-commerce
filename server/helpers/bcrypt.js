const bcrypt = require("bcrypt");
const saltRounds = 9;

module.exports = {
  hashed(password) {
    return bcrypt.hashSync(password, saltRounds);
  },
  compare(password, hashed) {
    return bcrypt.compareSync(password, hashed);
  }
};
