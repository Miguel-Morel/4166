/*Author: Miguel Morel 
    Assignment: Project
    Student ID: 800877651 */
    
    $(document).ready(function(){
        $.getJSON("components/locations.json", function(data){ 
            $.each(data, function() { 
                $.each(this, function(key, value) {  
                    console.log(value.name);
                    $("#location").append(  
                        "<h3>" + value.name + "</h3>" + 
                        "<h4>" + value.phone + "</h4>" 
                       
                    ); 
                }); 
            });  
        }); 
    });