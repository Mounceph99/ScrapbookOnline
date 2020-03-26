const assert = require('assert');
const functions = require('./functions/UserFunctions');

class XMLHttpRequest {
    constructor() {
      this.readyState = 4;
      this.status = 200;
      this.responseText = "SUCCESS";
      this.onreadystatechange;
    };
  
    open(arg1, arg2) {
  
    }
    setRequestHeader(arg1, arg2){
  
    }
    send(a){
  
    }
    setResponseText(arg1){
        this.responseText = arg1;
    }
    setStatus(arg1){
        this.status = arg1;
    }
  }

describe("Testing Functions from user.html", () => {

    describe("Testing fetch_gallery", () => {
       var xhttp = new XMLHttpRequest();
       var testingVariable = "unsuccessful test"

        
        it("Successfully fetched the gallery", function () {

            functions.fetch_gallery(1,xhttp,testingVariable);
            var result = xhttp.onreadystatechange(testingVariable);
            assert.equal(result, "grid");
        })

        it("Timeout, did not fetched the gallery", function () {
            xhttp.setStatus(504)
            functions.fetch_gallery(1,xhttp,testingVariable);
            var result = xhttp.onreadystatechange(testingVariable);
            assert.equal(result, "timeout");
        })


    })

    describe("Testing fetch_user", () => {
        var xhttp = new XMLHttpRequest();
        var testingVariable = "unsuccessful test"
 
         
         it("Successfully fetched user", function () {
 
             functions.fetch_user(1,xhttp,testingVariable);
             var result = xhttp.onreadystatechange(testingVariable);
             assert.equal(result, "indauser");
         })
 
         it("Timeout, did not fetched user", function () {
             xhttp.setStatus(504)
             functions.fetch_user(1,xhttp,testingVariable);
             var result = xhttp.onreadystatechange(testingVariable);
             assert.equal(result, "timeout");
         })
 
 
     })

    describe("Testing follow_user", () => {
        var xhttp = new XMLHttpRequest();
        var testingVariable = "unsuccessful test"
 
         
         it("Successfully followed user", function () {
 
             functions.fetch_user(1,xhttp,testingVariable);
             var result = xhttp.onreadystatechange(testingVariable);
             assert.equal(result, "indauser");
         })
 
         it("Timeout, did not follow user", function () {
             xhttp.setStatus(504)
             functions.fetch_user(1,xhttp,testingVariable);
             var result = xhttp.onreadystatechange(testingVariable);
             assert.equal(result, "timeout");
         })

    })

    describe("Testing unfollow_user", () => {
        var xhttp = new XMLHttpRequest();
        var testingVariable = "unsuccessful test"
 
         
         it("Successfully unfollowed user", function () {
 
             functions.fetch_user(1,xhttp,testingVariable);
             var result = xhttp.onreadystatechange(testingVariable);
             assert.equal(result, "indauser");
         })
 
         it("Timeout, did not unfollow user", function () {
             xhttp.setStatus(504)
             functions.fetch_user(1,xhttp,testingVariable);
             var result = xhttp.onreadystatechange(testingVariable);
             assert.equal(result, "timeout");
         })

    })

    describe("Testing logout", () => {
        
        it("User succesfully logged", function () {
            var result = functions.logout();
            assert(result, "logout");
        })


    })


})

