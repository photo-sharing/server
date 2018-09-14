const GSC = require('../models/Photo')
const GCSUploader = require('../helpers/GCSUploader')

class GCSController {

    static updloadImage(req, res) {

        let obj = {
            url : req.file.cloudStoragePublicUrl,
            description : req.body.description,
            tags : []
        }

        let gsc = new GSC(obj)

        gsc.save()
        .then(data => {
            res.status(201).json({
                success : true,
                data : data
            })
        })
        .catch(err => {
            res.status(500).json({
                success : false,
                message : err.message
            })
        })
    }

    static delete(req,res) {
        
        GSC.deleteOne({ _id: req.params.id}, function(err) {
            if (!err) {
                res.status(200).json({
                    success : true,
                    message : `data with id ${req.params.id} success`
                })
            } else {
                res.status(500).json({
                    success : false,
                    message : err.message
                })
            }
        })

    }

    static findAll(req, res) {

        GSC.find({
            reported : 0
        })
        .then(datas => {
            res.status(200).json({
                status : true,
                data : datas
            })
        })
        .catch(err => {
            res.status(500).json({
                success : false,
                message : err.message
            })
        })

    }

    static updateReport(req,res) {

        GSC.updateOne({ _id : req.params.id }, { reported : 1 })
        .then(data => {
            res.status(201).json({
                success : true,
                message : `updating data with ID ${req.params.id} success`
            })
        })
        .catch(err => {
            res.status(500).json({
                success : false,
                message : err.message
            })
        })

    }

}

module.exports = GCSController