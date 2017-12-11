const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

function extractProfile(profile){

	let imageURL = '';

	return {
		id : profile.id,
		email : profile.email,
		displayName : profile.displayName
	};

}

/*
	==Important==

	Change the callbackURL key in the below function to 
	process.env.OAuth_LocalCallback if testing locally or
	process.env.OAuth_Callback if pushing to production.
*/
passport.use(new GoogleStrategy({
	clientID : process.env.OAuth_ID,
	clientSecret: process.env.OAuth_Secret,
	callbackURL : process.env.OAuth_Callback,
}, (accessToken, refreshToken, profile, cb) => {
	cb(null, extractProfile(profile));
}));

passport.serializeUser((user, cb) => {
	cb(null, user);
});

passport.deserializeUser((obj, cb) => {
	cb(null, obj)
});

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

const router = express.Router();

router.get(

	'/auth/login',

  	passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(

	'/auth/callback',

	passport.authenticate('google', { failureRedirect: '/auth/login' }),

	(req, res) => {

		/*
			Check if the user is in the database. If so, continue, if not,
			add the account to it
		*/
		if(req.app.connection){
			req.app.database.addNewAccount(req.app.connection, {
				id : req.user.id,
				email : req.user.email,
				displayName : req.user.displayName
			});
		}
		res.redirect("/account");
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
};
