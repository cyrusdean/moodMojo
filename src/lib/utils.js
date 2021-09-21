import getOffset from 'getOffset';
import Swal from 'sweetalert2';

const SPOTIFY_CLIENT_ID = 'e7e008fe415447bba73e3e6ce86e8ecb';
const SPOTIFY_REDIRECT_URI = 'development' === process.env.NODE_ENV ? 'http://localhost:4000/spotify-callback' : 'https://moodmojo.cyrusdean.com/spotify-callback'

const checkAccessTokenExpiration = async () => {
  if (localStorage.getItem('accessTokenExpiration') <= Date.now()) {
    Swal.fire({
      title: 'Spotify token expired. Refreshing...',
      icon: 'info',
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true
    });
    setTimeout(() => (window.location = getAuthorizeLink()), 3000);
  }
};

export const getFromAPI = async (endpoint, method = 'GET', body) => {
  const accessToken = localStorage.getItem('accessToken');
  checkAccessTokenExpiration();
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  };
  return fetch(`https://api.spotify.com/v1${endpoint}`, {
    method,
    headers,
    body
  }).then(res =>
    res
      .json()
      .then(json =>
        res.status >= 200 || res.status < 300
          ? json
          : new Error(`Could not complete the request for ${endpoint}.`)
      )
  );
};

export const getAuthorizeLink = () => {
  const queryObj = {
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'token',
    redirect_uri: SPOTIFY_REDIRECT_URI,
    scope: 'playlist-modify-public playlist-modify-private'
  };

  const queryString = Object.entries(queryObj)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');
  const authorizeLink = `https://accounts.spotify.com/authorize?${queryString}`;
  return authorizeLink;
};

export const calcScrollPercent = ({ element, scrollDurationCoefficient }) => {
  const { documentElement } = document;
  const elClientHeight = element.getBoundingClientRect().height;
  const elTopOffset = getOffset(element, documentElement).top;
  const scrolled =
    elTopOffset + 0.75 * elClientHeight - window.innerHeight - documentElement.scrollTop;
  const totalScrollDuration = window.innerHeight * scrollDurationCoefficient;
  const scrollPercent = Math.min(Math.max(-(scrolled / totalScrollDuration), 0), 1);
  return scrollPercent;
};
