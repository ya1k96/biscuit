const ctrl = {}

ctrl.npf = (req, res) => {
    res.render( 'notpagefound/404.hbs' )
}

module.exports = ctrl