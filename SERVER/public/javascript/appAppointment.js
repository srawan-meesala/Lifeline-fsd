function verifyAppointment(){  
  var mobileNo = document.getElementById("contactAppoint").value;
  var regularExpression  = new RegExp(/^[A-Za-z]\w{8,15}$/);
  var doa =new Date(document.getElementById("dateAppoint").value);
  var curr_date=new Date().getTime();
  var doa_input = doa.getTime();  
  var mobile  = new RegExp(/^\d{10}$/);
  if(!mobile.test(mobileNo)) {
    alert("Invalid Mobile number!!");
    return false;
  } 
  else if(curr_date > doa_input){
    alert("Invalid date entry");
    return false;
  }
  else{
    return true;
  }
}


  
var appointform=document.getElementById("appoint-form");
appointform.addEventListener("submit",function(e){
   if(verifyAppointment()==false){
       e.preventDefault();
   }

   else{
       console.log("Registered successfully");
   }
})



  
   


