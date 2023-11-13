const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const redis = require('./redis_client');
const app = express();

app.use(express.json());

app.post('/data', async(req, res) => {
	const repo = req.body.repo;
	const value = await redis.get(repo);
	const status = 'ok';
	let timeStart = Date.now();

	if(value) {
		const timeEnd = Date.now();
		res.json({
			from: 'redis',
			status,
			stars: value,
			timeForRet: timeEnd - timeStart
		});

		const response = await fetch(`https://api.github.com/repos/${repo}`).then(t => t.json());
		const stars = response.stargazers_count;
		if (stars != undefined) {
			await redis.setex(repo, 60, stars) 
		}
		return;
	}

	timeStart = Date.now();
	const response = await fetch(`https://api.github.com/repos/${repo}`).then(t => t.json());
	const timeEnd = Date.now();
	const stars = response.stargazers_count;

	if (stars != undefined) {
		await redis.setex(repo, 60, stars) 
	}

	res.json({ status, stars, from: 'remote', timeForRet: timeEnd - timeStart })
})

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(4000, () => {
	console.log('Server up and running!');
})