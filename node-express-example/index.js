const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app.get('/', function (req, res) {
  res.send('Hello World! I have a CI!')
})

app.listen(PORT, function() {
  console.log(`Listening on ${ PORT }…`)
})
