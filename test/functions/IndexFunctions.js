function login() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText)
        if (this.responseText == "SUCCESS") {
          //SHOW AJAX RESPONSE THEN WAIT 5 SECS THEN REDIRECT
          window.location.href = "/dashboard";
        } else {
          document.getElementById("nologin").style.display = "block"
          document.getElementById("nologin").innerHTML = "Bad User/Pass combination!"
        }
      }
    }
    xhttp.open("POST", "/login");

    var email = document.getElementById("email_login").value
    var password = document.getElementById("password_login").value

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ "email": email, "password": password }));
  }

  function register() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText)
        if (this.responseText == "SUCCESS") {
          //SHOW AJAX RESPONSE THEN WAIT 5 SECS THEN REDIRECT
          window.location.href = "/dashboard";
        } else {
          document.getElementById("noregister").style.display = "block"
          document.getElementById("noregister").style.color = "red"
          document.getElementById("noregister").innerHTML = "Cannot create this user!"
          //TO DO CHECK RESPONSE THEN CHOOSE WHAT TO WRITE (user already exists or temp failure (db))
        }
      }
    }
    xhttp.open("POST", "/register");

    var register_email = document.getElementById("register_email").value
    var register_password = document.getElementById("register_password").value
    var register_confirm_password = document.getElementById("register_confirm_password").value

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ "register_email": register_email, "register_password": register_password, "register_confirm_password" : register_confirm_password }));
  }