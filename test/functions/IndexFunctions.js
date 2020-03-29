class Document {
  constructor() {
    this.document = "";
    this.style = {display:""};
    this.value = {"": this.style,"":"ad0"}
    
  }
    
  getElementById(arg1){
    return this.value;
  }
}
var document = new Document();



function login(testingVariable,xhttp) {
  xhttp.onreadystatechange = function (testingVariable) {

    if (this.readyState == 4 && this.status == 200) { 
      if (this.responseText == "SUCCESS") {
        //SHOW AJAX RESPONSE THEN WAIT 5 SECS THEN REDIRECT
        testingVariable = "/dashboard";
        return testingVariable;
      } else {
        testingVariable = "block"
        return testingVariable;
        }
    }
  }

  xhttp.open("POST", "/login");

  var email = document.getElementById("email_login").value
  var password = document.getElementById("password_login").value

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ "email": email, "password": password }));
  
}

function register(testingVariable,xhttp) {
  
  xhttp.onreadystatechange = function (testingVariable) {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText == "SUCCESS") {
        //SHOW AJAX RESPONSE THEN WAIT 5 SECS THEN REDIRECT
        return testingVariable = "/dashboard";
      } else {
        testingVariable = "block"
        return testingVariable;
        //TO DO CHECK RESPONSE THEN CHOOSE WHAT TO WRITE (user already exists or temp failure (db))
      }
    }
  }
  xhttp.open("POST", "/register");

  var register_email = document.getElementById("register_email").value
  var register_password = document.getElementById("register_password").value
  var register_confirm_password = document.getElementById("register_confirm_password").value

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ "register_email": register_email, "register_password": register_password, "register_confirm_password": register_confirm_password }));
}

module.exports = {
  login,
  register
}