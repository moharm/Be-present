
$(document).ready(function(){

    $("#element").change(function(){
        var lebelle = $("#classe").find("#"+$("#classe").val()).text()
        Get_Etudiants_infos($("#classe").val(),lebelle,$(this).val())
    })

    $.ajax({
        url:"/GetCurrentUser",
    
        method:"POST",
    
        data:{},
    
        success:function(data){
            GetClasses(data.id);
            GetElements(data.id);
        }
       
        });

function GetClasses(idCurrentUser){
    $.ajax({
        url:"/GetClasseByProf",
    
        method:"POST",
    
        data:{idUser:idCurrentUser},
    
        success:function(data){
            try{

                data.forEach(classe => {
                if(classe != ""){
                    $("#classe").append( "<option value='"+classe.id+"' id='"+classe.id+"'>"+classe.lebelle+"</option>" );
            }
        });
        }catch(e){
            alert(e)
            }}
        })
    }
    function GetElements(idCurrentUser){
        $.ajax({
            url:"/GetElements",
        
            method:"POST",
        
            data:{idUser:idCurrentUser},
        
            success:function(data){
                try{
                    data.forEach(Element => {
                    if(Element != ""){
                        $("#element").append( "<option value='"+Element.id+"' >"+Element.lebelle+"</option>" );
                }
            });
            }catch(e){
                alert(e)
                }}
            })
        }
})

function Get_Etudiants_infos(classe,lebelle,element){
    $('#mytable').DataTable().destroy()
    $('#mytable').DataTable({

        responsive: true,
        "ajax": {
            "url": "/Get_Etudiants_infos",
            "data": {classe:{
                lebelle:lebelle,
                id:classe
            },
            element:element}
          },
        "sDom": '<"toolbar">frtip',
        "pageLength": 20,
    
    });
}