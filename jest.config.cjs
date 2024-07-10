/** @type {import('jest').Config} */
const config = {
  verbose: true,
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};

module.exports = config;