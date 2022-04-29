const router = require('express').Router()
const { streamVideo, uploadVideo } = require('../controllers/video.controller')

router.get('/', streamVideo)
router.post('/', uploadVideo)

module.exports = router