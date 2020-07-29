const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route 	GET api/profile/me
// @desc 	Get current user's profile
// @access 	Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ 
			user: req.user.id 
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user.' });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error.');
	}
});

// @route 	GET api/profile
// @desc 	Get all profiles
// @access 	Public
router.get('/', async (req, res) => {
	try {
		const allProfiles = await Profile.find().populate('user', ['name', 'avatar']);

		res.json(allProfiles);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server error.');
	}
});

// @route 	GET api/profile/user/:user_id
// @desc 	Get profile by user id
// @access 	Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const userProfile = await Profile.findOne({ 
			user: req.params.user_id 
		}).populate('user', ['name', 'avatar']);

		if (!userProfile) {
			return res.status(400).json({ msg: 'Profile not found.' })
		}

		res.json(userProfile);
	} catch (err) {
		console.log(err.message);
		
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found.' })
		}

		res.status(500).send('Server error.');
	}
});

// @route 	POST api/profile
// @desc 	Creates a new profile for given user or updates existing profile
// @access 	Private
router.post('/', [
	auth,
	[
		check('status', 'Status is required.').not().isEmpty(),
		check('skills', 'Skills are required.').not().isEmpty()
	]
], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty) {
		return res.status(400).json({ errors: errors.array() });
	}

	const {
		company, 
		website, 
		location, 
		skills, 
		status,
		bio, 
		githubUser, 
		youtube,
		twitter,
		facebook,
		instagram
	} = req.body

	// Build profile object
	const profileFields = {
		social: {},
		status, 
		skills: skills.split(',').map(skill => skill.trim()) // convert csv to array
	};
	profileFields.user = req.user.id;

	if (company) profileFields.company = company;
	if (website) profileFields.website = website;
	if (bio) profileFields.bio = bio;
	if (location) profileFields.location = location;
	if (githubUser) profileFields.githubUser = githubUser;

	// Build social object
	if (youtube) profileFields.social.youtube = youtube;
	if (facebook) profileFields.social.facebook = facebook;
	if (twitter) profileFields.social.twitter = twitter;
	if (instagram) profileFields.social.instagram = instagram;
	
	try {
		let profile = await Profile.findOne({ user: req.user.id });

		if (profile) {
			// Update existing profile
			profile = await Profile.findOneAndUpdate(
				{ user: req.user.id }, 
				{ $set: profileFields },
				{ new: true }
			);
			return res.json(profile);
		}
		
		// Create new profile
		profile = new Profile(profileFields);
		await profile.save();
		
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error.');
	}
});

// @route 	PUT api/profile/experience
// @desc 	Updates profile with experiences.
// @access 	PRIVATE
router.put('/experience', [
	auth,
	[
		check('title', 'Title is required.').not().isEmpty(),
		check('company', 'Company is required.').not().isEmpty(),
		check('from', 'Starting date is required.').not().isEmpty()
	]
], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const {
		title,
		company,
		from,
		desc,
		to,
		location,
		current
	} = req.body

	const newExp = {title, company, from};

	if (location) newExp.location = location;
	if (to) newExp.to = to;
	if (current) newExp.current = current;
	if (desc) newExp.desc = desc;

	try {
		const profile = await Profile.findOne({ user: req.user.id });
		profile.experience.unshift(newExp); // push to the beginning of array
		await profile.save();

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error.');
	}
});

// @route 	DELETE api/profile/
// @desc 	Deletes profile, user, and posts.
// @access 	Private
router.delete('/', auth, async (req, res) => {
	try {
	// @TODO Remove user's posts
	// Remove profile
	await Profile.findOneAndRemove({ user: req.user.id });

	// Remove user
	await User.findOneAndRemove({ _id: req.user.id });

	res.json({ msg: 'User deleted.' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error.');
	}
});

module.exports = router;
