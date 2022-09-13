const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
	await User.deleteMany({})
	const users = helper.initialUsers.map(user => new User(user))
	const promiseArray = users.map(user => user.save())
	await Promise.all(promiseArray)
}, 100000)

test('get user list', async () => {
	const response = await api.get('/api/users').expect('Content-Type', /application\/json/)
	expect(response.body).toHaveLength(helper.initialUsers.length)
}, 100000)

test('fails to create user without username', async () => {
	const newUser = {
		name: "gholi",
		password: "12345"
	}
	const result = await api.post('/api/users').send(newUser)
	console.log(result)
}, 100000)

test('fails to create user without password', async () => {
	const newUser = {
		username: "NewUser",
		name: "James Doe"
	}
	await api.post('/api/users').send(newUser).expect(400)
}, 100000)

test('fails to create user with short username', async () => {
	const newUser = {
		username: "aa",
		name: "James Doe",
		password: "12345password"
	}
	await api.post('/api/users').send(newUser).expect(400)
}, 100000)

test('fails to create user with short password', async () => {
	const newUser = {
		username: "user10",
		name: "James Doe",
		password: "pa"
	}
	await api.post('/api/users').send(newUser).expect(400)
}, 100000)

afterAll(() => {
	mongoose.connection.close()
})