const assert = require('assert');
const functions = require('./functions/DashboardFunctions');

class XMLHttpRequest {
    constructor() {
        this.readyState = 4;
        this.status = 200;
        this.responseText = "SUCCESS";
        this.onreadystatechange;
        this.response = "true";
    };

    open(arg1, arg2) {

    }
    setRequestHeader(arg1, arg2) {

    }
    send(a) {

    }
    setResponseText(arg1) {
        this.responseText = arg1;
    }
    setStatus(arg1) {
        this.status = arg1;
    }
}

describe("Testing Functions from dashboard.html", () => {

    describe("Testing fetch_feed", () => {

        var xhttp = new XMLHttpRequest();
        var testingVariable = "unsuccessful test"

        it("Successfully fetched the feed", function () {

            functions.fetch_feed(xhttp, testingVariable);
            var result = xhttp.onreadystatechange(testingVariable);
            assert.equal(result, "indafeed");
        })
    })

    describe("Testing store_file", () => {
        var e = { target: { files: "testfile" } };
        var result = functions.store_file(e);

        it("Successfully stored file", function () {
            assert.equal(result, "testfile");
        })
    })

    describe("Testing post_image_ajax", () => {
        var xhttp = new XMLHttpRequest();
        var testingVariable = "unsuccessful test"

        it("Successfully post image", function () {

            functions.post_image_ajax(xhttp, testingVariable);
            var result = xhttp.onreadystatechange(testingVariable);
            assert.equal(result, "feed");
        })
    })

    describe("Testing like_post", () => {
        var xhttp = new XMLHttpRequest();
        var testingVariable = "unsuccessful test"

        it("Successfully liked image", function () {

            functions.like_post(1, xhttp, testingVariable);
            var result = xhttp.onreadystatechange(testingVariable);
            assert.equal(result, "postID");
        })
    })

    describe("Testing likario", () => {
        var xhttp = new XMLHttpRequest();
        var testingVariable = "unsuccessful test"

        it("Successfully liked image", function () {

            functions.likario(1, xhttp, testingVariable);
            var result = xhttp.onreadystatechange(testingVariable);
            assert.equal(result, "Postupdated");
        })
    })

    describe("Testing commentario", () => {
        var xhttp = new XMLHttpRequest();
        var testingVariable = "unsuccessful test"

        it("Successfully commented on post", function () {

            functions.commentario(1, xhttp, testingVariable);
            var result = xhttp.onreadystatechange(testingVariable);
            assert.equal(result, "indacomments");
        })
    })

    describe("Testing logout", () => {
        
        it("User succesfully logged", function () {
            var result = functions.logout();
            assert(result, "logout");
        })


    })

    describe("Testing send_comment", () => {
        var xhttp = new XMLHttpRequest();
        var testingVariable = "unsuccessful test"

        it("Successfully sent comment on post", function () {

            functions.send_comment(1, xhttp, testingVariable);
            var result = xhttp.onreadystatechange(testingVariable);
            assert.equal(result, "commentSent");
        })
    })


})