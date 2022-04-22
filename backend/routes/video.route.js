const router = require('express').Router()
const { streamVideo, uploadVideo } = require('../controllers/video.controller')

router.get('/stream', streamVideo)
router.post('/', uploadVideo)

module.exports = router