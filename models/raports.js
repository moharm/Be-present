var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
module.exports = {

    Get_Etudiants_infos: function(req,res) {
        const fs = require('fs');
        let Folder = '';
            
        connection.query('select ce.id,e.nom,e.prenom,SUM(a.nbr_heures) as nbr_H from etudiant e,Classe_etudiant ce,absence a,seance s where e.id in (select id_etudiant from Classe_etudiant where id_classe = ?) and ce.id=a.id_etudiant and a.id_seance=s.id and s.id_element=? and e.id=ce.id_etudiant GROUP BY ce.id', 
        [req.query.classe.id,req.query.element], function (err, rows) {

            var data = []
            if(rows != undefined){
            rows.forEach( etudiant => {
                Folder = './store/Classes/'+req.query.classe.lebelle+'/EtudiantsImages/'+etudiant.nom+'_'+etudiant.id
                console.log(Folder)
                var row = []
                    if(fs.existsSync(Folder)){
                        row.push('<img src="../.'+Folder+'/'+fs.readdirSync(Folder)[0]+'"  width="50" height="70" />')
              
                    }else{
                        row.push('<img src=""  width="50" height="70" />')

                    }
                row.push(etudiant.nom)
                row.push(etudiant.prenom)
                row.push(etudiant.nbr_H)
                data.push(row)
            })
        }
            res.send({"data" : data})
          });
          
        
    },


}