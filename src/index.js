const Flint = require('gun-flint');
const GunElastic = require('./gun-elastic');
module.exports = Flint.register(GunElastic);
