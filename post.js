const md5 = require("md5"); //md5 hashing for password db
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, "./uploads/");
	},
	filename: function(req, file, cb) {
		if (file) cb(null, file.originalname + "-" + Date.now());
		else {
			req.fileValidationError = "Invalid file";
			cb(null, false);
		}
	}
});

var valid_types = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
var upload = multer({
	storage,
	fileFilter: function(req, file, cb) {
		if (valid_types.includes(file.mimetype)) {
			cb(null, true);
		} else {
			req.fileValidationError = "invalid file";
			cb(null, false);
		}
	}
});

function login(router, con) {
	router.post("/login", function(req, res, next) {
		const email = req.body.email;
		const password = req.body.password;
		//hash md5 and compare to db
		const hash = md5(password);
		//connect to db and verify
		con.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, hash], function(err, result) {
			if (err) {
				throw err;
			}
			if (result.length == 1) {
				console.log("User " + email + " has logged in successfully.");
				//set sessions variable
				req.session.email = email;
				req.session.userid = result[0]["uid"];
				res.send("SUCCESS");
			} else {
				res.send("FAIL");
			}
		});
	});
}

function register(router, con) {
	router.post("/register", function(req, res, next) {
		const register_email = req.body.register_email;
		const register_password = req.body.register_password;
		const register_confirm_password = req.body.register_confirm_password;
		//some text with no @'s or spaces followed by an @ then any domain
		const pattern = /^[^@\s]+@[^\.]+\..+$/g;
		const valid_password = (password, confirm_password) => {
			return password.length > 7 && password === confirm_password;
		};
		let password_correct = false;
		let email_correct = false;
		//1. check same password then check length
		//2. check email if contain email
		if (valid_password(register_password, register_confirm_password)) {
			password_correct = true;
		}
		if (pattern.test(register_email)) {
			//TODO send confirmation email
			email_correct = true;
		}
		const hash = md5(register_password);
		if (email_correct && password_correct) {
			con.query("SELECT * FROM users WHERE email = ?", [register_email], function(err, result) {
				if (err) {
					throw err;
				}
				if (result.length >= 1) {
					//failsafe
					console.log("User already exists.");
					res.end();
				} else {
					con.query("INSERT INTO users VALUES (0,?,?,?)", [register_email, hash, "default_avatar.png"], function(
						err,
						result
					) {
						if (err) {
							res.send("FAIL");
							throw err;
						} else {
							console.log(
								"A new user : " + register_email + " has just registered with user id : " + result["insertId"] + "."
							);
							req.session.email = register_email;
							req.session.userid = result["insertId"];
							res.send("SUCCESS"); //redirect in client browser
						}
					});
				}
			});
		} else {
			res.send("FAIL");
		}
	});
}

function postPicture(router, con) {
	router.post("/post_image", upload.single("data_filez"), function(req, res, next) {
		if (req.session && req.session.email) {
			if (req.fileValidationError) {
				console.log(req.fileValidationError);
				return res.redirect("/dashboard?a=2");
			}
			if (req.file) {
				//do nothing
			} else {
				return res.redirect("/dashboard?a=3");
			}
			console.log("USER " + req.session.email + " posted an image.");
			con.query(
				"INSERT INTO posts VALUES (0,?,?,?,0)",
				[req.session.userid, req.file.filename, req.body.imagioyoyo],
				function(err, result) {
					if (err) {
						res.end("FAIL TO POST");
						throw err;
					} else {
						console.log(
							"A new post from : " +
								req.session.email +
								" with user id : " +
								req.session.userid +
								" has been posted as  : " +
								req.file.filename +
								" with description : " +
								req.body.imagioyoyo
						);
					}
				}
			);
			res.redirect("/dashboard?a=1");
		} else {
			console.log("Failed.");
			res.redirect("/e=1");
		}
	});
}

function fetchFeed(router, con) {
	router.post("/fetch_feed", function(req, res, next) {
		if (req.session && req.session.email) {
			con.query(
				"SELECT * FROM posts LEFT JOIN users ON posts.userid=users.uid LEFT JOIN likes ON likes.postid=posts.id WHERE (likes.likeId NOT IN (SELECT DISTINCT A.likeId FROM likes A, likes B WHERE A.whoLiked <> B.whoLiked AND A.postid = B.postid AND A.whoLiked <> ? ) ) OR likes.likeId IS NULL ORDER BY posts.id DESC LIMIT 10",
				[req.session.userid],
				function(err, result) {
					if (err) {
						throw err;
					}
					const number = result.length;
					const used_id = req.session.userid;
					for (let i = 0; i < number; i++) {
						let html_post =
							"<div class='post'><div class='post_description'><span style='font-weight:bold;margin-right:20px;'><a href='/user?uid=" +
							result[i].userid +
							"'>" +
							result[i].email +
							"</a></span>" +
							result[i].description +
							"</div><div class='image_container'><img style='max-height:400px;' src='/uploads/" +
							result[i].filename +
							"'/></div>";

						if (result[i].whoLiked != used_id) {
							html_post +=
								"<div class='buttons_containah'><div id='post_" +
								result[i].id +
								"' class='like_button' onclick='likario(" +
								result[i].id +
								")'></div><div id='" +
								result[i].id +
								"'class='likes'>+" +
								result[i].likeCount +
								"</div><div class='commentario' onclick='commentario(" +
								result[i].id +
								")'></div></div></div>";
						} else {
							html_post +=
								"<div class='buttons_containah'><div id='post_" +
								result[i].id +
								"' class='like_button_liked' onclick='likario(" +
								result[i].id +
								")'></div><div id='" +
								result[i].id +
								"'class='likes'>+" +
								result[i].likeCount +
								"</div><div class='commentario' onclick='commentario(" +
								result[i].id +
								")'></div></div></div>";
						}
						res.write(html_post);
					}
					res.end();
				}
			);
			console.log("User : " + req.session.email + " is fetching the feed.");
		} else {
			res.send("Error : log back again.");
		}
	});
}

function likePicture(router, con) {
	router.post("/post_likes", function(req, res, next) {
		if (req.session && req.session.email) {
			con.query("UPDATE posts SET likeCount = ? WHERE id = ?", [req.body.likes, req.body.zpostid], function(
				err,
				result
			) {
				if (err) {
					throw err;
				}
				res.end();
			});
			con.query("INSERT INTO likes VALUES (0,?,?)", [req.body.zpostid, req.session.userid], function(err, result) {
				if (err) {
					throw err;
				}
				res.end();
			});
		} else {
			res.send("FAIL TO LIKE");
		}
	});
	router.post("/like_once", function(req, res, next) {
		if (req.session && req.session.email) {
			con.query(
				"SELECT postid, whoLiked FROM likes WHERE postid = ? AND whoLiked = ?",
				[req.body.zpostid, req.session.userid],
				function(err, result, field) {
					if (err) {
						throw err;
					}
					if (result.length == 0) {
						res.write("true");
					} else {
						res.write("false");
					}
					res.end();
				}
			);
		} else {
			res.send("Error in like_once API");
		}
	});
}

function fetchComments(router, con) {
	router.post("/fetch_comments", function(req, res, next) {
		if (req.session && req.session.email) {
			console.log(req.body);
			console.log(req.body.zpostid);
			con.query(
				"SELECT * FROM comments JOIN users ON comments.userid=users.uid WHERE postid = ? ORDER BY comments.id",
				[req.body.zpostid],
				function(err, result) {
					if (err) {
						throw err;
					}
					const number = result.length;
					res.write("<div class='numba_commentos'>" + number + " comments on this post</div>");
					for (let i = 0; i < number; i++) {
						let html_comments =
							"<div class='comment'><div class='commenter_user'>" +
							result[i].email +
							"</div><div class='zawords'>" +
							result[i].comment +
							"</div></div>";
						res.write(html_comments);
					}
					//write input for comments
					res.write(
						"<div class='input_container_send_message'><input type='text' id='comment_input' name='comment_input' placeholder='Your comment here...'/><button id='sendacomment' onclick='send_comment(" +
							req.body.zpostid +
							")'>Send</button></div>"
					);
					res.end();
				}
			);
			console.log("User : " + req.session.email + " is fetching comments from a post.");
		} else {
			res.send("Error : log back again.");
		}
	});
}

function sendComments(router, con) {
	router.post("/send_comment", function(req, res, next) {
		if (req.session && req.session.email) {
			console.log(req.body);
			console.log(req.body.comment);
			console.log(req.body.zpostid);
			con.query(
				"INSERT INTO comments VALUES (0,?,?,?)",
				[req.session.userid, req.body.zpostid, req.body.comment],
				function(err, result) {
					if (err) {
						throw err;
					}
				}
			);
			console.log("User : " + req.session.email + " posted a comment.");
			res.end();
		} else {
			res.send("Error : log back again.");
		}
	});
}

function fetchGallery(router, con) {
	router.post("/fetch_gallery", function(req, res, next) {
		console.log(req.body.uid);
		if (typeof req.body.uid == "undefined" || req.body.uid == null) {
			res.send("Error : try again.");
			res.end();
			return;
		} else {
			if (req.body.uid < 0) {
				res.send("Error : user does not exist.");
				res.end();
				return;
			}
		}
		if (req.session && req.session.email) {
			console.log(req.body.uid);
			con.query("SELECT * FROM posts WHERE userid = ? ORDER BY RAND() LIMIT 11", [req.body.uid], function(err, result) {
				if (err) {
					throw err;
				}
				if (result.length < 0) {
					res.send("Error :( This user this not exist... yet!");
					res.end();
					return;
				}
				console.log("User : " + req.session.email + " fetched user gallery for " + req.body.uid + ".");
				let html_to_send = "<div class='grid' style='width:100%;'>";
				console.log(result);
				html_to_send += "<div class='grid-sizer'>";
				for (let i = 0; i < result.length; i++) {
					//i is odd
					if (i & 1) {
						html_to_send += "<div class='grid-item grid-item--width2'>";
					} else {
						html_to_send += "<div class='grid-item'>";
					}
					html_to_send +=
						"<div class='m_image' style='background-image:url(/uploads/" +
						result[i].filename +
						");background-size:cover;'></div>";
					html_to_send += "</div>";
				}

				html_to_send += "</div></div>";
				res.write(html_to_send);
				res.end();
			});
		} else {
			res.send("Error : log back again.");
		}
	});
}

function fetchUsers(router, con) {
	router.post("/fetch_user", function(req, res, next) {
		console.log(req.body.uid);
		if (typeof req.body.uid == "undefined" || req.body.uid == null) {
			res.send("Error : try again.");
			res.end();
			return;
		} else {
			if (req.body.uid < 0) {
				res.send("Error : user does not exist.");
				res.end();
				return;
			}
		}
		if (req.session && req.session.email) {
			console.log(req.body.uid);
			con.query("SELECT * FROM users WHERE users.uid = ? LIMIT 1", [req.body.uid], function(err, result) {
				if (err) {
					throw err;
				}
				if (result.length <= 0) {
					res.send("Error : user does not exist.");
					res.end();
					return;
				}
				console.log("User : " + req.session.email + " fetched user " + req.body.uid + ".");
				let same_user = 0;
				if (req.session.userid == req.body.uid) {
					same_user = 1;
				}
				console.log(result);
				let avatar_filename = result[0].avatar_fn;
				if (
					typeof avatar_filename == "undefined" ||
					avatar_filename === null ||
					avatar_filename == "null" ||
					avatar_filename == "" ||
					avatar_filename == " "
				) {
					avatar_filename = "default_avatar.png";
				}
				console.log(avatar_filename);
				let html_to_send = "<div class='user_avatar_container'>";
				html_to_send += "<div class='user_avatar'><img class='avatar_img' src='/avatar/" + avatar_filename + "'></div>";
				html_to_send += "</div>";
				//show username
				var username = result[0].email;
				html_to_send += "<div class='username'>" + username + "</div>";

				html_to_send += "<div class='follow_or_scrap'>";
				con.query(
					"SELECT * FROM followers WHERE followers.followerid = ? AND followers.userid = ? LIMIT 1",
					[req.session.userid, req.body.uid],
					function(err, result) {
						if (err) {
							throw err;
						}
						const is_following = parseInt(result.length);
						console.log("Is following : " + is_following + ".");
						con.query("SELECT * FROM followers WHERE followers.userid = ?", [req.body.uid], function(err, result) {
							if (err) {
								throw err;
							}
							var follower_count = 0; //init
							follower_count = result.length;
							html_to_send += "<div class='numba_followers'>" + follower_count + " Follower(s)</div>";
							if (same_user <= 0) {
								//show follow button
								if (is_following <= 0) {
									html_to_send +=
										"<button class='button_user' id='id_button_follow' onclick='follow_user()'>Follow</button>";
								} else {
									html_to_send +=
										"<button class='unfollow_button_user' id='id_button_follow' onclick='unfollow_user()'>Unfollow</button>";
								}
							} else {
								//don't show follow button
							}
							html_to_send +=
								"<button class='button_user' id='id_scrap_button_user' onclick='scrap_user()'>Scrap</button>";
							html_to_send += "</div>";
							res.write(html_to_send);
							res.end();
						});
					}
				);
			});
		} else {
			res.send("Error : log back again.");
		}
	});
}

function unfollowUser(router, con) {
	router.post("/unfollow_user", function(req, res, next) {
		console.log(req.body.uid);
		if (typeof req.body.uid == "undefined" || req.body.uid == null) {
			res.send("Error : try again.");
			res.end();
			return;
		} else {
			if (req.body.uid < 0) {
				res.send("Error : user does not exist.");
				res.end();
				return;
			}
		}
		if (req.session && req.session.email) {
			console.log(req.body.uid);
			con.query("SELECT * FROM users WHERE users.uid = ? LIMIT 1", [req.body.uid], function(err, result) {
				if (err) {
					throw err;
				}
				if (result.length <= 0) {
					res.send("Error : user does not exist.");
					res.end();
					return;
				}
				console.log("User : " + req.session.email + " wants to unfollow user " + req.body.uid + ".");
				let same_user = 0;
				if (req.session.userid == req.body.uid) {
					same_user = 1;
					res.send("Error : you can't follow yourself.");
					res.end();
					return;
				}
				console.log(result);
				let avatar_filename = result[0].avatar_fn;
				if (
					typeof avatar_filename == "undefined" ||
					avatar_filename === null ||
					avatar_filename == "null" ||
					avatar_filename == "" ||
					avatar_filename == " "
				) {
					avatar_filename = "default_avatar.png";
				}
				console.log(avatar_filename);
				let html_to_send = "<div class='user_avatar_container'>";
				html_to_send += "<div class='user_avatar'><img class='avatar_img' src='/avatar/" + avatar_filename + "'></div>";
				html_to_send += "</div>";
				//show username
				const username = result[0].email;
				html_to_send += "<div class='username'>" + username + "</div>";
				html_to_send += "<div class='follow_or_scrap'>";
				con.query(
					"SELECT * FROM followers WHERE followers.followerid = ? AND followers.userid = ? LIMIT 1",
					[req.session.userid, req.body.uid],
					function(err, result) {
						if (err) {
							throw err;
						}
						const is_following = parseInt(result.length);
						//here is a query to count all of them
						con.query("SELECT * FROM followers WHERE followers.userid = ?", [req.body.uid], function(err, result) {
							if (err) {
								throw err;
							}
							let follower_count = 0; //init
							follower_count = result.length;
							if (is_following > 0) {
								con.query(
									"DELETE FROM followers WHERE followers.followerid = ? AND followers.userid = ?",
									[req.session.userid, req.body.uid],
									function(err, result) {
										html_to_send +=
											"<div class='numba_followers'>" + parseInt(follower_count - 1) + " Follower(s)</div>";
										html_to_send +=
											"<button class='button_user' id='id_button_follow' onclick='follow_user()'>Follow</button>";
										html_to_send +=
											"<button class='button_user' id='id_scrap_button_user' onclick='scrap_user()'>Scrap</button>";
										html_to_send += "</div>";
										res.write(html_to_send);
										res.end();
									}
								);
							} else {
								html_to_send += "<div class='numba_followers'>" + follower_count + " Follower(s)</div>";
								html_to_send +=
									"<button class='button_user' id='id_button_follow' onclick='follow_user()'>Follow</button>";
								html_to_send +=
									"<button class='button_user' id='id_scrap_button_user' onclick='scrap_user()'>Scrap</button>";
								html_to_send += "</div>";
								res.write(html_to_send);
								res.end();
							}
						});
					}
				);
			});
		} else {
			res.send("Error : log back again.");
		}
	});
}

function followUser(router, con) {
	router.post("/follow_user", function(req, res, next) {
		console.log(req.body.uid);
		if (typeof req.body.uid == "undefined" || req.body.uid == null) {
			res.send("Error : try again.");
			res.end();
			return;
		} else {
			if (req.body.uid < 0) {
				res.send("Error : user does not exist.");
				res.end();
				return;
			}
		}
		if (req.session && req.session.email) {
			console.log(req.body.uid);
			con.query("SELECT * FROM users WHERE users.uid = ? LIMIT 1", [req.body.uid], function(err, result) {
				if (err) {
					throw err;
				}
				if (result.length <= 0) {
					res.send("Error : user does not exist.");
					res.end();
					return;
				}
				console.log("User : " + req.session.email + " wants to follow user " + req.body.uid + ".");
				var same_user = 0;
				if (req.session.userid == req.body.uid) {
					same_user = 1;
					res.send("Error : you can't follow yourself.");
					res.end();
					return;
				}
				console.log(result);
				let avatar_filename = result[0].avatar_fn;
				if (
					typeof avatar_filename == "undefined" ||
					avatar_filename === null ||
					avatar_filename == "null" ||
					avatar_filename == "" ||
					avatar_filename == " "
				) {
					avatar_filename = "default_avatar.png";
				}
				console.log(avatar_filename);
				let html_to_send = "<div class='user_avatar_container'>";
				html_to_send += "<div class='user_avatar'><img class='avatar_img' src='/avatar/" + avatar_filename + "'></div>";
				html_to_send += "</div>";
				//show username
				const username = result[0].email;
				html_to_send += "<div class='username'>" + username + "</div>";
				html_to_send += "<div class='follow_or_scrap'>";
				con.query(
					"SELECT * FROM followers WHERE followers.followerid = ? AND followers.userid = ? LIMIT 1",
					[req.session.userid, req.body.uid],
					function(err, result) {
						if (err) {
							throw err;
						}
						const is_following = parseInt(result.length);
						con.query("SELECT * FROM followers WHERE followers.userid = ?", [req.body.uid], function(err, result) {
							if (err) {
								throw err;
							}
							let follower_count = 0; //init
							follower_count = result.length;
							if (is_following <= 0) {
								con.query("INSERT INTO followers VALUES (0,?,?)", [req.body.uid, req.session.userid], function(
									err,
									result
								) {
									html_to_send += "<div class='numba_followers'>" + parseInt(follower_count + 1) + " Follower(s)</div>";
									html_to_send +=
										"<button class='unfollow_button_user' id='id_button_follow' onclick='unfollow_user()'>Unfollow</button>";
									html_to_send +=
										"<button class='button_user' id='id_scrap_button_user' onclick='scrap_user()'>Scrap</button>";
									html_to_send += "</div>";
									res.write(html_to_send);
									res.end();
								});
							} else {
								html_to_send += "<div class='numba_followers'>" + follower_count + " Follower(s)</div>";
								html_to_send +=
									"<button class='unfollow_button_user' id='id_button_follow' onclick='unfollow_user()'>Unfollow</button>";
								html_to_send +=
									"<button class='button_user' id='id_scrap_button_user' onclick='scrap_user()'>Scrap</button>";
								html_to_send += "</div>";
								res.write(html_to_send);
								res.end();
							}
						});
					}
				);
			});
		} else {
			res.send("Error : log back again.");
		}
	});
}

exports.login = login;
exports.register = register;
exports.postPicture = postPicture;
exports.fetchFeed = fetchFeed;
exports.likePicture = likePicture;
exports.fetchComments = fetchComments;
exports.sendComments = sendComments;
exports.fetchGallery = fetchGallery;
exports.fetchUsers = fetchUsers;
exports.unfollowUser = unfollowUser;
exports.followUser = followUser;
