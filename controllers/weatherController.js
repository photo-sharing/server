const axios= require('axios')

module.exports = {

    getWeather : function(req,res) {
        axios({
            method: 'get',
            url: `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city},id&APPID=${process.env.TOKEN1_WEATHER}`,
        })
            .then (response => {
                console.log(response.data)
            })

            .catch (err => {
                res.status(500).json({
                   err: err.message
                })
            })
    }
}