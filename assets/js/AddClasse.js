var option = '',id_classe = '',
classe = '',
filiere = '',niveau = '',annee_uv = '';
var etudiants;

$(document).ready(function(){
  $( ".ea_option_form" ).hide();
  $(".table_etudiant").hide()
  $( ".annee_univarsitaire" ).hide();
  $("#Retour-Button").hide()

  
 

    $("#filiere").change(function(){  //On Filiere change
        
        filiere = $(this).val();
        

        Ajax_Get_Option(filiere,niveau)

      });
   
      $("#niveau").change(function(){  //On Niveau change
        filiere = $("#filiere").val();
        $( "#filiere" ).empty();
        niveau = $(this).val();
        Ajax_Get_Filiere(niveau);
        Ajax_Get_Option(filiere,niveau);
        Ajax_Get_classe(option,niveau,annee_uv); 
        Ajax_Load_EtudiantsOfClasse();


      });

      $("#ea_option").change(function(){  //On Option change
        option = $(this).val()
        Ajax_Get_classe(option,niveau,annee_uv); 
        console.log(id_classe)
      });

      $("#annee_universitaire").change(function(){  //On annee_universitaire change
        niveau = $("#niveau").val();
        annee_uv = $("#annee_universitaire").val();
        
        Ajax_Get_classe(option,niveau,annee_uv); 
        Ajax_Load_EtudiantsOfClasse();


});

      $("#Ajouter-Etudiants").click(function(){
        Get_etudiants();
      });
      $("#Retour-Button").click(function(){
        $(this).hide()
        Ajax_Load_EtudiantsOfClasse();
      });

});

function Ajax_Get_Filiere(niveau){
  $.ajax({
    url:"/Ajax_Get_Filiere",

    method:"POST",

    success:function(data){

        try
        {
        var filieres =JSON.parse(data)
        console.log(filieres)
        filieres.forEach(filiere => {
        if(filiere != "")
        {
        $("#filiere").append( "<option value='"+filiere.filiere+"' >"+filiere.filiere+"</option>" );
        }
      });
      $("#filiere").val(filiere);
      }
      catch(e)
      {
        alert('invalid json');
      }   

    }
  })
}

function Ajax_Get_Option(filiere,niveau){
  $.ajax({
    url:"http://localhost:8081/ESAV/workout/CodeIgniter3/main/Ajax_Get_Option",

    method:"POST",

    data:{
      filiere:filiere,
      niveau:niveau
    },

    success:function(data){

      
      $( "#ea_option" ).empty();
      var options =JSON.parse(data)
      console.log(options)
      if(options.length  === 1){
        option = $("#filiere ").val()
        $( ".ea_option_form" ).hide();
        $( ".annee_univarsitaire" ).show();
        Ajax_Get_classe(option,niveau,annee_uv); 

      }else{
        $( ".ea_option_form" ).show();
        $( ".annee_univarsitaire" ).show();

        try
        {

        options.forEach(Option => {
        if(Option != "")
        {
        $("#ea_option").append( "<option value='"+Option.option+"' >"+Option.option+"</option>" );
        }
      });
      }
      catch(e)
      {
        alert('invalid json');
      }   
      }
   
    }
  })
}

function Add_etudiantToclasse(id_etudiant){

  $.ajax({
    url:"http://localhost:8081/ESAV/workout/CodeIgniter3/main/Add_etudiantToclasse",

    method:"POST",

    data:{id_etudiant:id_etudiant,
          id_classe:id_classe},

    success:function(data){
      console.log(data)
      
    }

  });

}

function Ajax_Get_classe(option,niveau,annee_uv){
 
   $.ajax({
    url:"http://localhost:8081/ESAV/workout/CodeIgniter3/main/Ajax_Get_classe",

    method:"POST",

    data:{
          option:option,
          niveau:niveau,
          annee_uv:annee_uv
        },

    success:function(data){
      console.log(data)
      
      if(data == 'No classe found' | data == 'error data'){
        id_classe = '';
        setTimeout(() => {
        Ajax_Load_EtudiantsOfClasse();

        },100);
      }else{
        var classe =JSON.parse(data)
        console.log(classe)
        id_classe = classe[0].id_classe
        console.log(id_classe)
        Ajax_Load_EtudiantsOfClasse();

      }
    }

  });
}

function Ajax_Load_EtudiantsOfClasse(){
  if ( id_classe == ''){
    console.log("no classe")
    $(".Table-Etudiant").DataTable().clear().draw();
   


    return "no classe"
  }else{

    $(".Table-Etudiant").DataTable().destroy();
    $(".Table-Etudiant").DataTable({
    
      "ajax" : {
        url : "http://localhost:8081/ESAV/workout/CodeIgniter3/main/Ajax_Load_EtudiantsDuClasse",
        type : "POST",
        data : {
          id_classe:id_classe 
        }
      }
      
    })

  }
}
function Delete_etudiant_classe(id_etudiant){
  $.ajax({
    url:"http://localhost:8081/ESAV/workout/CodeIgniter3/main/Delete_etudiant_classe",

    method:"POST",

    data:{
          id_classe:id_classe,
          id_etudiant:id_etudiant
        },

    success:function(data){
      Ajax_Load_EtudiantsOfClasse()
      alert("Deleted! success")
    }
  });
}

function Get_etudiants(){   //retourne tout les etudiants
  if ( id_classe == ''){
alert("il faut selectionner une classe")
  }else{
  $("#Retour-Button").show()

  $(".Table-Etudiant").DataTable().destroy();
  $(".Table-Etudiant").DataTable({
  
    "ajax" : {
      url : "http://localhost:8081/ESAV/workout/CodeIgniter3/main/Get_Etudiants",
      type : "POST",

    }
    
  });
}

}

//***************************************************************** */
function Split_data(data){
let responce = data.split("|");
return responce;
}

function RemoveFirstItem(array){
  let removeItem = ""
  array = jQuery.grep(array, function(value) {
    return value != removeItem;
  });
  return array;
}