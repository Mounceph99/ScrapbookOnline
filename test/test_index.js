const assert = require('assert');
const functions = require('./functions/IndexFunctions');

//Created a stub class for testing
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
  }

describe("Testing Functions from index.html", () => {
    describe("Testing login", () => {
       var xhttp = new XMLHttpRequest();
       var testingVariable = "unsuccessful test"
       
        it("User logged in successfully", function () {

            functions.login(testingVariable, xhttp);
            var result = xhttp.onreadystatechange(testingVariable);
            assert.equal(result, "/dashboard");
        })

        it("User was not able to login", function(){
            xhttp.setResponseText("FAILED");

            functions.login(testingVariable, xhttp);
            var result = xhttp.onreadystatechange(testingVariable);
            assert.equal(result, "block");
        })
    })

    describe("Testing register", () => {
        var xhttp = new XMLHttpRequest();
        var testingVariable = "unsuccessful test"
        
         it("User registered in successfully", function () {
 
             functions.register(testingVariable, xhttp);
             var result = xhttp.onreadystatechange(testingVariable);
             assert.equal(result, "/dashboard");
         })
 
         it("User was not able to register", function(){
             xhttp.setResponseText("FAILED");
 
             functions.register(testingVariable, xhttp);
             var result = xhttp.onreadystatechange(testingVariable);
             assert.equal(result, "block");
         })
     })


})