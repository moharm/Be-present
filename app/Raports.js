const Raports_model = require('../models/raports')

module.exports = function(app) {



    app.get('/Get_Etudiants_infos', (req,res) =>{
        Raports_model.Get_Etudiants_infos(req,res)
    })


}
