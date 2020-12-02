document.querySelector("html").classList.add('js');

var fileInput  = document.querySelector( ".input-file" ),  
    button     = document.querySelector( ".input-file-trigger" ),
    the_return = document.querySelector( ".file-return");
    
button.addEventListener( "keydown", function( event ) {  
    if ( event.keyCode == 13 || event.keyCode == 32 ) {  
        fileInput.focus();  
    }  
});
button.addEventListener( "click", function( event ) {
    fileInput.focus();
    return false;
});  
fileInput.addEventListener( "change", function( event ) { 
    var str= this.value;
    str= str.substring(12, str.length);
    the_return.innerHTML = str;
});

$(document).ready(function(){
    
})
