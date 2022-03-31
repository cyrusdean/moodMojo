import React from 'react';
import { FaSignOutAlt, FaHeadphones, FaSpotify } from 'react-icons/fa';
import MoodMojoLogo from '~/lib/images/moodmojo-logo.svg';
import SpotifyLogo from '~/lib/images/spotify-logo.png';
import { getAuthorizeLink } from '~/lib/utils';
import './Menu.scss';

const Menu = () => {
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
        <a href="/" className="home-link">
          <img src={MoodMojoLogo} />
        </a>
      </div>
      {localStorage.getItem('accessToken') ? (
        <div>
          <a href="/generator">
            <button>
              <FaHeadphones /> <span>Generator</span>
            </button>
          </a>
          <a
            onClick={() => {
              localStorage.clear();
              window.location.pathname = '/'
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

export default Menu;
