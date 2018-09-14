const GSC = require('../models/Photo')
const GCSUploader = require('../helpers/GCSUploader')
const api=require('../helpers/get _face-tags.js')

class GCSController {
  
    static getEmotion(req, imgUrl) {
      return new Promise((resolve, reject) => {
        api.get_face_properties(imgUrl)
        .then(response => {
            let emotions = JSON.parse(response)[0].faceAttributes.emotion
            let temp = []
            let sortedEmotions = []

            for(let emotion in emotions) {
                temp.push([emotion, emotions[emotion]])
            }
            
            resolve(req.emotion = temp.sort(function(a, b){return b[1]-a[1]})[0])
        })
        .catch(error => {
            reject(error)
        })
      })
    }
    
    static getTags(req, imgUrl) {
      return new Promise((resolve, reject) => {
        api.get_tags(imgUrl)
        .then(response => {
            resolve(req.tags = JSON.parse(response).description.tags)
        })
        .catch(error => {
            reject(error) 
        })
      })
    }

    static updloadImage(req, res) {
        Promise.all([GCSController.getEmotion(req, req.file.cloudStoragePublicUrl), GCSController.getTags(req, req.file.cloudStoragePublicUrl)])
          .then(() => {
              let obj = {
                  url : req.file.cloudStoragePublicUrl,
                  description : req.body.description,
                  tags : req.tags,
                  emotion : req.emotion[0]
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
          })
          .catch(err => {
            res.status(500).json({error: err.message})
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