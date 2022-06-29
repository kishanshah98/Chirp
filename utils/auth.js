const withAuth = (req, res, next) => {

  if (!req.session.loggedIn) {
    res.redirect('/signIn');
  } else {
   
    next();
  }
};

module.exports = withAuth;
