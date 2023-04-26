function verifyEdit(){
    var mobileNo = document.getElementById("mobNum").value;
    var docName = document.getElementById("docName").value;
    var spec = document.getElementById("spec").value;
    
    var regexp = new RegExp(/^[a-zA-Z\s]*$/);
    var name = new RegExp(/^[a-zA-Z ]{2,30}$/);
    var mobile  = new RegExp(/^\d{10}$/);
    
    if(!mobile.test(mobileNo)) {
        alert("Invalid Mobile number!!");
        return false;
    } 
    else if (!name.test(docName)) {
        alert("Name should only contain alphabets.");
        return false;
      }
      else if (docName.length < 2 || docName.length > 30 ) {
        alert(`Name should be between 2 and 30 characters.`);
        return false;
      }
    else if (!regexp.test(spec)) {
        alert("Invalid entry of specialisation!!");
        return false;
      }
    else{
        return true;
    }
}
   
var regform=document.getElementById("edit-doc-profile");
regform.addEventListener("submit",function(e){
    if(verifyEdit()==false){
        e.preventDefault();
    }

    else{
        console.log("Updated successfully")
    }
})