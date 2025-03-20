const {createPlaylist, getPlaylists, getPlaylistById} = require('../controllers/playlist.controller')
const router = require('express').Router()


router.post('/add', createPlaylist)
router.get('/all', getPlaylists)
router.get('/:id', getPlaylistById)

module.exports = router