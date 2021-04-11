const fs = require('fs');

module.exports.createPublicFolder = async path => {
  try {
    await fs.mkdir(path, { recursive: true });
  } catch (err) {
    console.error(err);
  }
};
