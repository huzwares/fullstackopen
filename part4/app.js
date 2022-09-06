const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to database')
mongoose.connect(config.MONGODB_URI).then(() => {
	logger.info("connected to database")
}).catch(error => {
	logger.error("connot connect to database: ", error.message)
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app