const seance_model = require('../models/seance')
const reconnaissance = require('./reconnaissance')
const TakePhoto = require('./TakePhoto')
const fs = require('fs')

module.exports = function(app,path,multer) {


app.post('/GetClasseByProf', (req, res) => {
seance_model.GetClasseByProf(req,res)
})
app.post('/GetElements', (req, res) => {
  seance_model.GetElement(req,res)
})
app.get('/GetAbsence', (req, res) => {
  seance_model.GetAbsence(req,res)
})

 app.get('/Comfirmer',async (req,res) => {
  await seance_model.AddSeance(req,res)
})
app.get('/IsPresent', (req, res) => {

console.log(req.session.Presences)
req.session.Presences.push(req.query.present)
console.log(req.session.Presences)
seance_model.GetAbsence(req,res)

})

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './store/ClasseImages',
    filename: function(req, file, cb){
      seance_model.GetClasseByID(req.body.classe,function(result){
        req.session.classe = result
        req.session.date = Date.now()
        console.log(req.session.date)
        cb(null,'Classe_'+req.session.classe.lebelle+'_'+req.session.date +'.jpg');
      })
    }
  });
  
  // Init Upload
  const upload = multer({
    storage: storage,
    limits:{fileSize: 10000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).single('ClasseImage');
  
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

  app.post('/upload', (req, res) => {

    upload(req, res, (err) => {
      if(err){
        console.log(err)
        res.redirect('/professeur/seance/remplir'); 

      } else {
        if(req.file == undefined){
          res.redirect('/professeur/seance/remplir');
        } else {

            req.session.Absents = []
            req.session.path = req.file.path
            req.session.from = req.body.from
            req.session.To = req.body.To
            req.session.date_seance = req.body.date_seance
            req.session.professeur = req.user.id
            req.session.element = req.body.element
            reconnaissance(req,res)
      

        }
      }
    });

  });


  //if the Prof is Using the Classe's Camera 
  app.post('/uploadByCamera', (req, res) => {
    upload(req, res, (err) => {
      if(err){
        res.redirect('/professeur/seance/remplir'); 
      } else {
        if(req.file == undefined){
          seance_model.GetClasseByID(req.body.classe,function(result){
            req.session.classe = result
          })
          req.session.Absents = []
          req.session.from = req.body.from
          req.session.To = req.body.To
          req.session.date_seance = req.body.date_seance
          req.session.professeur = req.user.id
          req.session.element = req.body.element
          console.log(req.session.date_seance)

          reconnaissance(req,res)

        } 
}
});
  });
// Taking a Pic of the Classe
  app.post('/TakePhoto', (req, res) => {
    seance_model.GetClasseByID(req.body.classe,function(result){
      req.session.classe = result
      if (fs.existsSync('./store/ClasseImages/Classe_'+req.session.classe.lebelle+'_'+req.session.date+'.jpg')) {

      fs.unlinkSync('./store/ClasseImages/Classe_'+req.session.classe.lebelle+'_'+req.session.date+'.jpg')
      }
      req.session.date = Date.now()
      var image  
      TakePhoto(req.session.classe.Num_Camera).capture( '', function( err, data ) { 
              image = "<img id='ClassePhoto' src='" + data + "'>";
              var base64Data = data.replace(/^data:image\/jpeg;base64,/, "");
              fs.writeFile('./store/ClasseImages/Classe_'+req.session.classe.lebelle+'_'+req.session.date+'.jpg', base64Data, 'base64', function(err) {
                console.log(err);
              });
              res.send(image)
    });
      
    })
    
      
  });

}