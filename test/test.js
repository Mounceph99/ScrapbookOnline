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
});

describe("Testing Like", function(){
    it("User is logged in, should like post", function(){
        var req = {session:{email:"mounceph99@hotmail.com", userid:1234},
                  body:{likes:12, zpostid:111}};
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

describe("Testing Comments", function(){
    it("User is logged in, should fetch comments on post", function(){
        var req = {session:{email:"mounceph99@hotmail.com"},
                body:{zpostid:111}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.comment_feature().fetchComments(req,res,nextStub);
        assert.equal(result,true);
    })

    it("User is NOT logged in, should NOT fetch comments on post", function(){
        var req = {};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.comment_feature().fetchComments(req,res,nextStub);
        assert.equal(result,false);
    })

    it("User is logged in, should send comments", function(){
        var req = {session:{email:"mounceph99@hotmail.com"},
                body:{comment:"This is a comment", zpostid:111}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.comment_feature().sendComments(req,res,nextStub);
        assert.equal(result,true);
    })

    it ("User is NOT logged in, should NOT send comments", function(){
        var req = {};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.comment_feature().sendComments(req,res,nextStub);
        assert.equal(result,false);
    })
});

describe("Testing Follow", function(){
    it ("User is undefined, should NOT unfollow user", function(){
        var req = {body:{uid:null}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.follow_feature().unfollowUser(req,res,nextStub);
        assert.equal(result,"Undefined uid");
    })

    it ("User is less than zero, should NOT unfollow user", function(){
        var req = {body:{uid:-1}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.follow_feature().unfollowUser(req,res,nextStub);
        assert.equal(result,"uid less than zero");
    })

    it ("User is logged in, should unfollow user", function(){
        var req = {session:{email:"mounceph99@hotmail.com"},
                body:{uid:1}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.follow_feature().unfollowUser(req,res,nextStub);
        assert.equal(result,true);
    })

    it ("User is NOT logged in, should NOT unfollow user", function(){
        var req = {body:{uid:1}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.follow_feature().unfollowUser(req,res,nextStub);
        assert.equal(result,false);
    })

    it ("User is undefined, should NOT follow user", function(){
        var req = {body:{uid:null}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.follow_feature().followUser(req,res,nextStub);
        assert.equal(result,"Undefined uid");
    })

    it ("User is less than zero, should NOT follow user", function(){
        var req = {body:{uid:-1}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.follow_feature().followUser(req,res,nextStub);
        assert.equal(result,"uid less than zero");
    })

    it ("User is logged in, should follow user", function(){
        var req = {session:{email:"mounceph99@hotmail.com"},
                body:{uid:1}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.follow_feature().followUser(req,res,nextStub);
        assert.equal(result,true);
    })

    it ("User is NOT logged in, should NOT follow user", function(){
        var req = {body:{uid:1}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.follow_feature().followUser(req,res,nextStub);
        assert.equal(result,false);
    })
});

describe("Testing General Feature", () => {
    const openDashboard = functions.general_feature().openDashboard;
    it("User logged in, should open dashboard", () => {
        const req = {
            session: {
                email: "user@gamil.com"
            }
        };
        const res = {
            redirect: (path) => { return path; }
        };
        assert.equal(openDashboard(req, res, null), "/dashboard");
    });
    it("User is NOT logged in, should not open dashboard", () => {
        const req = {};
        const res = {
            sendFile: (path) => { return path; }
        };
        assert.equal(openDashboard(req, res, null), "/client/index.html");
    });
});