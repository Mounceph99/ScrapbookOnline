"use strict";

/*
 * Title : SOEN341_scrapbook
 * Author : Iyad Al-Kassab @ UConcordia
 * Date : 25/02/2020
 * Description : Basic demo showcase where it answers to POST requests and send data
 * Installed dependencies (non standard module) : express, mysql
 *
 * How it works : start by running a standard server and connect to DB
 */

//dependencies
const express = require("express"); //express minimal JS framework
const path = require("path"); //to resolve directory when sendFile html (app.get response.sendFile())
const http = require("http"); //for http server...
const mysql = require("mysql"); //db for historical data
const session = require("express-session"); //for sessions
const account = require("./account");
const comment = require("./comments");
const general = require("./general");
const picture = require("./picture");
const post = require("./post");

async function initialize_server(con) {
	try {
		console.log("Initializing Server...");
		const app = express();
		const router = express.Router();
		var server_instance = http.createServer(app);
		server_instance.listen(8080);
		console.log("Listening on 127.0.0.1:8080");
		//create sessions
		app.use(
			session({
				secret: "trytocrackthis",
				resave: true,
				saveUninitialized: false
			})
		);

		//prepare the GET response to return main index
		//General feature
		//Function Name: openDashboard
		router.get("/", function(req, res) {
			if (req.session && req.session.email) {
				res.redirect("/dashboard");
			} else {
				res.sendFile(path.join(__dirname + "/client/index.html"));
			}
		});

		//requireslogin middleware
		function require_login(req, res, next) {
			if (req.session && req.session.email) {
				return next();
			} else {
				return res.redirect("/?e=1");
			}
		}

		//parse json
		app.use(express.json());

		//Account feature
		account.login(router, con);
		account.register(router, con);
		//General features
		general.fetchFeed(router, con);
		general.fetchGallery(router, con);
		general.fetchUsers(router, con);
		//Picture Features
		picture.postPicture(router, con);
		picture.likePicture(router, con);
		//Comments feature
		comment.fetchComments(router, con);
		comment.sendComments(router, con);
		//Follow Feature
		post.unfollowUser(router, con);
		post.followUser(router, con);

		//General feature
		//Function name: loadDashboardPage
		router.get("/dashboard", require_login, function(req, res, next) {
			res.sendFile(path.join(__dirname + "/client/dashboard.html"));
		});

		//General feature
		//Profile page
		//Function name: loadProfilePage
		router.get("/user", require_login, function(req, res, next) {
			res.sendFile(path.join(__dirname + "/client/user.html"));
		});

		// GET /logout
		//Login feature
		//Function name: logoutUser
		router.get("/logout", function(req, res, next) {
			if (req.session) {
				//delete session object
				if (req.session.email) console.log("User " + req.session.email + " has successfully logged out...");
				req.session.destroy(function(err) {
					if (err) {
						return next(err);
					} else {
						return res.redirect("/?e=2");
					}
				});
			}
		});

		//add the router to the express app
		app.use("/", router);
		//add to the app the route to all static files (csv data, images, etc)
		app.use(express.static(__dirname + "/"));
		app.use(express.static(__dirname + "/client/"));
		app.use(express.static(__dirname + "/client/assets/"));
		console.log("Server ready and running.");

		//return the promise of having a server instance
		return server_instance;
	} catch (err) {
		console.log(err);
	}
}

/////////////////////////////////////
///
/// DB init
///
/////////////////////////////////////

async function initDB() {
	let con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "", // corresponding password
		database: "scrapbook", // use the specified database
		acquireTimeout: 100000,
		port: 3306
	});
	con.connect(function(err) {
		if (err) throw err;
	});
	return con;
}

//initialize server
initDB().then((con_instance) => {
	initialize_server(con_instance);
});

module.exports = "Main";
