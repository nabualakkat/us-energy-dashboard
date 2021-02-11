const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

app.use('/api/populate', require('./routes/api/populate'));
app.use('/api/data', require('./routes/api/data'));
app.use('/api/generation', require('./routes/api/netGeneration'));
app.use('/api/regionalgeneration', require('./routes/api/regionalGeneration'));
app.use('/api/outage', require('./routes/api/outage'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
