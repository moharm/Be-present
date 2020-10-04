
$(document).ready(function(){

$('#mytable').DataTable({

    responsive: true,
    "ajax": '/GetAbsence',
    "sDom": '<"toolbar">frtip',
    "pageLength": 20,

});


})
function Confirmer() {
    $.ajax({
        url:"/Comfirmer",
        method:"GET",
        success:  function(data){

            window.location.href = "/professeur/home"
        }
    })
}

function IsPresent(id){
    $('#mytable').DataTable().destroy()
    $('#mytable').DataTable({

        responsive: true,
        "ajax": '/IsPresent/?present='+id,
        "sDom": '<"toolbar">frtip',
        "pageLength": 20,
    
    });

}