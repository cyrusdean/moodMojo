import React, { useEffect } from 'react'

const SpotifyCallback = () => {
	useEffect(() => {
		localStorage.accessTokenExpiration = Date.now() + 3600 * 1000
		const [, accessToken] = window.location.hash.split('=')
		localStorage.accessToken = accessToken
		window.location.pathname = '/generator'
	}, [])

	return (<div></div>)
}

export default SpotifyCallback
