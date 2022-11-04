import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { TrackCard, PlaylistCreation, SearchResults } from './com';
import DefaultTrack from '~/lib/images/default-track-image.png';
import { getTracks, getTrackAudioFeatures } from './Generator.utils';
import './Generator.scss';

const Generator = () => {
  const defaultTracks = [
    {
      artist: '',
      song: '',
      url: '',
      cover: DefaultTrack,
      thumbnail: '',
      settings: {}
    }
  ];
  const [tracks, setTracks] = useState(defaultTracks);
  const [firstTrack] = tracks;
  const { song: firstSong } = firstTrack || {};
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [showingDial, setShowingDial] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [searchExpression, setSearchExpression] = useState('');

  const selectTrack = currentTrackIndex => {
    setCurrentTrackIndex(currentTrackIndex);
    setPlaying(false);
    setShowingDial(false);
  };

  const searchForTrack = async () => {
    selectTrack(0);
    const { tracks: { items: trackResults = [] } = {} } = await getTracks(
      searchExpression
    );
    const newTracks = trackResults.map(track => ({
      id: track.id,
      artist: track.artists[0].name,
      song: track.name,
      url: track.preview_url,
      cover: track.album.images[0].url,
      thumbnail: track.album.images[2].url
    }));
    if (newTracks.length) setTracks(newTracks);
    else setTracks(defaultTracks);
  };

  const playMusic = (newCurrentTrackIndex = currentTrackIndex) => {
    setCurrentTrackIndex(newCurrentTrackIndex);
    setPlaying(true);
    setShowingDial(true);
  };

  const pauseMusic = () => {
    setPlaying(false);
    setShowingDial(false);
  };

  const addTrackToSelected = async i => {
    const trackToAdd = tracks[i];
    const { id } = trackToAdd;
    if (!selectedTracks.find(track => track.id === id) && selectedTracks.length <= 4) {
      const { audio_features: [trackAudioFeatures] = [] } = await getTrackAudioFeatures(
        id
      );
      setSelectedTracks([
        ...selectedTracks,
        { ...trackToAdd, settings: trackAudioFeatures }
      ]);
    }
  };

  const removeTrackFromSelected = id => {
    if (selectedTracks.filter(track => track.id === id).length)
      setSelectedTracks(selectedTracks.filter(track => track.id !== id));
  };

  const getMusicTrackProps = () => {
    return {
      playing,
      showingDial,
      tracks,
      currentTrackIndex,
      selectedTracks,

      onPause: pauseMusic,
      onPlay: playMusic,
      onAddSelected: addTrackToSelected,
      onRemoveSelected: removeTrackFromSelected,
      selectTrack
    };
  };

  return (
    <div className="generator">
      <div className="track-selection">
        <TrackCard {...getMusicTrackProps()} />
        <div className="search-area">
          <h1>Pick a few songs...</h1>
          <div className="search">
            <input
              onKeyPress={e =>
                e.charCode === 13 ? searchForTrack() : setSearchExpression(e.target.value)
              }
              placeholder="search songs..."
            />
            <FaSearch onClick={searchForTrack} />
          </div>
          {!!firstSong && <SearchResults {...getMusicTrackProps()} />}
        </div>
      </div>
      <div className="settings">
        <h1>...tune your mood.</h1>
        <PlaylistCreation
          selectedTracks={selectedTracks}
          onRemoveSelected={removeTrackFromSelected}
        />
      </div>
    </div>
  );
};

export default Generator;
