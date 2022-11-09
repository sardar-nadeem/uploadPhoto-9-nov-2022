// reqiure dependence
var express=require('express')
var app = express()
var bodyparser= require('body-parser')
var fs =require('fs')
var mongoose =require('mongoose')
var path = require('path')
require('dotenv/config')
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}, (err)=>{
     console.log('Connected')

})
//setp 3 model Schama 
// setp4 step EJS file 
    app.use(bodyparser.urlencoded({extended:false}))
    app.use(bodyparser.json())
    app.set('view engine','ejs')
var multer = require('multer')
var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
        filename:(req,file,cb)=>{
            cb(null,file.name + '-' +Date.now())
        
    }
})
var uploads= multer({storage:storage});
// step 6 load the mongoose mode for image 
var imgModel = require('./model')
app.get('/',(req,res)=>{
    imgModel.find({},(err,items)=>{
        if(err) throw err
        res.render('imagePage', {items:items})
    })
})
    // step 7 show image in imagePage.js done

    // step 8 storing image 
    app.post('/', uploads.single('image'),(req,res,next)=>{
        var obj={
            name:req.body.name,
            desc:req.body.desc,
            img:{
                data: fs.readFileSync(path.join(__dirname+'/uploads/'+req.file.filename))
            }
        }
        imgModel.create(obj,(err,items)=>{
            if(err){
                console.log(err)
            }
            else{
                res.redirect("/")
            }
        })
    })
    // setep 2 confiigure server port 
    var port = process.env.PORT || '4000';
    app.listen(port,(err)=>{
        if(err) throw err
        
        console.log('server is runing on port '+port)

    })

