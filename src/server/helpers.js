const helpers = {}
const moment = require('moment')

helpers.time_ago = fecha => {
   return moment( fecha )
   .startOf( 'minute' )
   .fromNow()
}

module.exports = helpers