const express = require('express')
const connectDB = require('./config/db')

const app = express()

connectDB()

app.get('/', (req, res) => res.send('API is Running'))

app.use('/api/populate', require('./routes/api/populate'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`))