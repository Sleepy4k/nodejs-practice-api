var router = require('express').Router()

router.use('/api', require('./api'))
router.use('/', require('./web'))

module.exports = router