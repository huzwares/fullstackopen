const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item.likes
	}

	return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return 0
	} else {
		const max = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
		return {
			title: max.title,
			author: max.author,
			likes: max.likes
		}
	}
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return 0
	}
	const authors = blogs.map(blog => blog.author)
	let authorMap = {}
	let mostRepeated = authors[0]
	let maxCount = 1
	for (let i = 0; i < authors.length; i++) {
		let item = authors[i]
		if (authorMap[item] == null) {
			authorMap[item] = 1
		} else {
			authorMap[item] += 1
		}
		if (authorMap[item] > maxCount) {
			mostRepeated = item;
			maxCount = authorMap[item]
		}
	}
	return {
		author: mostRepeated,
		blogs: maxCount
	}
}

module.exports = {
	dummy, totalLikes, favoriteBlog, mostBlogs
}