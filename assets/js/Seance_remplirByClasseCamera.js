
$(document).ready(function(){

    $('#PrendrePhoto').click(function(){
        if($('#classe').val() != ''){
        $.ajax({
            url:"/TakePhoto",
        
            method:"POST",
        
            data:{classe : $('#classe').val()},
        
            success:function(data){
                $(".Photo").empty()
                $(".Photo").append( data );

              
            }
           
            }); 
        }else{
            alert('selectionnez une classe !')
        }
    })

    // $('#send').click(function(){
    //     if($('#ClassePhoto').val() != undefined){
    //         $.ajax({
    //             url:"/uploadByCamera",
            
    //             method:"POST",
            
    //             data:{from : $('#from').val(),
    //                     To : $('#To').val(),
    //                     element : $('#element').val(),},
            
    //             success:function(data){
                  
    //             }
               
    //             }); 
    //         }else{
    //             alert('Prendre Une Photo SVP !')
    //         }
    // })


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
    