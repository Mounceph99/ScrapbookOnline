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

exports.fetchFeed = fetchFeed;
exports.fetchGallery = fetchGallery;
exports.fetchUsers = fetchUsers;
