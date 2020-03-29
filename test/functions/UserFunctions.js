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

function fetch_gallery(uid,xhttp,testingVariable) {
      
      xhttp.onreadystatechange = function(testingVariable) {
        if (this.readyState == 4 && this.status == 200) { //response success
           document.getElementById("indagallery").innerHTML = this.responseText;
           return testingVariable = "grid"
        } else if (this.readyState == 4 && this.status == 504) { //timeout
           //document.getElementById("indafeed").innerHTML = this.responseText;
           //HANDLE TIMEOUTS! ERR NO CONNECTED!
           return testingVariable = "timeout"
         }
      }
      xhttp.open("POST", "/fetch_gallery");

      //send post parameter...
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(JSON.stringify({ "uid":uid }));
}

function fetch_user(uid,xhttp,testingVariable) {
 
    xhttp.onreadystatechange = function(testingVariable) {
      if (this.readyState == 4 && this.status == 200) { //response success
         document.getElementById("indauser").innerHTML = this.responseText;
        return testingVariable = "indauser";
      } else if (this.readyState == 4 && this.status == 504) { //timeout
         //document.getElementById("indafeed").innerHTML = this.responseText;
         //HANDLE TIMEOUTS! ERR NO CONNECTED!
         return testingVariable = "timeout"
       }
    }
    xhttp.open("POST", "/fetch_user");

    //send post parameter...
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ "uid":uid }));
}

function follow_user(xhttp,testingVariable) {
  
    xhttp.onreadystatechange = function(testingVariable) {
      if (this.readyState == 4 && this.status == 200) { //response success
         document.getElementById("indauser").innerHTML = this.responseText;
         return testingVariable = "indauser"
      } else if (this.readyState == 4 && this.status == 504) { //timeout
         //document.getElementById("indafeed").innerHTML = this.responseText;
         //HANDLE TIMEOUTS! ERR NO CONNECTED!
         return testingVariable = "timeout"
       }
    }
    xhttp.open("POST", "/follow_user");

    //send post parameter...
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ "uid":uid_ }));
}

function unfollow_user(xhttp,testingVariable) {
  
    xhttp.onreadystatechange = function(testingVariable) {
      if (this.readyState == 4 && this.status == 200) { //response success
         document.getElementById("indauser").innerHTML = this.responseText;
         return testingVariable = "indauser"
      } else if (this.readyState == 4 && this.status == 504) { //timeout
         //document.getElementById("indafeed").innerHTML = this.responseText;
         //HANDLE TIMEOUTS! ERR NO CONNECTED!
         return testingVariable = "timeout"
       }
    }
    xhttp.open("POST", "/unfollow_user");

    //send post parameter...
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ "uid":uid_ }));
}


function logout() {
  return "logout"
}

module.exports = {
  fetch_gallery,  
  fetch_user,
  follow_user,
  unfollow_user,
  logout
}