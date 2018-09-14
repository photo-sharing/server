const route = require('express').Router()
const GCSController = require('../controllers/GCSController')
const upload = require('../helpers/GCSUploader')
const {auth} = require('../middleware/auth')

route.post('/', upload.multer.single('image'), upload.sendUploadToGCS,GCSController.updloadImage)
route.delete('/:id', auth, GCSController.delete)
route.get('/', GCSController.findAll)
route.put('/:id', GCSController.updateReport)

module.exports = route