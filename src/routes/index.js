const router  = require('express').Router()
// Archivos de controladores
const home = require('../controller/home')
const image = require('../controller/image')
const helper = require('../helpers/helpers')

module.exports = app => {
    app.get('/', home.index )
    app.get('/image/:id', image.index )

    app.post('/image', image.create )
    app.post('/image/:id/like', image.like )
    app.post('/image/:id/dislike', image.dislike )
    app.post('/image/:id/comment', image.comment )
    
    app.delete('/image/:id', image.delete )
    
    // No page found
    app.get( '/404', helper.npf )
}