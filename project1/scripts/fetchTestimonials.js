/*Author: Miguel Morel 
    Assignment: Project
    Student ID: 800877651 */
    
    $(document).ready(function(){
        $.getJSON("components/testimonials.json", function(data){ 
            $.each(data, function() { 
                $.each(this, function(key, value) {  
                    console.log(value.name);
                    $("#name").append(  
                        "<h3>" + value.name + "</h3>" + 
                        "<h4>" + value.certification + "</h4>" 
                       
                    ); 
                }); 
            });  
        }); 
    });