function unfollowUser(router, con) {
	router.post("/unfollow_user", function(req, res) {
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
				if (req.session.userid == req.body.uid) {
					res.send("Error : you can't follow yourself.");
					res.end();
					return;
				}
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
				let html_to_send = "<div class='user_avatar_container'>";
				html_to_send += "<div class='user_avatar'><img class='avatar_img' src='/avatar/" + avatar_filename + "'></div>";
				html_to_send += "</div>";
				// show username
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
						// here is a query to count all of them
						con.query("SELECT * FROM followers WHERE followers.userid = ?", [req.body.uid], function(err, result) {
							if (err) {
								throw err;
							}
							let follower_count = 0; // init
							follower_count = result.length;
							if (is_following > 0) {
								con.query(
									"DELETE FROM followers WHERE followers.followerid = ? AND followers.userid = ?",
									[req.session.userid, req.body.uid],
									function() {
										html_to_send +=
											"<div class='numba_followers'>" + parseInt(follower_count - 1) + " Follower(s)</div>";
										html_to_send +=
											"<button class='button_user' id='id_button_follow' onclick='follow_user()'>Follow</button>";
										html_to_send += "</div>";
										res.write(html_to_send);
										res.end();
									}
								);
							} else {
								html_to_send += "<div class='numba_followers'>" + follower_count + " Follower(s)</div>";
								html_to_send +=
									"<button class='button_user' id='id_button_follow' onclick='follow_user()'>Follow</button>";
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
	router.post("/follow_user", function(req, res) {
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
				if (req.session.userid == req.body.uid) {
					res.send("Error : you can't follow yourself.");
					res.end();
					return;
				}
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
				let html_to_send = "<div class='user_avatar_container'>";
				html_to_send += "<div class='user_avatar'><img class='avatar_img' src='/avatar/" + avatar_filename + "'></div>";
				html_to_send += "</div>";
				// show username
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
							let follower_count = 0; // init
							follower_count = result.length;
							if (is_following <= 0) {
								con.query("INSERT INTO followers VALUES (0,?,?)", [req.body.uid, req.session.userid], function(
								) {
									html_to_send += "<div class='numba_followers'>" + parseInt(follower_count + 1) + " Follower(s)</div>";
									html_to_send +=
										"<button class='unfollow_button_user' id='id_button_follow' onclick='unfollow_user()'>Unfollow</button>";
									html_to_send += "</div>";
									res.write(html_to_send);
									res.end();
								});
							} else {
								html_to_send += "<div class='numba_followers'>" + follower_count + " Follower(s)</div>";
								html_to_send +=
									"<button class='unfollow_button_user' id='id_button_follow' onclick='unfollow_user()'>Unfollow</button>";
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

exports.unfollowUser = unfollowUser;
exports.followUser = followUser;
