import React from 'react';
import smoothScroll from 'smoothScroll';
import useScrollPosition from '@react-hook/window-scroll';
import FloatingStaticLayer from '~/lib/images/floating-static-layer.svg';
import LightGreenHillsBackgroundLayer from '~/lib/images/light-green-hills-background-layer.svg';
import GreenHillsMiddleLayer from '~/lib/images/green-hills-middle-layer.svg';
import DarkGreenHillsForegroundLayer from '~/lib/images/dark-green-hills-foreground-layer.svg';
import BlueHillsForgroundLayer from '~/lib/images/blue-hills-forground-layer.svg';
import TextLayer from '~/lib/images/text-layer.svg';
import ScrollButtonLayer from '~/lib/images/scroll-button-layer.svg';
import './HeroScene.scss';

const heroLayers = [
  { image: FloatingStaticLayer, speed: 20 },
  { image: LightGreenHillsBackgroundLayer, speed: 30 },
  { image: GreenHillsMiddleLayer, speed: 55 },
  { image: DarkGreenHillsForegroundLayer, speed: 70 },
  { image: BlueHillsForgroundLayer, speed: 0, layerClass: 'foreground' },
  {
    image: TextLayer,
    speed: 60,
    layerClass: 'text'
  },
  {
    image: ScrollButtonLayer,
    speed: 60,
    layerClass: 'scroll-button',
    onClick: () => smoothScroll(window.innerHeight, 1500)
  }
];

const HeroScene = () => {
  const scrollY = useScrollPosition(120);

  return (
    <div className="hero-scene">
      {heroLayers.map(({ speed, image, layerClass, onClick }, i) => (
        <div
          className={`hero-layer ${layerClass || ''}`}
          key={i}
          onClick={onClick}
          style={{
            transform: `translate3d(0, -${Math.round((scrollY * speed) / 100)}px, 0)`,
            backgroundImage: `url('${image}')`
          }}
        />
      ))}
    </div>
  );
};

export default HeroScene;
