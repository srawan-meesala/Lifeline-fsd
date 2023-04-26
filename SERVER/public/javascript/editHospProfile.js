function verifyEdit(){
    var contact = document.getElementById("mobNum").value;

    var mobile  = new RegExp(/^\d{10}$/);
    
    if(!mobile.test(contact)) {
        alert("Invalid Contact!!");
        return false;
    } 
    else{
        return true;
    }
}
   
var regform=document.getElementById("edit-hosp-profile");
regform.addEventListener("submit",function(e){
    if(verifyEdit()==false){
        e.preventDefault();
    }

    else{
        console.log("Updated successfully")
    }
})