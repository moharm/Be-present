var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
var Absents = []
module.exports = {

    GetClasseByProf: function(req,res) {
        connection.query("SELECT * FROM classe where id in (select id_classe from class_prof_ele where `Id_professeur` = ? )", [req.body.idUser],
        function(err, rows){
            if(err){res.send(err)}

            res.send(rows)
        })
        
    },
    GetClasseByID: function(classe,callback) {
         connection.query('SELECT * FROM `classe` WHERE id=?', [classe],
        function(err, rows){
            if(err){
                return err
            }else{
                callback(rows[0]);
            }
        })
    },
    GetElement: function(req,res) {
        connection.query("SELECT * FROM element where id in (select id_element from class_prof_ele where `Id_professeur` = ? )", [req.body.idUser],
        function(err, rows){
            if(err){res.send(err)}

            res.send(rows)
        })
        
    },

    AddSeance: async function(req,res) {
        console.log(GetMySQLDateTime(),GetMySQLDate(req.session.date_seance))

        console.log(req.session.classe.id)
        connection.query('INSERT INTO seance SET ?', {date_creation: GetMySQLDateTime(),date_seance:GetMySQLDate(req.session.date_seance), debut: req.session.from,fin: req.session.To,
            Id_element: req.session.element,id_classe: req.session.classe.id,Id_professeur:req.session.professeur,Image_path: req.session.path}, 
            function (err, result) {
            if (err) throw err;

            req.session.Id_seance = result.insertId;

            AddAbsence(req,res)
          });
        
    },

    GetAbsence: function(req,res) {
        Absents = []
        const fs = require('fs');
        let Folder = '';
        if(req.session.Presences.join(',') != ''){
            let data = []
        connection.query("select e.nom,e.prenom,e.email,ce.id,c.lebelle,'absent' from classe c,etudiant e,Classe_etudiant ce where e.id in (select id_etudiant from Classe_etudiant where id_classe = "+ req.session.classe.id +") and ce.id not in (" + req.session.Presences.join(',') + ") and e.id=ce.id_etudiant and ce.id_classe=c.id UNION select e.nom,e.prenom,e.email,ce.id,c.lebelle,'present' from classe c,etudiant e,Classe_etudiant ce where e.id in (select id_etudiant from Classe_etudiant where id_classe = "+ req.session.classe.id +") and ce.id in (" + req.session.Presences.join(',') + ") and e.id=ce.id_etudiant and ce.id_classe=c.id", 
        [req.session.classe.id], function (err, rows) {
            if(rows != undefined){
            rows.forEach( etudiant => {
                Folder = './store/Classes/'+etudiant.lebelle+'/EtudiantsImages/'+etudiant.nom+'_'+etudiant.id
                var row = []
                    if(fs.existsSync(Folder)){
                        row.push('<img src="../.'+Folder+'/'+fs.readdirSync(Folder)[0]+'"  width="50" height="70" />')
              
                    }else{
                        row.push('<img src=""  width="50" height="70" />')

                    }
                    
                Absents.push(etudiant.id)
                row.push(etudiant.nom)
                row.push(etudiant.prenom)
                row.push(etudiant.email)
                if(etudiant.absent == 'absent'){
                row.push('<button type="button" onclick="IsPresent('+etudiant.id+')"  class="btn green-sharp">Is Present</button>')
                }else{
                    row.push('Present')
                }
                data.push(row)
            })
        }
            req.session.Absents = Absents

            res.send({"data" : data})
          });



    }else{
        connection.query("select e.nom,e.prenom,e.email,ce.id,c.lebelle from classe c,etudiant e,Classe_etudiant ce where e.id in (select id_etudiant from Classe_etudiant where id_classe = ?)  and e.id=ce.id_etudiant and ce.id_classe=c.id", 
        [req.session.classe.id], function (err, rows) {
            var data = []
            if(rows != undefined){
                
            rows.forEach( etudiant => {
                Folder = './store/Classes/'+etudiant.lebelle+'/EtudiantsImages/'+etudiant.nom+'_'+etudiant.id
                var row = []
                    if(fs.existsSync(Folder)){
                        row.push('<img src="../.'+Folder+'/'+fs.readdirSync(Folder)[0]+'"  width="50" height="70" />')
              
                    }else{
                        row.push('<img src=""  width="50" height="70" />')

                    }
                Absents.push(etudiant.id)
                row.push(etudiant.nom)
                row.push(etudiant.prenom)
                row.push(etudiant.email)
                row.push('<button type="button" onclick="IsPresent('+etudiant.id+')"  class="btn green-sharp">Is Present</button>')
                data.push(row)
            })
        }
            req.session.Absents = Absents
            res.send({"data" : data})
          });
          
    }},

}
function AddAbsence(req,res) {
    var nbrHours = parseInt(req.session.To.split(':')[0]) - parseInt(req.session.from.split(':')[0]);

   

    Absents.forEach( etudiant => {

    connection.query('INSERT INTO absence SET ?', {nbr_heures: nbrHours,Id_seance: req.session.Id_seance,Id_etudiant : etudiant},
         function (error, results, fields) {
        if (error) throw error;
        console.log(results.insertId);
      });

    })
    req.session.Id_seance = []
   res.send({"success":true})

}

function GetMySQLDateTime(){
    var date = new Date().toLocaleString('en-US',{hour12:false}).split(" ");
    // expected output: 20/12/2012, 03:00:00
    // Now we can access our time at date[1], and monthdayyear @ date[0]
    var time = date[1];
    var mdy = date[0];

    // We then parse  the mdy into parts
    mdy = mdy.split('/');
    var month = parseInt(mdy[0]);
    var day = parseInt(mdy[1]);
    var year = parseInt(mdy[2]);

    // Putting it all together
    return year + '-' + month + '-' + day + ' ' + time;
}

function GetMySQLDate( date){

    // We then parse  the mdy into parts
    var mdy = date.split('/');
    var month = parseInt(mdy[0]);
    var day = parseInt(mdy[1]);
    var year = parseInt(mdy[2]);

    // Putting it all together
    return year + '-' + month + '-' + day ;
}