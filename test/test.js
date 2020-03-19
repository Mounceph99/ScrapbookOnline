const assert = require('assert');
//const request = require('request');
const express = require('express');
const router = express.Router();
const functions = require('../test/functions/upload_function');


describe("Testing Login", function(){
it("User is already logged in, should follow through next action", function(){

    
    var req = {session:{email:"mounceph99@hotmail.com"}};
    var res = {};
    function nextStub(){
        return "I'm already logged in";

    };
    var result = functions.require_login(req,res,nextStub);

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
    var result = functions.require_login(req,res,nextStub);

    assert.equal(result,"/?e=1")

})

});


















/*
// TESTING FILE
// ALL TESTS REGARDING THE SCRAPBOOK ONLINE WEB APP ARE WRITTEN HERE

//
// POSTING RELATED TESTS 
//
describe('upload', () => {
    it('should not upload', () => {

    });
});

describe('storage', () => {
    it('temp', () => {

    });
});



describe('/post_image', () => {
    it('temp', () => {

    });
});


//
// COMMENTING RELATED TESTS 
//
describe('/send_comment', () => {
    it('temp', () => {

    });
});


describe('/fetch_comment', () => {
    it('temp', () => {

    });
});


//
// FOLLOWING RELATED TESTS 
//
describe('upload', () => {
    it('temp', () => {

    });
});


describe('upload', () => {
    it('temp', () => {

    });
});


//
// LOGIN RELATED TESTS 
//
describe('/login', () => {
    it('temp', () => {

    });
});

describe('/logout', () => {
    it('temp', () => {

    });
});

//
// REGISTER RELATED TESTS 
//
describe('/register', () => {
    it('temp', () => {

    });
});


//
// GLOBAL FEED RELATED TESTS 
//

describe('/fetch_feed', () => {
    it('temp', () => {

    });
});*/
