const express = require('express');
const app = express();
const Redis = require('ioredis');

const redis = new Redis({
	host: '127.0.0.1',
	port: 6379
})

async function boot() {
	const value = await redis.set('key1', 'value1');
	console.log(value);
	redis.quit();
}

boot();
