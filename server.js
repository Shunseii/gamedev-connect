const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 8000;

// Connect Database
connectDB();

app.get('/', (rqe, res) => {
	res.send('API is running.');
});

app.listen(PORT, () => {
	console.log(`Running server on port: ${PORT}`);
});
