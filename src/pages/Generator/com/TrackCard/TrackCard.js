import React from 'react';
import MusicDial from 'react-music-dial';
import './TrackCard.scss';

export const TrackCard = ({ currentTrackIndex, tracks, showingDial, ...restProps }) => {
  const currentTrack = tracks[currentTrackIndex];
  const { cover } = currentTrack || {};
  const coverImgStyle = {
    backgroundImage: `url('${cover}')`
  };

  return (
    <div className={`track-card ${showingDial ? 'flipped' : ''}`}>
      <div className="front" style={coverImgStyle} />
      <div className="back" style={coverImgStyle}>
        <div className="album-overlay" />

        <MusicDial currentTrackIndex={currentTrackIndex} tracks={tracks} {...restProps} />
      </div>
    </div>
  );
};

export default TrackCard;
