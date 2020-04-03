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

function postPicture(router, con) {
	router.post("/post_image", upload.single("data_filez"), function(req, res) {
		if (req.session && req.session.email) {
			if (req.fileValidationError) {
				return res.redirect("/dashboard?a=2");
			}
			if (req.file) {
				// do nothing
			} else {
				return res.redirect("/dashboard?a=3");
			}
			console.log("USER " + req.session.email + " posted an image.");
			con.query(
				"INSERT INTO posts VALUES (0,?,?,?,0)",
				[req.session.userid, req.file.filename, req.body.imagioyoyo],
				function(err) {
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
			res.redirect("/e=1");
		}
	});
}

function likePicture(router, con) {
	router.post("/post_likes", function(req, res) {
		if (req.session && req.session.email) {
			con.query("UPDATE posts SET likeCount = ? WHERE id = ?", [req.body.likes, req.body.zpostid], function(
				err
			) {
				if (err) {
					throw err;
				}
				res.end();
			});
			con.query("INSERT INTO likes VALUES (0,?,?)", [req.body.zpostid, req.session.userid], function(err) {
				if (err) {
					throw err;
				}
				res.end();
			});
		} else {
			res.send("FAIL TO LIKE");
		}
	});
	router.post("/like_once", function(req, res) {
		if (req.session && req.session.email) {
			con.query(
				"SELECT postid, whoLiked FROM likes WHERE postid = ? AND whoLiked = ?",
				[req.body.zpostid, req.session.userid],
				function(err, result) {
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

exports.postPicture = postPicture;
exports.likePicture = likePicture;
