const md5 = require("md5"); // md5 hashing for password db

function login(router, con) {
	router.post("/login", function(req, res) {
		const email = req.body.email;
		const password = req.body.password;
		// hash md5 and compare to db
		const hash = md5(password);
		// connect to db and verify
		con.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, hash], function(err, result) {
			if (err) {
				throw err;
			}
			if (result.length == 1) {
				console.log("User " + email + " has logged in successfully.");
				// set sessions variable
				req.session.email = email;
				req.session.userid = result[0]["uid"];
				res.send("SUCCESS");
			} else {
				res.send("FAIL");
			}
		});
	});
}

function logout(router) {
	router.get("/logout", function(req, res, next) {
		if (req.session) {
			// delete session object
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
}

function register(router, con) {
	router.post("/register", function(req, res) {
		const register_email = req.body.register_email;
		const register_password = req.body.register_password;
		const register_confirm_password = req.body.register_confirm_password;
		// some text with no @'s or spaces followed by an @ then any domain
		const pattern = /^[^@\s]+@[^.]+\..+$/g;
		const valid_password = (password, confirm_password) => {
			return password.length > 7 && password === confirm_password;
		};
		let password_correct = false;
		let email_correct = false;
		// 1. check same password then check length
		// 2. check email if contain email
		if (valid_password(register_password, register_confirm_password)) {
			password_correct = true;
		}
		if (pattern.test(register_email)) {
			// TODO send confirmation email
			email_correct = true;
		}
		const hash = md5(register_password);
		if (email_correct && password_correct) {
			con.query("SELECT * FROM users WHERE email = ?", [register_email], function(err, result) {
				if (err) {
					throw err;
				}
				if (result.length >= 1) {
					// failsafe
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
							res.send("SUCCESS"); // redirect in client browser
						}
					});
				}
			});
		} else {
			res.send("FAIL");
		}
	});
}

exports.login = login;
exports.logout = logout;
exports.register = register;
