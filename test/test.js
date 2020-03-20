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

});

describe("Testing register", () => {
    const nextStub = (isPassed) => { return isPassed }
    const register = functions.register_feature().registerNewUser;
    it("User successfully registers", () => {
        const req = {
            body: {
                register_email: "user@gmail.com", 
                register_password: "password", 
                register_confirm_password: "password"
            }
        };
        const res = {};
        assert.equal(register(req, res, nextStub), true);
    });
    it("Invalid email prevents registration", () => {
        const req = {
            body: {
                register_email: "user@yahoo.com",
                register_password: "password",
                register_confirm_password: "password"
            }
        };
        const res = {};
        assert.equal(register(req, res, nextStub), false);
    });
    it("Mismatched passwords prevents registration", () => {
        const req = {
            body: {
                register_email: "user@gmail.com",
                register_password: "password",
                register_confirm_password: "passwrod"
            }
        };
        const res = {};
        assert.equal(register(req, res, nextStub), false);
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
