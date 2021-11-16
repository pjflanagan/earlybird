
API = {
	send_text: ({ text }) => ({
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		url: '/api/send/text',
		data: { text }
	}),
	create: ({ tweet, includeDate }) => ({
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		url: '/api/create',
		data: tweet.toJSON({
			action: (tweet._id === TYPE.NOID) ? ACTION.CREATE : ACTION.UPDATE,
			includeDate
		})
	}),
	load_tweets: () => ({
		method: 'GET',
		url: '/api/tweets'
	}),
	send_id: ({ _id }) => ({
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		url: '/api/send/id',
		data: { _id }
	}),
	convert: ({ _id, type }) => ({
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		url: '/api/convert',
		data: { _id, type }
	}),
	delete: ({ _id }) => ({
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		url: '/api/delete',
		data: { _id }
	})
};
