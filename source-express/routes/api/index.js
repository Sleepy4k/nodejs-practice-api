var router = require('express').Router()

require(`./users`)(router)
require(`./tasks`)(router)

module.exports = router;