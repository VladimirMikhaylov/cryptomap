const convict = require('convict');

const config = convict({
    API: 'https://nodes.acrylplatform.com/peers/connected'
});

module.exports = config;