function verifyDocRegistration(){
    var mobileNum = document.getElementById("mobNum").value;  
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var regularExpression  = new RegExp(/^[A-Za-z]\w{8,15}$/);
    var mobile  = new RegExp(/^\d{10}$/);
    if(!mobile.test(mobileNum))
     {
        alert("Invalid Mobile number!!");
        return false;
    }
    else if(username.length < 5 || username.length > 25 )
    {
       alert("Username should be between 5 to 25 characters!!")
        return false;
    }
    else if(regularExpression.test(password)) 
    {
       alert("password should contain atleast one number and one special character");
        return false;
    }
    else if(password.length < 8 || password.length > 15) 
    {  
        alert("Password should be between 8 to 15 characters!!")
        return false;
    }
    else{
    return true;
    }
}
   
var docRegform=document.getElementById("register-doc");
docRegform.addEventListener("submit",function(e){
    if(verifyDocRegistration()==false){
        e.preventDefault();
    }

    else{
        // alert("Registered successfully");
    }
})