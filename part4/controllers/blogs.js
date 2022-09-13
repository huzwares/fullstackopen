const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7)
	}
	return null
}

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	const token = getTokenFrom(request)
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const creator = await User.findById(decodedToken.id)
	if (body.title == undefined || body.url == undefined) {
		response.status(400).end()
	} else {
		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes || 0,
			user: creator._id
		})

		const savedBlogPost = await blog.save()
		creator.blogs = creator.blogs.concat(savedBlogPost._id)
		await creator.save()
		response.status(201).json(savedBlogPost)
	}
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
	const newPost = {
		title: body.title || oldBlogPost.title,
		author: body.author || oldBlogPost.author,
		url: body.url || oldBlogPost.url,
		likes: body.likes || oldBlogPost.likes

	}
	const updatedPost = await Blog.findByIdAndUpdate(request.params.id, newPost, { new: true })
	response.status(204).json(updatedPost)
})

module.exports = blogsRouter