var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
module.exports = {

    Get_Filiere: function(res) {
        connection.query("SELECT id,lebelle FROM filiere", [],
        function(err, rows){
            if(err){res.send(err)}

            res.send(rows)
        })

    },

    Get_Classe: function(req,res) {
        connection.query("SELECT id,lebelle FROM classe where id_option in (select id from _option where id_filiere=?)", [req.body.filiere],
        function(err, rows){
            if(err){res.send(err)}

            res.send(rows)
        })

    },

    Get_etudiant_labels: function(req,res) {
        var labels = []
        connection.query("SELECT ec.id,e.nom FROM etudiant e,classe_etudiant ec where ec.id_classe = ? and e.id = ec.id_etudiant", [req.body.classe],
        function(err, rows){
            if(err){res.send(err)}


            let label = ''
                rows.forEach( etudiant => {
                    label =  ''+etudiant.nom+'_'+etudiant.id
                    labels.push(label)
                })
            })
            return labels
    },
        
    Load_EtudiantsOfClasse: function(req,res) {
        const fs = require('fs');
        let Folder = '';

        connection.query("SELECT ec.id,e.nom,e.prenom FROM etudiant e,classe_etudiant ec where ec.id_classe=? and ec.id_etudiant=e.id", [req.query.classe],
        function(err, rows){
            if(err){res.send(err)}

            var data = []
            rows.forEach( etudiant => {
                Folder = './store/Classes/'+req.query.classeName+'/EtudiantsImages/'+etudiant.nom+'_'+etudiant.id
                var row = []
                    if(fs.existsSync(Folder)){
                        row.push('<img src="../.'+Folder+'/'+fs.readdirSync(Folder)[0]+'"  width="50" height="70" />')
              
                    }else{
                        row.push('<img src=""  width="50" height="70" />')

                    }

                    row.push(etudiant.nom)
                    row.push(etudiant.prenom)
                    row.push('<button type="button" data-toggle="modal" data-target="#EtudiantEdit" style="width: 95px;" onclick=Modifier("'+etudiant.nom+'_'+etudiant.id+'")  class="btn green-sharp">Modifier</button>')
                    data.push(row)
                

            })
      
            res.send({"data" : data})
        })

    },
}