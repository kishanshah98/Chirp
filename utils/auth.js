const withAuth = (req, res, next) => {

  if (!req.session.loggedIn) {
    res.redirect('/signin');
  } else {
   
    next();
  }
};

module.exports = withAuth;
