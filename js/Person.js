//PersonalProfile
document.querySelector('.PersonEditBtn').addEventListener('click',
function () {
const div = document.createElement('div');
var value = document.getElementById("name").value;    
var value2 = document.getElementById("edit").value; 
console.log(document.getElementById('name').disabled)
if(document.getElementById('name').disabled == true){
    document.getElementById('name').disabled = !document.getElementById('name').disabled;
    document.getElementById("edit").value = 'save'
    document.getElementById("name").setAttribute("placeholder",value);
    }
else{
    document.getElementById('name').disabled = !document.getElementById('name').disabled;
    document.getElementById("edit").value = 'Edit'
}

/* ;*/
alert(document.getElementById('name').disabled);



}        


)
function ChangeDisabled(value){
　if(value=='1'){
    
　document.getElementById('name').disabled=false;　// 變更欄位為可用
document.getElementById("email").setAttribute("onClict",value);
    

　}else{
　document.getElementById('name').disabled=true;　// 變更欄位為禁用

　}
}
//CollectionCatalog
$(function() {
    $('tbody').sortable();
 
    $('#addRow').click(function(){
        var value = $('#input2').val();
        html = 
        `           
                <td>
                    <div class="row">
                   
                        <div class="Page">
                        
                        <div class="PageName">
        
                            <div class="value">
                            <span class="currency"><span class="WhichPage">`+value+ `</span>
                            </div>
                        </div>
                        <br>
                        <ul class="deals">
                            <li>:):)</li> 
                            <a href="sub.html">
                            <button>more</button>
                            
                            </a>
                            
                        </ul>
                        <button class="remove">-</button>
                    </div>
                    </td>
                    
                    
                            `;
        if(value!="")
        {
            $('tbody').append(html);
        }
        
    });
 
    $(document).on('click', '.remove', function() {
        $(this).parents('td').remove();
    });
 
    $('#getValues').click(function(){
        
        //--------------------------------------
        var value = $('#input2').val();
        console.log(value)
        //--------------------------------------
        var values = [];
        $('input[name="name"]').each(function(i, elem){
            values.push($(elem).val());
        });
        alert(values.join(', '));
    });
});
//PostingRecord
