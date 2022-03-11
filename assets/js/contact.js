var nameRegex = /^[A-ZŠĐČĆŽ][a-zšđčćž]{2,}(\s[A-ZŠĐČĆŽ][a-zšđčćž]{2,})+$/;
var emailRegex = /^[\w-_\.]+@([\w-_]{2,}\.)+[a-z]{2,}$/;
var numRegex = /^06[0-9]\/[0-9]{3,4}\-[0-9]{3,4}$/;
var messageRegex = /^.{4,200}$/;
var formName = document.getElementById("name");
var formEmail = document.getElementById("email");
var formNumber = document.getElementById("number");
var formMsg = document.getElementById("message");
var noErrors;

    formName.addEventListener("blur", checkName);
    function checkName() {
    var check = nameRegex.test(formName.value);
    var errorName =  document.querySelector(".errorName");
    if(check) {
        formName.classList.add("br-green");
        formName.classList.remove("br-red");
        errorName.innerHTML="Name is valid!";
        errorName.style.color="green";
    
    } 
    else {
    noErrors = false;
    formName.classList.add("br-red");
    formName.classList.remove("br-green");
    errorName.innerHTML="Name is not valid!";
    errorName.style.color="red";
    }
    }


    formEmail.addEventListener("blur", checkEmail);
    function checkEmail() {
    var check = emailRegex.test(formEmail.value);
    var errorEmail =  document.querySelector(".errorEmail");
    if(check) {
    formEmail.classList.add("br-green");
    formEmail.classList.remove("br-red");
    errorEmail.innerHTML="Email is valid!";
    errorEmail.style.color="green";
    
    } 
    else {
    noErrors = false;
    formEmail.classList.add("br-red");
    formEmail.classList.remove("br-green");
    errorEmail.innerHTML="Email is not valid!";
    errorEmail.style.color="Red";
    }
    }

    formNumber.addEventListener("blur", checkNumber);
    function checkNumber() {
    var check = numRegex.test(formNumber.value);
    var errorNumber =  document.querySelector(".errorNumber");
    if(check) {
        formNumber.classList.add("br-green");
        formNumber.classList.remove("br-red");
        errorNumber.innerHTML="Number is valid!";
        errorNumber.style.color="green";
    
    } 
    else {
    noErrors = false;
    formNumber.classList.add("br-red");
    formNumber.classList.remove("br-green");
    errorNumber.innerHTML="Number is not valid!";
    errorNumber.style.color="red";
    }
    }

    formMsg.addEventListener("blur", checkMsg);
    function checkMsg() {
    var check = messageRegex.test(formMsg.value);
    var errorMsg =  document.querySelector(".errorMsg");
    if (check) {
    formMsg.classList.remove('br-red');
    formMsg.classList.add('br-green');
    errorMsg.textContent = "Message is valid";
    errorMsg.style.color="green";
    
    } 
    else {
    noErrors = false;
    formMsg.classList.add('br-red');
    formMsg.classList.remove('br-green');
    errorMsg.textContent = "Message can`t be empty";
    errorMsg.style.color="red";
    }

    }

var btnSubmitMessage = document.getElementById("btnSubmitForm");

btnSubmitMessage.addEventListener("click", function() {
 noErrors = true;
 checkName();
 checkEmail();
 checkNumber();
 checkMsg();
 if(noErrors) {
  formName.value = "";
  formNumber.value = "";
  formEmail.value = "";
  formMsg.value = "";
  errorName.innerHTML="";
  errorEmail.innerHTML='';
  errorNumber.innerHTML='';
  errorMsg.innerHTML='';
  formEmail.classList.remove("br-green");
  formName.classList.remove("br-green");
  formNumber.classList.remove("br-green");
  formMsg.classList.remove("br-green");
}
});
