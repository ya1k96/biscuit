const express = require('express')
const config = require('./server/config')

const app = config( express() )
require('./database')

app.listen( app.get('port'), () => {
    console.log('Server en port: \x1b[34m%s\x1b[0m', app.get('port'))
});
