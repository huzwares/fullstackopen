const Blog = require('../models/blog')
const User = require('../models/User')

const initialBlog = [
	{
		title: "hello world",
		author: "fso 2022",
		url: "https://fullstackopen.com/en/part4/",
		likes: 5
	},
	{
		title: "second posts",
		author: "fso 2022",
		url: "https://fullstackopen.com/en/part4/",
		likes: 2
	},
	{
		title: "third posts",
		author: "fso 2022",
		url: "https://fullstackopen.com/en/part4/",
		likes: 12
	}
]

const initialUsers = [
	{
		username: "user1",
		name: "John Doe",
		password: "password12345"
	},
	{
		username: "user2",
		name: "Jane Doe",
		password: "12345password"
	}
]

const blogList = async () => {
	const list = await Blog.find({})
	return list.map(blog => blog.toJSON())
}

module.exports = {
	initialBlog, blogList, initialUsers
}