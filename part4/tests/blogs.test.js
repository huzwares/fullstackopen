const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('get blog list (=3)', async () => {
	const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
	expect(response.body).toHaveLength(3)
})

test('check unique identiifier', async () => {
	const response = await api.get('/api/blogs')
	response.body.forEach(blog => {
		expect(blog.id).toBeDefined()
	});
})

afterAll(() => {
	mongoose.connection.close()
})