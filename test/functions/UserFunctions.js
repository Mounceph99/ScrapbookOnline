function fetch_gallery(uid) {
    console.log("fetching gallery")
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { //response success
           document.getElementById("indagallery").innerHTML = this.responseText;
           $('.grid').masonry({
           // set itemSelector so .grid-sizer is not used in layout
             itemSelector: '.grid-item',
             // use element for option
             columnWidth: '.grid-sizer',
             percentPosition: true,
             originLeft: true
           })

        } else if (this.readyState == 4 && this.status == 504) { //timeout
           //document.getElementById("indafeed").innerHTML = this.responseText;
           //HANDLE TIMEOUTS! ERR NO CONNECTED!
         }
      }
      xhttp.open("POST", "/fetch_gallery");

      //send post parameter...
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(JSON.stringify({ "uid":uid }));
}

function fetch_user(uid) {
  console.log("fetching user")
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { //response success
         document.getElementById("indauser").innerHTML = this.responseText;

      } else if (this.readyState == 4 && this.status == 504) { //timeout
         //document.getElementById("indafeed").innerHTML = this.responseText;
         //HANDLE TIMEOUTS! ERR NO CONNECTED!
       }
    }
    xhttp.open("POST", "/fetch_user");

    //send post parameter...
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ "uid":uid }));
}

function follow_user() {
  console.log(uid_);
  console.log("following user")
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { //response success
         document.getElementById("indauser").innerHTML = this.responseText;

      } else if (this.readyState == 4 && this.status == 504) { //timeout
         //document.getElementById("indafeed").innerHTML = this.responseText;
         //HANDLE TIMEOUTS! ERR NO CONNECTED!
       }
    }
    xhttp.open("POST", "/follow_user");

    //send post parameter...
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ "uid":uid_ }));
}

function unfollow_user() {
  console.log(uid_);
  console.log("following user")
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { //response success
         document.getElementById("indauser").innerHTML = this.responseText;

      } else if (this.readyState == 4 && this.status == 504) { //timeout
         //document.getElementById("indafeed").innerHTML = this.responseText;
         //HANDLE TIMEOUTS! ERR NO CONNECTED!
       }
    }
    xhttp.open("POST", "/unfollow_user");

    //send post parameter...
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ "uid":uid_ }));
}


function logout() {
  window.location.href="/logout"
}