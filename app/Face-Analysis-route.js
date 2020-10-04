const Face_analysis_model = require('../models/Face-Analysis-model')
var upload_middleware  = require('jquery-file-upload-middleware')
var Train = require('./Train')
var bodyParser = require('body-parser');
var fs = require('fs')

module.exports = function(app,path,multer,express) {

    var folder = ''

    app.post('/Ajax_Get_Filiere', (req, res) => {
        Face_analysis_model.Get_Filiere(res)
        })
        
    app.post('/Ajax_Get_Classe', (req, res) => {
        Face_analysis_model.Get_Classe(req,res)
        })
                
    app.get('/Ajax_Load_EtudiantsOfClasse', (req, res) => {
        Face_analysis_model.Load_EtudiantsOfClasse(req,res)
        })

    app.post('/Train', (req, res) => {
        
        Train(req,res,Face_analysis_model.Get_etudiant_labels(req,res))
        })

        // Set The Storage Engine
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, folder)
          },
        filename: function(req, file, cb){
            cb(null,file.originalname);
        }
    });
  // Init Upload
    const upload = multer({
        storage: storage,
        limits:{fileSize: 1000000},
        fileFilter: function(req, file, cb){
        checkFileType(file, cb);
        }
    }).single('test[]');
  
          // Check File Type
     function checkFileType(file, cb){
        // Allowed ext
        const filetypes = /jpeg|jpg|png|gif/;
        // Check ext
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(file.mimetype);
    
        if(mimetype && extname){
        return cb(null,true);
        } else {
        cb('Error: Images Only!');
        }
  }

  app.delete('/toto', (req, res) => {

        fs.unlinkSync('store/Classes/'+req.query.classe+'/EtudiantsImages/'+req.query.id)
        res.send({"success":true})
    })

    app.post('/toto', (req, res) => {
        if(!fs.existsSync(folder)){
            fs.mkdirSync(folder, { recursive: true })
        }

        upload(req, res, (err) => {
            if(err){
            res.send(err); 
            } else {
            if(req.file == undefined){
                res.send(undefined);
            } else {
                res.send({"files": [
                    {
                        "name": req.file.filename,
                        "size": req.file.size,
                        "url": "http://localhost:8080/store/Classes/"+req.query.classe+"/EtudiantsImages/"+req.query.id+"/"+req.file.filename,
                        "deleteUrl": "http://localhost:8080/toto/?classe="+req.query.classe+"&id="+req.query.id+"/"+req.file.filename,
                        "deleteType": "DELETE"
                    }]  
                })
    
            }
            }
        });
        });


app.get('/toto', function(req, res, next){

    upload_middleware.fileHandler({
        uploadDir: function () {
            folder = './store/Classes/'+req.query.classe+'/EtudiantsImages/'+req.query.id
            return './store/Classes/'+req.query.classe+'/EtudiantsImages/'+req.query.id
        },
        uploadUrl: function () {
            return '/store/Classes/'+req.query.classe+'/EtudiantsImages/'+req.query.id
        }
    })(req, res, next);
});
app.use(bodyParser());


}