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

module.exports = {
	dummy, totalLikes, favoriteBlog
}