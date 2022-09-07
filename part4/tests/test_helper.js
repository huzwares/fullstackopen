const Blog = require('../models/blog')

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

const blogList = async () => {
	const list = await Blog.find({})
	return list.map(blog => blog.toJSON())
}

module.exports = {
	initialBlog, blogList
}