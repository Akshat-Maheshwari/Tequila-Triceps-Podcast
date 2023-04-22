const express = require('express')
let bodyParser = require('body-parser')

const app= express()
let port = process.env.PORT||3000

app.use(bodyParser.urlencoded())
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', true)
  return next()
});


app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
