let id =(id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);
let username = id("username"),
email = id("email"),
password = id("password"),
cpassword = id("cpassword"),
form = id("form"),
errorMsg = classes("error");
let trig=1;
var response;
form.addEventListener("submit", (e)=>{
    response=grecaptcha.getResponse();
    e.preventDefault();
    engine(username, 0, "Username cannot be blank");
    engine(email, 1, "Email cannot be blank");
    engine(password, 2, "Password cannot be blank");
    engine(cpassword,3,"Confirmed password cannot be blank");
    both(password,cpassword,3,"Passwords don't match");
    checkpassword(password,2);
    if(trig && response.length!==0){
        username.style.border="2px solid green";
        email.style.border="2px solid green";
        password.style.border="2px solid green";
        cpassword.style.border="2px solid green";
        var pair = [username.value,password.value];
        localStorage.setItem(email.value,JSON.stringify(pair));
        setTimeout(()=>{form.submit()},2500);
    }
});
let engine = (id, serial, message) => {
    if (id.value.trim() === "") {
    errorMsg[serial].innerHTML = message;
    errorMsg[serial].style.color="red";
    id.style.border = "4px solid red";
    trig=0;
    } 
    else {
    errorMsg[serial].innerHTML = "";
    id.style.border = "4px solid green";
    trig=1;
    }
};
let both = (id1,id2,serial,message)=>{
    if(!(id1.value===id2.value)){
        id1.style.border = "4px solid red";
        id2.style.border = "4px solid red";
        errorMsg[serial].innerHTML = message;
        trig=0;
    }
    else{
        id1.style.border = "4px solid green";
        id2.style.border = "4px solid green";
        trig=1;
    }
};
let checkpassword=(id,serial)=>{
    let s=id.value,i=0,cN=0,cZ=0,cL=0;
    let errors = ['!','#','$','^','<','>','\"','\'','+','&','?','|','*','(',')','%',';',':','№','~','`','/','\\'];
    trig=1;
    for(i;i<s.length;i++){
        if(s[i]>'0' && s[i]<='9') cN++;
        if(s[i]===s[i].toUpperCase() && !(s[i]>'0' && s[i]<='9')) cZ++;
        if(s[i]===s[i].toLowerCase() && !(s[i]>'0' && s[i]<='9')) cL++;
        if(errors.includes(s[i])){
            redpasses();
            errorMsg[serial].innerHTML="Password cannot contain " + s[i];
            return;
        };
    }
    if(s.length<8){
        errorMsg[serial].innerHTML = "Password cannot contain less than 8 characters";
        redpasses();
        return;
    }
    else{
        if(cN===0){
            errorMsg[serial].innerHTML = "Password must contain 1 or more digits";
            redpasses();
            return;
        }
        else{
            if(cZ===0) {
                errorMsg[serial].innerHTML = "Password must contain 1 or more upper leters";
                redpasses();
                return;
            }
            else{
                if(cL==0){
                    errorMsg[serial].innerHTML = "Password must contain 1 or more lower leters";
                    redpasses();
                    return;
                }
            }
        }
    }
    if(!(password.value===cpassword.value)) return;
    let success=document.getElementsByClassName("success");
    let start = Date.now();
    let timer = setInterval(function() {
        let timePassed = Date.now() - start;
        if (timePassed >= 500) {
            clearInterval(timer); 
            return;
        }
        draw1(timePassed);
    },  50);
    function draw1(timePassed) {
        success[0].style.opacity = timePassed/500;
    };
    let f = setTimeout(()=>{
    let start1 = Date.now();
    let timer1 = setInterval(function() {
        let timePassed = Date.now() - start1;
        if (timePassed >= 1000) {
            clearInterval(timer1); 
            return;
        }
        draw(timePassed);
    },  10);
    function draw(timePassed) {
        success[0].style.opacity = (1000-timePassed)/1000;
    };
},1000);
};
let redpasses = ()=>{
    document.getElementById("password").style.border = "4px solid red";
    document.getElementById("cpassword").style.border = "4px solid red";
    trig=0;
};
