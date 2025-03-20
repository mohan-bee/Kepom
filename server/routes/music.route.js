const { getAllMusic,addMusic,getMusicById } = require('../controllers/music.controller')

const router = require('express').Router()

router.get('/all', getAllMusic)
router.get('/:id', getMusicById)
router.post('/add', addMusic)

module.exports = router