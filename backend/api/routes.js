const express = require('express')

const router = express.Router()

router.route('/hello')
		.get((req, res) => {
			res.json({
				hello: 'hello my friend'
			})
		})

module.exports = router