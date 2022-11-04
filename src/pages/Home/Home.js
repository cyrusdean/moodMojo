import React from 'react';
import { Headphones, Sliders, Records, HeroScene } from './com';
import './Home.scss';

const Home = () => {
  return (
    <div className="home">
      <HeroScene />
      <div className="step records-step">
        <div>
          <h1>Pick a couple songs that match your mood.</h1>
          <a href="/generator">
            <button>Get started</button>
          </a>
        </div>
        <Records />
      </div>
      <div className="step sliders-step">
        <Sliders />
        <div>
          <h1>Adjust your mood setting preferences.</h1>
          <a href="/generator">
            <button>Get started</button>
          </a>
        </div>
      </div>
      <div className="step headphones-step">
        <div>
          <h1> Enjoy your custom playlist on Spotify.</h1>
          <a href="/generator">
            <button>Get started</button>
          </a>
        </div>
        <Headphones />
      </div>
    </div>
  );
};

export default Home;
