function fetchComments(router, con) {
	router.post("/fetch_comments", function(req, res) {
		if (req.session && req.session.email) {
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
						const html_comments =
							"<div class='comment'><div class='commenter_user'>" +
							result[i].email +
							"</div><div class='zawords'>" +
							result[i].comment +
							"</div></div>";
						res.write(html_comments);
					}
					// write input for comments
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
	router.post("/send_comment", function(req, res) {
		if (req.session && req.session.email) {
			con.query(
				"INSERT INTO comments VALUES (0,?,?,?)",
				[req.session.userid, req.body.zpostid, req.body.comment],
				function(err) {
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

exports.fetchComments = fetchComments;
exports.sendComments = sendComments;
