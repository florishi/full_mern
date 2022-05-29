const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000



app.use(cors()) // To remove course errors in the console while fetching APIs

app.use(express.json());//middleware to get data in req.body

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello Worl!')
})

app.listen(port, () => {
  console.log(`iNotebook backend  listening at http://localhost:${port}`)
})