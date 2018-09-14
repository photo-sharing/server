const api=require('../helpers/get _face-tags.js')

function get_face(imgUrl){
    api.get_face_properties(imgUrl)
    .then(response => {
        let emotions = JSON.parse(response)[0].faceAttributes.emotion
        let temp = []
        let sortedEmotions = []

        for(let emotion in emotions) {
            temp.push([emotion, emotions[emotion]])
        }
        return temp.sort(function(a, b){return b[1]-a[1]})[0]
    })
    .catch(error => {
        return error
    })
}

function get_tags(imgUrl){
    api.get_tags(imgUrl)
    .then(response => {
        return JSON.parse(response).description.tags
    })
    .catch(error => {
        return error  
    })
}

    
module.exports={get_face,get_tags}