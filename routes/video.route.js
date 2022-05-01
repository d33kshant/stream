const router = require('express').Router()
const { streamVideo, uploadVideo, getVideos, updateViews } = require('../controllers/video.controller')

router.get('/', getVideos)
router.post('/', uploadVideo)
router.get('/stream', streamVideo)
router.get('/view/:id', updateViews)

module.exports = router