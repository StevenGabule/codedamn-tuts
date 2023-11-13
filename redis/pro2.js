const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const redis = require('./redis_client');
const rateLimiter = require('./rate-limiter');
const app = express();

app.use(express.json());

app.post('/api1', rateLimiter({ secondsWindow: 10, allowHits: 4 }), (_req, res) => {
	res.json({
		response: 'ok',
		callsInAMinute: 0,
		ttl
	})
})

app.post('/api2', async (req, res) => {
	res.json({
		response: 'ok',
		callsInAMinute: 0
	})
})

app.post('/api3', async (req, res) => {
	res.json({
		response: 'ok',
		callsInAMinute: 0
	})
})

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index1.html'))
})

app.listen(4000, () => {
	console.log('Server up and running!');
})