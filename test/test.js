const assert = require('assert');
const functions = require('../test/functions/upload_function');


describe("Testing Login", function(){
it("User is already logged in, should follow through next action", function(){

    
    var req = {session:{email:"mounceph99@hotmail.com"}};
    var res = {};
    function nextStub(){
        return "I'm already logged in";

    };
    var result = functions.login_feature().require_login(req,res,nextStub);

    assert.equal(result,"I'm already logged in")

})

it("User is NOT logged in, redirect to login page", function(){

    function redirect(){
        return "/?e=1";
    }
    var req = {session:{email:""}};
    var res = {redirect};
    function nextStub(){
        return "I'm already logged in";

    };
    var result = functions.login_feature().require_login(req,res,nextStub);

    assert.equal(result,"/?e=1")

})

it("User should connect to the current session",function(){
    function nextStub(a){
        if (a == 0){
            return true;
        }
        else{
            return false;
        }
        var req = {body : {email : "", password : ""}};
        var res ={};

        var result = functions.login_feature().loginUser(req,res,nextStub(0));

        assert.equal(result, true);

    };
});

it("User should NOT connect to the current session",function(){
    function nextStub(a){
        if (a == 0){
            return true;
        }
        else{
            return false;
        }
        var req = {body : {email : "", password : ""}};
        var res ={};

        var result = functions.login_feature().loginUser(req,res,nextStub(1));

        assert.equal(result, false);

    };
});

it("Logged in User can logout, destroy session",function(){
    function nextStub(a){
            return a;
    }

    function redirect(){
        return "/?e=2";
    }

    function destroy (temp){
        return 1;
    }

        var req = {session : {email : "user@gmail.com",destroy}};
        var res = {redirect};

        var result = functions.login_feature().logoutUser(req,res,nextStub(true));

        assert.equal(result, true);

    
});

it("Logged in User can logout, but error destroying session", function(){
    function nextStub(a){
            return a;
    }

    function redirect(){
        return "/?e=2";
    }

    function destroy (temp){
        err = true;
    }


        var req = {session : {email : "user@gmail.com",destroy}};
        var res = {redirect};

        var result = functions.login_feature().logoutUser(req,res,nextStub(false));

        assert.equal(result, "/?e=2");

    
});

});




describe("Testing register", () => {
    it("User successfully registers", () => {
        const nextStub = (isPassed) => { return isPassed }
        const req = {
            body: {
                register_email: "user@gmail.com", 
                register_password: "password", 
                register_confirm_password: "password"
            }
        };
        const res = {};
        assert.equal(functions.register_feature().registerNewUser(req, res, nextStub), true);
    });
    it("Incorrect email prevents registration", () => {

    });

describe("Testing Like Feature", function(){
    it("User is logged in, should like post", function(){
        var req = {session:{email:"mounceph99@hotmail.com", userid:1234},
                  body:{likes:12, zpostid:111}
                };
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.like_feature().likePicture(req,res,nextStub);
        assert.equal(result,true);
    })

    it("User is NOT logged in, should NOT like post", function(){
        var req = {};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.like_feature().likePicture(req,res,nextStub);
        assert.equal(result,false);
    })

});

});

describe("Testing Posting", function(){
    it('Logged in User is not allowed upload files of wrong extension', function(){

        var req = {session:{email:"mounceph99@hotmail.com"}, fileValidationError : "none"};
        var res = {redirect};

        function redirect(a){
            return a;
        }

        var result = functions.posting_feature().postPicture(req,res,null);

        assert.equal(result, "/dashboard?a=2");

    })

    it('Logged in User tried to upload file nothing', function(){

        var req = {session:{email:"mounceph99@hotmail.com"}};
        var res = {redirect};

        function redirect(a){
            return a;
        }

        var result = functions.posting_feature().postPicture(req,res,null);

        assert.equal(result, "/dashboard?a=3");

    })

    it('Logged in User uploaded a valid file', function(){

        var req = {session:{email:"mounceph99@hotmail.com"},  
                    file : "somefile.png"};
        var res = {redirect};
        var flag = "";
        function redirect(a){
            flag = a;
            return a;
        }

        var result = functions.posting_feature().postPicture(req,res,null);

        assert.equal(flag, "/dashboard?a=1");

    })

    it('Not Logged in User shold be sent back to login page', function(){

        var req = {};
        var res = {redirect};
        var flag = "";
        function redirect(a){
            flag = a;
            return a;
        }

        var result = functions.posting_feature().postPicture(req,res,null);

        assert.equal(flag, "/e=1");

    })
})
