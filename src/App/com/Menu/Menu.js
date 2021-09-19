import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { FaSignOutAlt, FaHeadphones, FaSpotify } from 'react-icons/fa';
import MoodMojoLogo from '~/lib/images/moodmojo-logo.svg';
import SpotifyLogo from '~/lib/images/Spotify_Logo_RGB_White.png';
import { getAuthorizeLink } from '~/lib/utils';
import './Menu.scss';

const Menu = ({ history }) => {
  const authorizeLink = getAuthorizeLink();

  return (
    <nav className="menu">
      <div>
        <a
          href="https://www.spotify.com/"
          target="_blank"
          className="spotify-link"
          rel="noreferrer"
        >
          <img src={SpotifyLogo} />
        </a>
        <NavLink to="/" className="home-link">
          <img src={MoodMojoLogo} />
        </NavLink>
      </div>
      {localStorage.getItem('accessToken') ? (
        <div>
          <NavLink to="/generator">
            <button>
              <FaHeadphones /> <span>Generator</span>
            </button>
          </NavLink>
          <a
            onClick={() => {
              localStorage.clear();
              history.push('/');
            }}
          >
            <button>
              <FaSignOutAlt /> <span>Logout</span>
            </button>
          </a>
        </div>
      ) : (
        <div>
          <a href={authorizeLink}>
            <button>
              <FaSpotify /> <span>Get Started</span>
            </button>
          </a>
        </div>
      )}
    </nav>
  );
};

export default withRouter(Menu);
