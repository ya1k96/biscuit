process.env.URI = 'mongodb+srv://yamil:alejandro39@cluster0-amvpj.gcp.mongodb.net/test?retryWrites=true'
const local = 'mongodb+srv://ya1k:alejandro39@cluster0-amvpj.gcp.mongodb.net/test?retryWrites=true'
let URI = process.env.URI || local
module.exports = {    
    database: {
        URI
    }
}