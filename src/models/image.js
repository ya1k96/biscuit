const mongoose = require('mongoose')
const { Schema } = mongoose
const path = require('path')

const imageSchema = new Schema({
    titulo: {
        type: String
    },
    descripcion: {
        type: String
    },
    archivo: {
        type: String
    },
    vistas: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    },
    fecha: {
        type: Date,
        default: Date.now()
    }
})

imageSchema.virtual( 'uniqueId' )
.get( function() {
    return this.archivo.replace( path.extname( this.archivo ), '' )
} )


module.exports = mongoose.model( 'Image', imageSchema )