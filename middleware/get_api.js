const api=require('../helpers/get _face-tags.js')

function get_face(req,res,next){
    api.get_face_properties(req.file.cloudStoragePublicUrl)
    .then(response => {
        let emotions = JSON.parse(response)[0].faceAttributes.emotion
        let temp = []
        let sortedEmotions = []

        for(let emotion in emotions) {
            temp.push([emotion, emotions[emotion]])
        }

        req.emotion=temp.sort(function(a, b){return b[1]-a[1]})[0]
        next()
    })
    .catch(error => {
        return error
    })
}

function get_tags(req,res,next){
    api.get_tags('http://pngimg.com/uploads/face/face_PNG5660.png')
    .then(response => {
        req_tags=JSON.parse(response).description.tags
        // next(data)
    })
    .catch(error => {
        return err  
    })
}

    
module.exports={get_face,get_tags}