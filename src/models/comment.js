const { Schema, model } = require('mongoose')
const { ObjectId } = Schema

const comment = new Schema({
    email: { 
        type: String, 
        required: true 
    },
    nombre: {
        type: String,
        default: 'Anonim'
    },
    comentario: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    imagen_id: {
        type: ObjectId, 
        ref: 'Image'
    },
    gravatar: {
        type: String
    }
})

module.exports = model( 'Comment', comment )