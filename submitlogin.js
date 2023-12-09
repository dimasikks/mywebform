let loginerrors = (classes) => document.getElementsByClassName(classes);
let loginmsg = loginerrors("loginerror");
let id2 =(id) => document.getElementById(id);
let un = id2("username1"),
    pw = id2("password1");
let trigg=1;
function logincheck(){
    response=grecaptcha.getResponse();
    checkNmblank(un);
    checkPwblank(pw);
    if(trigg){
        if(response.length===0) {
            alert("FILL OUT THE CAPTCHA");
            return;
        }
    }
};
function checkNmblank(ex){
    if (ex.value.trim() === "") {
        loginmsg[0].innerHTML="Username cannot be blank";
        ex.style.border = "4px solid red";
        trigg=0;
    }
    else{
        loginmsg[0].innerHTML="";
        ex.style.border = "4px solid green";
        trigg=1;
    }
}
function checkPwblank(ex){
    if (ex.value.trim() === "") {
        loginmsg[1].innerHTML="Password cannot be blank";
        ex.style.border = "4px solid red";
        trigg=0;
    }
    else{
        loginmsg[1].innerHTML="";
        ex.style.border = "4px solid green";
        trigg=1;
    }
}

