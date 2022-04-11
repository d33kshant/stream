const path = require('path')
const shortid = require('shortid')
const pool = require('../db')

/**
 * @param {Request} req
 * @param {Response} res
 */
const getVideo = async (req, res) => {
	const { id } = req.query
	const page = req.query.page || 1
	const limit = 10

	const offset = (page-1) * limit

	try {
		if (id) {
			const query_result = await pool.query(
				'SELECT * FROM video WHERE id=$1;',
				[id]
			)
			res.json(query_result.rows[0])
		} else {
			const query_result = await pool.query(
				'SELECT * FROM video LIMIT $1 OFFSET $2;',
				[limit, offset]
			)
			res.json({
				videos: query_result.rows
			})
		}
	} catch (error) {
		res.json({
			error: "Something went wrong."
		})
	}
}
 
/**
 * @param {Request} req
 * @param {Response} res
 */
const uploadVideo = async (req, res) => {
	try {
		const file = req.files['file']
		if (!file) {
			return res.json({
				error: "No file to upload."
			})
		}

		if (file.mimetype !== 'video/mp4') {
			return res.json({
				error: "File must be a mp4 video."
			})
		}

		const id = shortid.generate()
		const newFile = path.join(__dirname, path.join('..', path.join('files', `${id}.mp4`)))
		await file.mv(newFile)

		res.json({
			message: "File uploaded successfully.",
			url: `${process.env.BASE_URL}/video/${id}.mp4`
		})
	} catch (error) {
		res.json({
			error: "Something went wrong.",
		})
	}
}

module.exports = { getVideo, uploadVideo }