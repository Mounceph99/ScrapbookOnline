//Empty test
function upload_feature() {
  function upload() {}

  return {
    upload
  };
}

//ALL FUNCTIONS RELATED TO LOGIN
function login_feature() {
  function require_login(req, res, next) {
    if (req.session && req.session.email) {
      return next();
    } else {
      return res.redirect("/?e=1");
    }
  }

  function loginUser(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    //hash md5 and compare to db
    var hash = md5(password);

    if (next) {
      //Success, user  logged in
      return !next(1);
    } else {
      //Error, no user
      return !next(0);
    }
  }

  function logoutUser(req, res, next) {
    if (req.session) {
      if (req.session.email)
        console.log(
          "User " + req.session.email + " has successfully logged out..."
        );

      if (next) {
        return true;
      } else {
        return res.redirect("/?e=2");
      }
    }
  }

  return {
    require_login,
    loginUser,
    logoutUser
  };
}

//ALL FUNCTIONS RELATED TO REGISTERING
function register_feature() {
  function registerNewUser(req, res, next) {
    var register_email = req.body.register_email;
    var register_password = req.body.register_password;
    var register_confirm_password = req.body.register_confirm_password;

    //DO VERIFICATION STUFF
    //1.check same password then check length
    //2. check email if contain email , do regex
    var password_correct = false;
    if (register_password === register_confirm_password) {
      password_correct = true;
    }
    var email_correct = false;
    var pattern = /(@hotmail.com|@gmail.com|@hotmail.ca|@gmail.ca)/g;
    //REGEX here
    if (pattern.test(register_email)) {
      email_correct = true;
    }

    if (email_correct && password_correct) {
      return next(true);
    } else {
      return next(false);
    }
  }

  return {
    registerNewUser
  };
}

//ALL FUNCTIONS RELATED TO COMMENTING
function comment_feature() {
  function fetchComments(req, res, next) {
    if (req.session && req.session.email) {
      return next(true);
    } else {
      return next(false);
    }
  }

  function sendComments(req, res, next) {
    if (req.session && req.session.email) {
      return next(true);
    } else {
      return next(false);
    }
  }

  return {
    fetchComments,
    sendComments
  };
}

//ALL FUNCTIONS RELATED TO POSTING A PICTURE
function posting_feature() {
  function postPicture(req, res, next) {
    if (req.session && req.session.email) {
      if (req.fileValidationError) {
        return res.redirect("/dashboard?a=2");
      }

      if (req.file) {
      } else {
        return res.redirect("/dashboard?a=3");
      }

      res.redirect("/dashboard?a=1");
    } else {
      res.redirect("/e=1");
    }
  }

  return {
    postPicture
  };
}

//ALL FUNCTIONS RELATED TO FOLLOWING
function follow_feature() {
  function unfollowUser(req, res, next) {
    if (typeof req.body.uid == "undefined" || req.body.uid == null) {
      return next("Undefined uid");
    } else {
      if (req.body.uid < 0) {
        return next("uid less than zero");
      }
    }
    if (req.session && req.session.email) {
      return next(true);
    } else {
      return next(false);
    }
  }

  function followUser(req, res, next) {
    if (typeof req.body.uid == "undefined" || req.body.uid == null) {
      return next("Undefined uid");
    } else {
      if (req.body.uid < 0) {
        return next("uid less than zero");
      }
    }
    if (req.session && req.session.email) {
      return next(true);
    } else {
      return next(false);
    }
  }

  return {
    unfollowUser,
    followUser
  };
}

//ALL FUNCTIONS RELATED TO LIKING POST
function like_feature() {
  function likePicture(req, res, next) {
    if (req.session && req.session.email) {
      return next(true);
    } else {
      return next(false);
    }
  }

  return {
    likePicture
  };
}

//ALL FUNCTIONS RELATED TO GENERAL USE OF WEB APP
function general_feature() {
  function openDashboard(req, res) {
    if (req.session && req.session.email) {
      return res.redirect("/dashboard");
    } else {
      return res.sendFile("/client/index.html");
    }
  }
  function loadDashboardPage(req, res, next) {
    return res.sendFile("/client/dashboard.html");
  }

  function fetchFeed(req, res, next) {
    if (req.session && req.session.email) {
      return "User : " + req.session.email + " is fetching the feed!";
    } else {
      res.send("Error :( log back again");
    }
  }

  function loadProfilePage(req, res, next) {
    return res.sendFile("/client/user.html");
  }

  function loadGallery(req, res, next) {
    if (typeof req.body.uid == "undefined" || req.body.uid == null) {
      return next("Undefined uid");
    } else {
      if (req.body.uid < 0) {
        return next("uid less than zero");
      }
    }
    if (req.session && req.session.email) {
      return next(true);
    } else {
      return next(false);
    }
  }

  function fetchUsers(req, res, next) {
    if (typeof req.body.uid == "undefined" || req.body.uid == null) {
      return next("Undefined uid");
    } else {
      if (req.body.uid < 0) {
        return next("uid less than zero");
      }
    }
    if (req.session && req.session.email) {
      return next(true);
    } else {
      return next(false);
    }
  }

  return {
    openDashboard,
    loadProfilePage,
    fetchFeed,
    loadDashboardPage,
    loadGallery,
    fetchUsers
  };
}

module.exports = {
  upload_feature,
  login_feature,
  register_feature,
  comment_feature,
  posting_feature,
  follow_feature,
  general_feature,
  like_feature
};
