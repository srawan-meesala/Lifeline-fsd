function verifyEdit(){
    var mobileNo = document.getElementById("mobile").value;
    var dob=new Date(document.getElementById("dob").value);
    var fname = document.getElementById("firstname").value;
    var lname = document.getElementById("lastname").value;

    var curr_date=new Date().getTime();
    var dob_input = dob.getTime();

    var name = new RegExp(/^[a-zA-Z ]{2,30}$/);
    var mobile  = new RegExp(/^\d{10}$/);
    
    if(!mobile.test(mobileNo)) {
        alert("Invalid Mobile number!!");
        return false;
    } 
    else if (!name.test(fname)) {
        alert("Input should only contain alphabets.");
        return false;
      }
    else if (!name.test(lname)) {
        alert("Input should only contain alphabets.");
        return false;
      }
    
    else if (fname.length < 2 || fname.length > 30 ) {
        alert(`Input length should be between 2 and 30 characters.`);
        return false;
      }
      else if (lname.length < 2 || lname.length > 30 ) {
        alert(`Input length should be between 2 and 30 characters.`);
        return false;
      }
    else if(curr_date < dob_input){
        alert("Invalid Date of Birth!!");
        return false;
    }else{
        return true;
    }
}
   
var regform=document.getElementById("edit-patient-profile");
regform.addEventListener("submit",function(e){
    if(verifyEdit()==false){
        e.preventDefault();
    }

    else{
        console.log("Updated successfully")
    }
})