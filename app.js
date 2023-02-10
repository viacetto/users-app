const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')
const request = require('request')
const router = require('./backend/routes/api.js')
const port = process.env.PORT || 3000
const url = process.env.ROOT_URL || `http://localhost:${port}/`;
const app = express()
//enable cors
app.use(cors())
//use json parser
app.use(express.json());
//add api routes
app.use('/api/', router);

//run frontend
app.use(express.static('build'))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

//listen for requests
app.listen(port, (err) => {
    if (err) return console.log(err)
    console.log('server is running on port:', port)
})

//prevent heroku from falling asleep
const ping = () => request(`${url}api/users`, (error, response, body) => {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
});
setInterval(ping, 5 * 60 * 1000); // 5 min
