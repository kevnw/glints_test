const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.resolve(__dirname, '..', 'views', 'index.html'));
})

// Load Profile route
router.use('/profiles', require('./profile'))

module.exports = router
