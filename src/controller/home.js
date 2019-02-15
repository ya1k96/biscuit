const ctrl = { }
const Image = require('../models/image')

ctrl.index = async (req, res) => {
    let imagenes = await Image.find().sort({ fecha: -1 })
    res.render('index', { imagenes })
}

module.exports = ctrl