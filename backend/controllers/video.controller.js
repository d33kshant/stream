const path = require('path')
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

module.exports = { getVideo }