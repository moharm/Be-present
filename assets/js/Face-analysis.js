$(document).ready(function(){


    Ajax_Get_Filiere()

    $("#filiere").change(function(){  //On Filiere change
      
      var filiere = $(this).val();
      Ajax_Get_Classe(filiere)

    });

    $("#classe").change(function(){  //On Filiere change
      
        var classe = $(this).val();
        Ajax_Load_EtudiantsOfClasse(classe)

      });

      $("#Train").click(function(){  //Train images
      
        Train()

      });

})

function Ajax_Get_Filiere(niveau){
    $.ajax({
      url:"/Ajax_Get_Filiere",
  
      method:"POST",
  
      success:function(filieres){
  
          try
          {

            filieres.forEach(filiere => {
                if(filiere != ""){
                    $("#filiere").append( "<option value='"+filiere.id+"' >"+filiere.lebelle+"</option>" );
                }
            });
        }
        catch(e)
        {
          alert('invalid json');
        }   
  
      }
    })
  }

  
function Ajax_Get_Classe(filiere){
    $.ajax({
      url:"/Ajax_Get_Classe",
  
      method:"POST",
      data :{filiere:filiere},
  
      success:function(classes){
  
          try{
            if($("#classe").empty()){
              $("#classe").empty();
              $("#classe").append('<option value=""></option>')
            }
            
            classes.forEach(classe => {
                if(classe != ""){
                    $("#classe").append( "<option value='"+classe.id+"' id='"+classe.id+"'>"+classe.lebelle+"</option>" );
                }
            });
        }
        catch(e){
          alert('invalid json');
        }   
  
      }
    })
  }

function Ajax_Load_EtudiantsOfClasse(classe){
    $('#mytable').DataTable().destroy()

    $('#mytable').DataTable({

        responsive: true,
        "ajax": '/Ajax_Load_EtudiantsOfClasse/?classe='+classe+'&classeName='+$("#classe").find("#"+$("#classe").val()).text(),
        "sDom": '<"toolbar">frtip',
        "pageLength": 20,
    
    } );
}

function Modifier(id) {
  // console.log($("#classe").find("#"+$("#classe").val()).text())
  $(".files").empty()
  $("#fileupload").attr("action",'/toto/?classe='+$("#classe").find("#"+$("#classe").val()).text()+'&id='+id)
  FormFileUpload.init('/toto/?classe='+$("#classe").find("#"+$("#classe").val()).text()+'&id='+id)
};

function Train(){
  if($("#classe").val()){
  $.ajax({
    url:"/Train",

    method:"POST",
    data :{
      classeName:$("#classe").find("#"+$("#classe").val()).text(),
      classe:$("#classe").val()
    },

    success:function(){
      $.bootstrapGrowl("Trainning With success!", {
        ele: 'body', // which element to append to
        type: 'success', // (null, 'info', 'danger', 'success')
        offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
        align: 'right', // ('left', 'right', or 'center')
        width: 300, // (integer, or 'auto')
        delay: 5000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
        allow_dismiss: true, // If true then will display a cross to close the popup.
        stackup_spacing: 10 // spacing between consecutively stacked growls.
      });
    }
  })
}else{
  alert("s'il vous plait , Selection une Classe!")
}
}