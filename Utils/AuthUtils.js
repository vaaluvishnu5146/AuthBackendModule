const bcrypt = require("bcrypt");

async function hashString(data = "", rounds = 10) {
  let hashed = await bcrypt.hash(data, rounds);
  return hashed;
}

async function compareStrings(str1, str2) {
  let match = await bcrypt.compare(str1, str2);
  return match;
}

module.exports = {
  hashString,
  compareStrings,
};
