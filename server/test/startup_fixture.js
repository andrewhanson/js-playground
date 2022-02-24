const luxon = require('luxon')

exports.mochaGlobalSetup = async function() {
  luxon.Settings.defaultZone = 'utc'
}