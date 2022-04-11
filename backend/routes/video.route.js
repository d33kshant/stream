const router = require('express').Router()
const { uploadVideo, getVideo } = require('../controllers/video.controller')

router.get('/', getVideo)
router.post('/upload', uploadVideo)

module.exports = router