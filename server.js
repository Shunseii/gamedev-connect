const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (rqe, res) => {
	res.send('API is running.');
});

app.listen(PORT, () => {
	console.log(`Running server on port: ${PORT}`);
});
