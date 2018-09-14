class image_vision{
     static get_tags(url){
            const request = require('request');

            const subscriptionKey = '350db3990a0248ac88702a326223862a';

            const uriBase =
                'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze';

            const imageUrl =url;

            const params = {
                'visualFeatures': 'Categories,Description,Color',
                'details': '',
                'language': 'en'
            };

            const options = {
                uri: uriBase,
                qs: params,
                body: '{"url": ' + '"' + imageUrl + '"}',
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key' : subscriptionKey
                }
            };

            return new Promise((resolve,reject)=>{
                request.post(options, (error, response, body) => {
                    if(error){
                        reject(error)
                    }
                        let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
                    resolve(jsonResponse)
                });
            })
            
     }

     static get_face_properties(url){
            const request = require('request');

            const subscriptionKey = '1d057f514bb442839e06e42f9eff63b5';
            
            const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';
            
            const imageUrl =url;
            
            const params = {
                'returnFaceId': 'true',
                'returnFaceLandmarks': 'false',
                'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
                    'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
            };
            
            const options = {
                uri: uriBase,
                qs: params,
                body: '{"url": ' + '"' + imageUrl + '"}',
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key' : subscriptionKey
                }
            };
            
            return new Promise((resolve, reject) => {
                request.post(options, (error, response, body) => {
                    if (error) {
                        reject(error)
                    }
                    let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
                    resolve(jsonResponse)
                });
            })
       }
}

module.exports=image_vision;