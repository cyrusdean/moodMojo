import React from 'react';
import { NavLink } from 'react-router-dom';
import { Headphones, Sliders, Records, HeroScene } from './com';
import './Home.scss';

const Home = () => {
  return (
    <div className="home">
      <HeroScene />
      <div className="step records-step">
        <h1>Pick 1-5 Songs That Match Your Mood</h1>
        <Records />
      </div>
      <div className="step sliders-step">
        <Sliders />
        <h1>Adjust Your Mood Setting Preferences</h1>
      </div>
      <div className="step headphones-step">
        <div>
          <h1> Listen To Your Playlist on Spotify!</h1>
          <NavLink to="/generator">
            <button>Get Your Custom Playlist!</button>
          </NavLink>
        </div>
        <Headphones />
      </div>
    </div>
  );
};

export default Home;
