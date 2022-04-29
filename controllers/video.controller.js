const fs = require('fs')
const path = require('path')
// const mime = require('mime-type')
const { generate: generateId } = require('shortid')

/**
 * @param {Request} req
 * @param {Response} res
 */
const streamVideo = (req, res) => {
	const { v: id } = req.query
	const range = req.headers.range

	if (!range) {
		return res.json({
			error: "Range is missing in headers."
		})
	}

	try {
		const filePath = path.join(__dirname, '..', 'videos', `${id}`)
		const fileSize = fs.statSync(filePath).size
		const fileType = "video/mp4" //mime.lookup(filePath)

		const CHUNK_SIZE = 10**6
		const start = Number(range.replace(/\D/g, ""))
		const end = Math.min(start + CHUNK_SIZE, fileSize - 1)
		const contentLength = end - start + 1

		const headers = {
			"Content-Range": `bytes ${start}-${end}/${fileSize}`,
			"Accept-Ranges": "bytes",
			"Content-Length": contentLength,
			"Content-Type": fileType,
		}

		res.writeHead(206, headers)
		const videoStream = fs.createReadStream(filePath, { start, end })
		videoStream.pipe(res)
	}catch (error) {
		if (error.code === 'ENOENT') {
			res.status(404).json({
				error: "File not found."
			})
		}
	}
}

/**
 * @param {Request} req
 * @param {Response} res
 */
const uploadVideo = (req, res) => {
	const id = generateId()
	res.json({
		video_id: id
	})
}

module.exports = { streamVideo, uploadVideo }