const assert = require('assert');
const functions = require('./functions/TestingFunction');

//Testing functions from main.js
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

    it("User is logged in, increment like couter on that post", function(){
        var req = {session:{email:"mounceph99@hotmail.com", userid:1234},
                  body:{likes:12, zpostid:111}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.like_feature().likeOnce(req,res,nextStub);
        assert.equal(result,true);
    })

    it("User is NOT logged in, do not increment like couter on that post", function(){
        var req = {};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.like_feature().likeOnce(req,res,nextStub);
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
describe("Testing General Feature", () => {
    const openDashboard = functions.general_feature().openDashboard;
    const loadDashboard = functions.general_feature().loadDashboardPage;
    const fetchFeed = functions.general_feature().fetchFeed;
    const loadProfile = functions.general_feature().loadProfilePage;
    const identity = (x) => { return x; }
    const logged_in = {
        session: {
            email: "user@gmail.com"
        }
    };
    const empty = {};
    const res = {
        redirect: identity,
        sendFile: identity
    };
    it("User logged in, should open dashboard", () => {
        assert.equal(openDashboard(logged_in, res, null), "/dashboard");
    });

    it("User is NOT logged in, should not open dashboard", () => {
        assert.equal(openDashboard(empty, res, null), "/client/index.html");
    });
    it("User is logged in, should load dashboard", () => {
        assert.equal(loadDashboard(logged_in, res, null), "/client/dashboard.html");
    });
    it("User logged in, should fetch feed", () => {
        assert.equal(fetchFeed(logged_in, null, null), "User : user@gmail.com is fetching the feed!");
    });
    it("user is logged in, should load profile page", () => {
        assert.equal(loadProfile(logged_in, res, null), "/client/user.html");
    })

    it ("User is undefined, should NOT load gallery", function(){
        var req = {body:{uid:null}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.general_feature().loadGallery(req,res,nextStub);
        assert.equal(result,"Undefined uid");
    })

    it ("User is less than zero, should NOT load gallery", function(){
        var req = {body:{uid:-1}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.general_feature().loadGallery(req,res,nextStub);
        assert.equal(result,"uid less than zero");
    })

    it ("User is logged in, should load gallery", function(){
        var req = {session:{email:"mounceph99@hotmail.com"},
                body:{uid:1}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.general_feature().loadGallery(req,res,nextStub);
        assert.equal(result,true);
    })

    it ("User is NOT logged in, should NOT load gallery", function(){
        var req = {body:{uid:1}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.general_feature().loadGallery(req,res,nextStub);
        assert.equal(result,false);
    })

    it ("User is undefined, should NOT fetch users", function(){
        var req = {body:{uid:null}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.general_feature().fetchUsers(req,res,nextStub);
        assert.equal(result,"Undefined uid");
    })

    it ("User is less than zero, should NOT fetch users", function(){
        var req = {body:{uid:-1}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.general_feature().fetchUsers(req,res,nextStub);
        assert.equal(result,"uid less than zero");
    })

    it ("User is logged in, should fetch users", function(){
        var req = {session:{email:"mounceph99@hotmail.com"},
                body:{uid:1}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.general_feature().fetchUsers(req,res,nextStub);
        assert.equal(result,true);
    })

    it ("User is NOT logged in, should NOT fetch users", function(){
        var req = {body:{uid:1}};
        var res = {};
        const nextStub = (isPassed) => { return isPassed }

        var result = functions.general_feature().fetchUsers(req,res,nextStub);
        assert.equal(result,false);
    })
    
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//Testing from dashboard.html