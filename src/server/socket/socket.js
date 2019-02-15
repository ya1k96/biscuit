const { io } = require('../../index')

io.on('connection', () => {
    console.log('hola')
})