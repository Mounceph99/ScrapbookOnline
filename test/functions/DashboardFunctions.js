class Document {
  constructor() {
    this.document = "";
    this.style = { display: "" };
    this.value = { "": this.style, "": "ad0" }

  }

  getElementById(arg1) {
    return this.value;
  }
}

class FormData {
  constructor() {

  }
  append(arg1, arg2) {

  }
  entries() {
    return [1, 2, 3];
  }
}
//Variables to stub for tests
var data = new FormData();
var document = new Document();
var how_much_u_need;

function fetch_feed(xhttp, testingVariable) {

  xhttp.onreadystatechange = function (testingVariable) {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("indafeed").innerHTML = this.responseText;
      return testingVariable = "indafeed"
    }
  }
  xhttp.open("POST", "/fetch_feed");

  data = new FormData()
  data.append("numba", how_much_u_need)

  xhttp.send(data);
}

function store_file(e) {
  files = e.target.files;
  return e.target.files;
};


function post_image_ajax(xhttp, testingVariable) {

  xhttp.onreadystatechange = function (testingVariable) {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("feed").innerHTML += this.responseText;
      return testingVariable = "feed"
    }
  }
  xhttp.open("POST", "/post_image");

  var image_desc = document.getElementById("image_desc").value

  xhttp.setRequestHeader("Content-Type", "application/w-xxx-form-urlencoded")
  xhttp.setRequestHeader("enctype", "multipart/form-data")

  data = new FormData()
  data.append('imagio', image_desc)
  data.append('data_filez', files[0]);

  xhttp.send(data);
}



function like_post(postid, xhttp, testingVariable) {

  //Validate if user already liked the post 
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(postid.toString()).innerText = "+" + likeCount;
      return testingVariable = "postID"
    }
  }
  xhttp.open("POST", "/post_likes");

  var likeCount = document.getElementById(postid.toString()).innerText;
  likeCount++;

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ "likes": likeCount, "zpostid": postid }));

}



function likario(postid, xhttp, testingVariable) {
  xhttp.onreadystatechange = function (testingVariable) {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.response;
      if (result == "true") {
        like_post(postid,xhttp, testingVariable)
        document.getElementById("post_" + postid).className = "like_button_liked"
        return testingVariable = "Postupdated"
      }

    }
  }
  xhttp.open("POST", "/like_once");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ "zpostid": postid }));

}



function commentario(postid,xhttp, testingVariable) {
  
  xhttp.onreadystatechange = function (testingVariable) {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("indacomments").innerHTML = this.responseText;
      return testingVariable = "indacomments";
    }
  }
  xhttp.open("POST", "/fetch_comments");

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ "zpostid": postid }));
}


function logout() {
  return "logout"
}



function send_comment(postid,xhttp,testingVariable) {
  
  xhttp.onreadystatechange = function (testingVariable) {
    if (this.readyState == 4 && this.status == 200) {
      //document.getElementById("select_a_post").innerHTML = this.responseText;
      commentario(postid,xhttp,testingVariable)
      return testingVariable = "commentSent"
    }
  }
  xhttp.open("POST", "/send_comment");

  var comment = document.getElementById("comment_input").value

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ "zpostid": postid, "comment": comment }));
}

module.exports = {
  fetch_feed,
  store_file,
  post_image_ajax,
  like_post,
  likario,
  commentario,
  logout,
  send_comment
}