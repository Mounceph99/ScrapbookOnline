
function fetch_feed() {
    console.log("MAKING A POST REQUEST TO FETCH IMAGES!")
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           document.getElementById("indafeed").innerHTML = this.responseText;
        }
      }
      xhttp.open("POST", "/fetch_feed");

      data = new FormData()
      data.append("numba", how_much_u_need)

      xhttp.send(data);
}

function store_file(e){
  files = e.target.files;
};


function post_image_ajax() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       document.getElementById("feed").innerHTML+= this.responseText;
    }
  }
  xhttp.open("POST", "/post_image");

  var image_desc = document.getElementById("image_desc").value

  xhttp.setRequestHeader("Content-Type", "application/w-xxx-form-urlencoded")
  xhttp.setRequestHeader("enctype" , "multipart/form-data")

  data = new FormData()
  data.append('imagio', image_desc)
  data.append('data_filez', files[0]);
  for (var pair of data.entries()) {
    console.log(pair[0]+ ', ' + pair[1]);
  }

  xhttp.send(data);
}



function like_post(postid){

 //Validate if user already liked the post 
 var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(postid.toString()).innerText = "+"+likeCount;
    }
  }
  xhttp.open("POST", "/post_likes");

 var likeCount= document.getElementById(postid.toString()).innerText;
 likeCount= parseInt(likeCount.substring(1, likeCount.length));
 likeCount++;

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ "likes": likeCount, "zpostid": postid }));

}



function likario(postid){
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.response;
      console.log(result);
      if(result == "true")
      {
        like_post(postid)
        document.getElementById("post_"+postid).className = "like_button_liked"
      }
      
    }
  }
 xhttp.open("POST", "/like_once");
 xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
 xhttp.send(JSON.stringify({ "zpostid": postid }));

}



function commentario(postid) {
  console.log(postid)
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       document.getElementById("indacomments").innerHTML = this.responseText;
    }
  }
  xhttp.open("POST", "/fetch_comments");

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ "zpostid": postid }));
}


function logout() {
  window.location.href="/logout"
}



function send_comment(postid) {
  console.log(postid)
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       //document.getElementById("select_a_post").innerHTML = this.responseText;
       commentario(postid)
    }
  }
  xhttp.open("POST", "/send_comment");

  var comment = document.getElementById("comment_input").value

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ "zpostid": postid,  "comment" : comment}));
}

module.exports = {
    fetch_feed,
    store_file,
    post_image_ajax,
    like_post,
    likario,
    commentario,
    logout
    }