const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	const blogPosts = helper.initialBlog.map(blog => new Blog(blog))
	const promiseArray = blogPosts.map(blog => blog.save())
	await Promise.all(promiseArray)
})

test('get blog list', async () => {
	const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
	expect(response.body).toHaveLength(helper.initialBlog.length)
}, 10000)

test('check unique identiifier', async () => {
	const response = await api.get('/api/blogs')
	response.body.forEach(blog => {
		expect(blog.id).toBeDefined()
	});
})

test('post new blog post', async () => {
	const newBlogPost = {
		title: "fourth posts",
		author: "fso 2022",
		url: "https://fullstackopen.com/en/part4/",
		likes: 4
	}
	await api.post('/api/blogs').send(newBlogPost).expect(201).expect('Content-Type', /application\/json/)
	const blogList = await helper.blogList()
	expect(blogList).toHaveLength(helper.initialBlog.length + 1)

})

test('post new blog post without like', async () => {
	const newBlogPost = {
		title: "fourth posts",
		author: "fso 2022",
		url: "https://fullstackopen.com/en/part4/"
	}
	await api.post('/api/blogs').send(newBlogPost).expect(201).expect('Content-Type', /application\/json/)
	const blogList = await helper.blogList()
	expect(blogList).toHaveLength(helper.initialBlog.length + 1)
})

test('post new blog without title', async () => {
	const newBlogPost = {
		author: "fso 2022",
		url: "https://fullstackopen.com/en/part4/",
		likes: 4
	}
	await api.post('/api/blogs').send(newBlogPost).expect(400)
})

test('post new blog without url', async () => {
	const newBlogPost = {
		title: "fourth posts",
		author: "fso 2022",
		likes: 4
	}
	await api.post('/api/blogs').send(newBlogPost).expect(400)
})

test('delete blog post', async () => {
	const list = await helper.blogList()
	const postToDelete = list[0]

	await api.delete(`/api/blogs/${postToDelete.id}`).expect(204)
})

test('update blog post', async () => {
	const list = await helper.blogList()
	const postToUpdate = list[0]
	console.info(postToUpdate)
	const newBlogPost = {
		title: "updated posts",
		author: "updated author",
		url: "udated url",
		likes: (postToUpdate.likes * 10)
	}

	await api.put(`/api/blogs/${postToUpdate.id}`).send(newBlogPost).expect(204)
})

afterAll(() => {
	mongoose.connection.close()
})