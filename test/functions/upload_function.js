function upload_feature(){

  function upload(){


  }

  return {
    upload
  }

}

module.exports = upload_feature();

function login_feature(){

  function require_login(req, res, next) {

    if (req.session && req.session.email) {
      return next();
    } else {    
      return res.redirect('/?e=1')  
    }
  }

  return {
    require_login
    
  }


}

module.exports = login_feature();