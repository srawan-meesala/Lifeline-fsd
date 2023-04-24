
let showPasswordIcon = document.getElementById('showPass')
const passwordInput = document.getElementById('passwordInput')
showPasswordIcon.onclick = function(){
    if(passwordInput.type == "password"){
        passwordInput.type = "text"
    }else if(passwordInput.type == "text"){
        passwordInput.type = "password"
    }
}
