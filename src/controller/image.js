const ctrl = { }
const path = require('path')
const fs = require('fs-extra')
const Imagen = require('../models/image')
const Comment = require('../models/comment')
const md5 = require('md5')
const {Schema} = require('mongoose')

ctrl.index = async (req, res) => {
    let id = req.params.id
    let imagen = await Imagen.findOne({ archivo: { $regex: id } })
    
    if( imagen ) {
        let comentarios = await Comment.find({ imagen_id: imagen._id})
        imagen.vistas++
        
        await imagen.save( )
        
        res.render('image',{ imagen, comentarios })
    } else {
        res.redirect( '/404' )
    }

}
ctrl.create = async (req, res) => {
    let archivo = req.file
    let body = req.body    
    
     let pathOriginal = archivo.path
     let name = archivo.filename
     let ext = path.extname(archivo.originalname).toLocaleLowerCase()
     let pathDest = path.resolve('src/public/upload/' + name +  ext )    

     if( ext === '.jpg' || ext === '.gif' || ext === '.png' || ext === '.jpeg') {
        await fs.rename( pathOriginal, pathDest )
        let imagen = new Imagen({
            titulo: body.title,
            descripcion: body.descripcion,
            archivo: ( name + ext )
        })

        if ( await imagen.save() ) {
            res.redirect('/image/' + name )
        }

     } else {
          await fs.unlink( pathOriginal )         
          return res.status( 500 )
             .json({
                 ok: false, 
                 message: 'Tipo de extension permitida: .jpg, .jpeg, .gif, .png'
             })
     }    
}
ctrl.like = async (req, res) => {
    // TODO
    let id = req.params.id
    let imagen = await Imagen.findOne( { archivo: { $regex: id } } )
    
    if( imagen ) {
        imagen.like ++
        await imagen.save( )
    }
    return res.json({ ok: true, likes: imagen.like})
}
ctrl.dislike = async (req, res) => {
        // TODO
        let id = req.params.id
        let imagen = await Imagen.findOne( { archivo: { $regex: id } } )
        
        if( imagen ) {
            imagen.like --
            await imagen.save( )
        }
        return res.json({ ok: true, likes: imagen.like})
}
ctrl.comment = async (req, res) => {
    let imagen = await Imagen.findOne({ archivo: {$regex: req.params.id } } )
    console.log( req.body )
    if( imagen ) {
        let comentario = new Comment( req.body )

        comentario.gravatar = md5( comentario.email )
        comentario.imagen_id = imagen._id
        
        await comentario.save()
    }

    res.send( 'body' )
}
ctrl.delete = async (req, res) => {
    let id = req.params.id
    const image = await Imagen.findOne({ archivo: { $regex: id } })

    if( image ) {
        
        let rep = await Comment.find({ imagen_id: image._id })
        console.log( rep )
        if ( rep.length > 0 ) {
            for (const item of rep ) {
                await Comment.findByIdAndDelete( item._id )
            }
        }
        image.remove()
        await fs.unlink( path.resolve( './src/public/upload' + image.archivo ) )
        
    }
}
module.exports = ctrl