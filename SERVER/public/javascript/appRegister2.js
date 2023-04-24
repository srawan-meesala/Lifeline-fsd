function verifyRegistration(){
    var password = document.getElementById("passwordInput").value;  
    var username = document.getElementById("usernameInput").value;
    var confirm_password = document.getElementById("confirm-passwordInput").value;
    var regularExpression  = new RegExp(/^[A-Za-z]\w{8,15}$/);
    
    if(confirm_password !== password){
        alert("Password Mismatch!!");
        return false;
    }else if(username.length < 5 || username.length > 25 ){
        alert("Username should be between 5 to 25 characters!!")
        return false;
    }else if(regularExpression.test(password)) {
        alert("password should contain atleast one number and one special character");
        return false;
    }else if(password.length < 8 || password.length > 15) {  
        alert("Password should be between 8 to 15 characters!!")
        return false;  
    }else{
        return true;
    } 
}

var regform=document.getElementById("register-form");
regform.addEventListener("submit",function(e){
    if(verifyRegistration()==false){
        e.preventDefault();
    }
    else{
        console.log("Registered successfully")
    }
})