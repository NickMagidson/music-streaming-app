const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node'); 

const app = express();
app.use(cors())

app.post('/login', (req, res) => {
	const code = req.body.code
	const spotifyApi = new SpotifyWebApi({
		redirectUri: 'http://localhost:3000',
		clientId: '43e436c5a3504f8194e9da6af1ed7dba',
		clientSecret: '52aa0879b39049b8af4167356589318b'
	})

	spotifyApi.authorizationCodeGrant(code)
	.then(data => {
		res.json({
			accessToken: data.body.access_token,
			refreshToken: data.body.refresh_token,
			expiresIn: data.body.expires_in
		})
	})
	.catch(() => {
		res.sendStatus(400)
	})
})

app.listen(3001)