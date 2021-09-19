import React, { useEffect } from 'react'

const SpotifyCallback = ({ history }) => {
	useEffect(() => {
		localStorage.accessTokenExpiration = Date.now() + 3600 * 1000
		const [, accessToken] = window.location.hash.split('=')
		localStorage.accessToken = accessToken
		history.push('/generator')
	}, [])

	return (<div></div>)
}

export default SpotifyCallback
