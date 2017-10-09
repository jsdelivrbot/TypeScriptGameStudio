const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

function extractProfile(profile){

	let imageURL = '';

	console.log(profile.email);

	if(profile.photos && profile.photos.length){
		imageURL = profile.photos[0].value;
	}
	return {
		id : profile.id,
		email : profile.email,
		displayName : profile.displayName,
		image : imageURL
	};
}

passport.use(new GoogleStrategy({
	clientID : process.env.OAuth_ID,
	clientSecret: process.env.OAuth_Secret,
	callbackURL : process.env.OAuth_LocalCallback,
}, (accessToken, refreshToken, profile, cb) => {
	cb(null, extractProfile(profile));
}));

passport.serializeUser((user, cb) => {
	cb(null, user);
});

passport.deserializeUser((obj, cb) => {
	cb(null, obj)
});

const router = express.Router();

/*
	Requires the user to be logged in. If the user is not logged in, it will
	redurect them to the login page.
*/
function authRequired(req, res, next){
	if(!req.user){
		req.session.oauth2return = req.originalUrl;
		return res.redirect('/auth/login');
	}
	next();
}

/*
	Exposes the user's profile as well as login/logout URLs to templates.
*/
function addTemplateVariables (req, res, next) {
  res.locals.profile = req.user;
  res.locals.login = `/login?return=${encodeURIComponent(req.originalUrl)}`;
  res.locals.logout = `/logout?return=${encodeURIComponent(req.originalUrl)}`;
  next();
}


router.get(
	'/auth/login',
  	
  	passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
	'/auth/callback',

	passport.authenticate('google', { failureRedirect: '/auth/login' }),

	(req, res) => {
		res.redirect("/home");
	}
);

router.get(
	'/auth/logout', 
	
	(req, res) => {
		req.logout();
		res.redirect('/home');
	}
);

module.exports = {
	extractProfile : extractProfile,
	router : router,
	required : authRequired,
	template : addTemplateVariables
};