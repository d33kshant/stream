const { generate: generateId } = require('shortid')

/**
 * @param {Request} req
 * @param {Response} res
 */
const streamVideo = (req, res) => {
	const { v: id } = req.query
	res.json({
		video_id: id
	})
}

const uploadVideo = (req, res) => {
	const id = generateId()
	res.json({
		video_id: id
	})
}

module.exports = { streamVideo, uploadVideo }