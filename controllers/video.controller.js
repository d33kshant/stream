const fs = require('fs')
const path = require('path')
// const mime = require('mime-type')
const { generate: generateId } = require('shortid')
const pool = require('../database')

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
		const fileType = "video/mp4"

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
const uploadVideo = async (req, res) => {
	const id = generateId()
	try {
		if (!req.files) {
			return res.json({
				error: "No file to upload."
			})
		}

		const file = req.files['video']
		const name = file.name
		const extension = name.substring(name.lastIndexOf('.'), name.length)

		const newName = `${id}${extension}`
		const newPath = path.join(__dirname, '..', 'videos', newName)
		await file.mv(newPath)

		await pool.query(
			'INSERT INTO videos (id, title, author, thumbnail) VALUES ($1, $2, $3, $4);',
			[newName, name.substring(0, name.lastIndexOf('.')), 1, `/thumbnails/${id}.jpg`]
		)

		await pool.query('INSERT INTO views (video) VALUES ($1);', [newName])

		res.json({
			messge: "Video uploaded successfuly.",
			url: process.env.BASR_URL + '/watch?v=' + newName 
		})
	} catch (_) {
		res.json({
			error: "Something went wrong."
		})
	}
}

/**
 * @param {Request} req
 * @param {Response} res 
 */
const getVideos = async (req, res) => {
	
	const { p } = req.query || 0
	const offset = p-1 >= 0 ? p-1 : 0

	try {
		const query_result = await pool.query(
			'SELECT videos.id AS vid, title, time, thumbnail, username AS author, count AS views FROM users INNER JOIN videos ON author=users.id INNER JOIN views ON videos.id=video OFFSET $1 LIMIT 10;',
			[offset]
		)
		res.json([...query_result.rows])
	} catch(error) {
		res.json({
			error: "Something went wrong.",
			payload: error
		})
	}
}

/**
 * @param {Request} req
 * @param {Response} res
 */
const updateViews = async (req, res) => {
	const { id } = req.params
	try {
		await pool.query('UPDATE views SET count = count + 1 WHERE video=$1;', [id]);
		res.json({
			message: "Added view in count."
		})
	} catch (error) {
		res.json({
			error: "Somthing went wrong."
		})
	}
}

module.exports = { streamVideo, uploadVideo, getVideos, updateViews }