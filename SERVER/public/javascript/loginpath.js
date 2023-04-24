var typeofuser1=document.getElementById("typeOfUser");
var form1=document.getElementById("login-form");

function func(){
    var form=document.getElementById("login-form");
    var typeofuser=document.getElementById("typeOfUser").value;

if(typeofuser === "patient"){
    form.action = "/submit-login"
}else if(typeofuser === "doctor"){
    form.action = "/submit-login-doc"
}else if(typeofuser === "hospital"){
    form.action = "/submit-login-hosp"
}else if(typeofuser === "admin"){
    form.action = "/submit-login-admin"
}
}

typeofuser1.addEventListener("change",()=>{
    func();
})
