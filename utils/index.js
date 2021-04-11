const fs = require('fs');

module.exports.createPublicFolder = async path => {
  await fs.mkdir(path, { recursive: true });
};
