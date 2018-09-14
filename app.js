const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()
const app = express()

const port = process.env.PORT || '3000'

const weatherRouter = require('./routes/weatherRouter')
const adminRouter = require('./routes/admin')
const GCSRouter = require('./routes/gcsRoute')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB Connected!');
});

app.use('/weather', weatherRouter) 
app.use('/admin', adminRouter)
app.use('/gcs', GCSRouter)
 
app.listen(port, () => {
  console.log(`Running on port ${port}`)
})