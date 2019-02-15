const path = require('path')
const hbsex = require('express-handlebars')
const logger = require('morgan')
const multer = require('multer')
const express = require('express')
const routes = require('../routes/index')
const errorHandler = require('errorhandler')

module.exports = app => {
    // Settings PORT
    app.set('port',  process.env.PORT || 3000 )

    // Middlewares
    app.use( logger('dev') )
    app.use( multer({ dest: path.join( __dirname, '../public/upload/temp' ) }).single('image') )
    app.use( express.urlencoded( { extended: false } ) )
    app.use( express.json() )

    // Set views 
    app.set('views', path.join( __dirname , '../views' ) )
    app.engine( '.hbs', hbsex({
        defaultLayout: 'main',
        partialsDir: path.join( app.get('views'), 'partials' ),
        layoutsDir: path.join( app.get('views'), 'layouts' ),
        extname: '.hbs',
        helpers:  require('./helpers')
    }))
    app.set( 'view engine', '.hbs' )
    
    // Routes 
    routes( app )

    // Static files
    app.use( '/public', express.static( path.join( __dirname, '../public' ) ) )

    // Error handlers
    if( 'development' === app.get( 'dev' ) ) {
        app.use( errorHandler )
    }
    
    return app
}