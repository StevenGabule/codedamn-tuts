const redis = require('./redis_client');

function rateLimiter({ secondsWindow, allowHits }) {
	return async function (req, res, next) {
		const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		const requests = await redis.incr(ip);

		let ttl;
		if (requests === 1) {
			await redis.expire(ip, secondsWindow);
			ttl = 60;
		} else {
			ttl = await redis.ttl(ip)
		}

		if (requests > allowHits) {
			return res.status(503).json({
				response: 'error',
				callsInAMinutes: requests,
				ttl
			})
		} else {
			req.requests = requests;
			req.ttl = ttl;
			next();
		}
	}
}

module.exports = rateLimiter;