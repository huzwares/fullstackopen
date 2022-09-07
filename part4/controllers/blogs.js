const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	if (body.title == undefined || body.url == undefined) {
		response.status(400).end()
	} else {
		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes || 0
		})

		const result = await blog.save()
		response.status(201).json(result)
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