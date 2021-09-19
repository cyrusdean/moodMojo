import React from 'react';
import './SearchResults.scss';
import { FaPlus, FaPlay, FaPause, FaTimes } from 'react-icons/fa';

export const SearchResults = ({
  playing,
  tracks,
  currentTrackIndex,
  selectedTracks,
  onPause,
  onPlay,
  selectTrack,
  onAddSelected,
  onRemoveSelected
}) => (
  <div className="search-results">
    {tracks.map(({ id: trackId, song, artist, url }, i) => (
      <div
        className={`search-result ${i === currentTrackIndex ? 'selected-result' : ''}`}
        key={i}
        onClick={() => selectTrack(i)}
      >
        <span className="search-result-info">
          {song}, {artist}
        </span>
        <div className="search-result-conrols">
          {!!url &&
            (i === currentTrackIndex && playing ? (
              <FaPause
                onClick={e => {
                  e.stopPropagation();
                  onPause();
                }}
              />
            ) : (
              <FaPlay
                onClick={e => {
                  e.stopPropagation();
                  onPlay(i);
                }}
              />
            ))}
          {selectedTracks.filter(({ id }) => id === tracks[i].id).length ? (
            <FaTimes
              onClick={e => {
                e.stopPropagation();
                onRemoveSelected(trackId);
              }}
            />
          ) : (
            <FaPlus
              onClick={e => {
                e.stopPropagation();
                onAddSelected(i);
              }}
            />
          )}
        </div>
      </div>
    ))}
  </div>
);

export default SearchResults;
