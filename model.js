
const { default: mongoose } = require("mongoose");

// creating Schima fro storing our data in mongo db
var imgModel = new mongoose.Schema({
    name:String,
    desc:String,
    img:{
        data:Buffer,
        ContentType:String
    }
},{
    timestamps:true
})
module.exports = new mongoose.model('omage',imgModel);