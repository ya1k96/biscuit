const mongoose = require('mongoose')

mongoose.connect( require('./keys').database.URI, err => {
    if( err ){
        console.log('Error: ', err)
    }
    console.log( 'Base de datos: \x1b[34m%s\x1b[0m','on' )
},{
    useNewUrlParser: true
});