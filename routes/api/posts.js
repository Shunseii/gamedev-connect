const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route 	POST api/posts
// @desc 	Create a post
// @access 	Private
router.post('/', [
	auth,
	[check('text', 'Text is required').not().isEmpty()]
], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const user = await User.findById(req.user.id).select('-password');

		const post = new Post({
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			author: req.user.id
		});
	
		await post.save();

		res.json(post);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error.');
	}
});

// @route 	GET api/posts
// @desc 	Get all posts
// @access 	Public
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 }); // sort by newest
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error.');
	}
});

// @route 	GET api/posts/:post_id
// @desc 	Get a post with given post id
// @access 	Public
router.get('/:post_id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);

		if (!post) {
			return res.status(404).json({ msg: 'Post not found.' });
		}

		res.json(post);
	} catch (err) {
		console.error(err.message);

		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found.' });
		}

		res.status(500).send('Server error.');
	}
});

// @route 	DELETE api/posts/:post_id
// @desc 	Delete a post
// @access 	Private
router.delete('/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);

		if (!post) {
			return res.status(404).json({ msg: 'Post not found.' });
		}

		// Check user
		if (req.user.id !== post.author.toString()) {
			return res.status(401).json({ msg: 'You do not have access.' });
		}

		await post.remove();

		res.json({ msg: 'Post deleted.' });
	} catch (err) {
		console.error(err.message);
		
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found.' });
		}
		
		res.status(500).send('Server error.');
	}
});

// @route 	PUT api/posts/like/:post_id
// @desc 	Add like to post
// @access 	Private
router.put('/:post_id/like', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);

		if (!post) {
			return res.status(404).json({ msg: 'Post not found.' });
		}

		// Author of post cannot like post
		if (req.user.id === post.author.toString()) {
			return res.json({ msg: 'Author cannot like post.' });
		}

		// If user has liked the post already
		if (post.likes.find(like => like.user.toString() === req.user.id)) {
			return res.status(400).json({ msg: 'Cannot like post again.' });
		}

		post.likes.unshift({ user: req.user.id });
		await post.save();
		
		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		
		if (err.kind == 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found.' });
		}
		
		res.status(500).send('Server error.');
	}
});

// @route 	DELTE api/posts/:post_id/like
// @desc 	Removes like from post
// @access 	Private
router.delete('/:post_id/like', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);

		if (!post) {
			return res.status(404).json({ msg: 'Post not found.' });
		}
		
		// Check if user liked post
		const removeIndex = post.likes.findIndex(like => like.user.toString() === req.user.id);

		// If user has not liked post
		if (removeIndex === -1) {
			return res.status(400).json({ msg: 'Cannot unlike post.' });
		}

		// Remove user's like from post
		post.likes.splice(removeIndex, 1);
		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		
		if (err.kind == 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found.' });
		}
		
		res.status(500).send('Server error.');
	}
});

// @route 	POST api/posts/:post_id/comment
// @desc 	Adds comment to a post
// @access 	Private
router.post('/:post_id/comment', [
	auth,
	[check('text', 'Comment must contain text.').not().isEmpty()]
], async (req, res) => {	
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	
	try {
		const post = await Post.findById(req.params.post_id);
		const user = await User.findById(req.user.id).select('-password');

		const newComment = {
			user: req.user.id,
			text: req.body.text,
			name: user.name,
			avatar: user.avatar
		};

		post.comments.unshift(newComment);
		await post.save();

		res.json(post.comments);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error.');
	}
});

// @route 	DELETE api/posts/:post_id/comment/:comment_id
// @desc 	Deletes comment from a post
// @access 	Private
router.delete('/:post_id/comment/:comment_id', auth, async (req, res) => {	
	try {
		const post = await Post.findById(req.params.post_id);

		// Get remove index
		const removeIndex = post.comments.findIndex(comment => comment._id.toString() === req.params.comment_id);

		// Check if comment exists
		if (removeIndex === -1) {
			return res.status(400).json({ msg: 'Comment not found.' });
		}

		const commentToDel = post.comments[removeIndex];
		
		// If user is not the comment author
		if (commentToDel.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'You do not have access.' });
		}

		// Remove comment
		post.comments.splice(removeIndex, 1);
		await post.save();

		res.json(post.comments);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error.');
	}
});

module.exports = router;
