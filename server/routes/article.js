const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Article = require('../models/Article')

// @route GET api/articles
// @desc Get articles
// @access Private
router.get('/', verifyToken, async (req, res) => {
	try {
		const articles = await Article.find({ author: req.userId }).populate('author',  ['username'])
		res.json({ success: true, articles })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route POST api/articles
// @desc Create articles
// @access Private
router.post('/', verifyToken, async (req, res) => {
	const { title, content, author, attachment, likeCount } = req.body

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

	try {
		const newArticle = new Article({
			title,
			content,
			likeCount: 0,
			attachment ,
			author: req.userId
		})

		await newArticle.save()

		res.json({ success: true, message: 'Happy Article!', article: newArticle })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route PUT api/articles
// @desc Update articles
// @access Private
router.put('/:id', verifyToken, async (req, res) => {	
  const { title, content, attachment } = req.body

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

	try {
		let updatedArticle = {
			title,
			content: content || '',
			attachment: attachment || ''			
		}

		const articleUpdateCondition = { _id: req.params.id, author: req.userId }

		updatedArticle = await Article.findOneAndUpdate(
			articleUpdateCondition,
			updatedArticle,
			{ new: true }
		)

		// User not authorised to update post or post not found
		if (!updatedArticle)
			return res.status(401).json({
				success: false,
				message: 'Article not found or user not authorised'
			})

		res.json({
			success: true,
			message: 'Excellent progress!',
			article: updatedArticle
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route DELETE api/articles
// @desc Delete articles
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
  
	try {
		const articleDeleteCondition = { _id: req.params.id, author: req.userId }
		const deletedArticle = await Article.findOneAndDelete(articleDeleteCondition)

		// User not authorised or post not found
		if (!deletedArticle)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({ success: true, article: deletedArticle })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router
