const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('get blog list (=3)', async () => {
	const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
	expect(response.body).toHaveLength(3)
})

afterAll(() => {
	mongoose.connection.close()
})