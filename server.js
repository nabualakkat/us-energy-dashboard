const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.get('/', (req, res) => res.send('API is Running'));

app.use('/api/populate', require('./routes/api/populate'));
app.use('/api/data', require('./routes/api/data'));
app.use('/api/generation', require('./routes/api/netGeneration'));
app.use('/api/regionalgeneration', require('./routes/api/regionalGeneration'));
app.use('/api/outage', require('./routes/api/outage'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
