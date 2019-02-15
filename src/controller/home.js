const ctrl = { }
const Image = require('../models/image')
const Commments = require('../models/comment')
ctrl.index = async (req, res) => {

    let imagenes = await Image.find().sort({ fecha: -1 })
    let high = await Image.find()
    .sort({ vistas: -1 })
    .limit(4)
    
    let comments = await Commments.find()
    .sort({ feecha: -1 })
    .limit(4)
    
    res.render('index', { imagenes, high, comments })
}

module.exports = ctrl