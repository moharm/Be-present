
$(document).ready(function(){

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
                        $("#classe").append( "<option value='"+classe.id+"' >"+classe.lebelle+"</option>" );
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
