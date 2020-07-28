const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// @route 	POST api/users
// @desc 	Register user
// @access 	Public
router.post('/', [
	check('name', 'Name is required.').not().isEmpty(),
	check('email', 'Please include a valid email.').isEmail(),
	check('password', 'Please enter a password with 6 or more character').isLength({ min: 6 })
], (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// Bad request
		return res.status(400).json({ errors: errors.array() });
	}

	// TODO: See if user exists

	// TODO: Get users Gravatar

	// TODO: Enrypt password
	
	// TODO: Return JWT

	res.send('User route');
});

module.exports = router;
