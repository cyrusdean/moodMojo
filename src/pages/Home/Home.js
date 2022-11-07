import React from 'react';
import { Headphones, Sliders, Records, HeroScene } from './com';
import Lottie from 'react-lottie';
import * as moodData from './meditating-man.json';
import * as sliderData from './sliders.json';
import * as headphonesData from './eq.json';
import './Home.scss';

const moodDataOptions = {
  loop: true,
  autoplay: true,
  animationData: moodData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
const sliderDataOptions = {
  loop: true,
  autoplay: true,
  animationData: sliderData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
const headphonesDataOptions = {
  loop: true,
  autoplay: true,
  animationData: headphonesData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid meet'
  }
};

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
        <div className="lottieWrapper">
          <Lottie options={moodDataOptions} />
        </div>

        {/* <Records /> */}
      </div>
      <div className="step sliders-step">
        <div className="lottieWrapper">
          <Lottie options={sliderDataOptions} />
        </div>

        {/* <Sliders /> */}
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
        {/* <Headphones />
         */}
        <div className="lottieWrapper">
          <Lottie options={headphonesDataOptions} />
        </div>
      </div>
    </div>
  );
};

export default Home;
