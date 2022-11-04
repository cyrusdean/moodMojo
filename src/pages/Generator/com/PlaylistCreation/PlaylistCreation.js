import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Slider from 'rc-slider';
import {
  getRecommendations,
  getCurrentPlaylists,
  editPlayListSongs,
  makeUserPlaylist,
  playlistSettingOptions,
  defaultPlaylistSettings
} from './PlaylistCreation.utils';
import 'rc-slider/assets/index.css';
import './PlaylistCreation.scss';

export const PlaylistCreation = ({ selectedTracks, onRemoveSelected }) => {
  const [playlistSettings, setPlaylistSettings] = useState(defaultPlaylistSettings);

  const updatePlaylistSettings = async () => {
    const aggregateTrackSettings = selectedTracks.reduce(
      (a, { settings }) =>
        Object.assign(
          {},
          ...Object.entries(settings)
            .filter(([, value]) => !isNaN(value))
            .map(([key, value]) => {
              const { decimal } = playlistSettingOptions[key] || {};
              const adjustedVal = decimal ? value * 100 : value;
              const newVal = (a[key] || 0) + adjustedVal / selectedTracks.length;
              return { [key]: newVal };
            })
        ),
      {}
    );

    setPlaylistSettings(aggregateTrackSettings);
  };

  const createPlaylist = async () => {
    const selectedTracksIds = selectedTracks.map(({ id }) => id);
    const { tracks: recommendations = [] } = await getRecommendations({
      seedTrackIds: selectedTracksIds,
      targetValues: playlistSettings
    });
    const { items: playlists } = await getCurrentPlaylists();
    const currentPlaylist =
      playlists.find(playlist => playlist.name === 'moodMojo') ||
      (await makeUserPlaylist());
    await editPlayListSongs(currentPlaylist.id, recommendations);
    Swal.fire({
      title: 'Playlist created! Check Your Spotify.',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false
    });
  };

  useEffect(() => {
    if (selectedTracks.length) updatePlaylistSettings();
  }, [selectedTracks]);

  return (
    <>
      <div className="selected-tracks">
        <h2>Selected Tracks</h2>
        {selectedTracks.map(({ id, song, artist }, i) => (
          <div className="selected-track" key={i}>
            <span className="selected-track-info">
              {song} by {artist}
            </span>
            <FaTimes onClick={() => onRemoveSelected(id)} />
          </div>
        ))}
        {[...new Array(5 - selectedTracks.length)].map((_, i) => (
          <div className="selected-track placeholder" key={i} />
        ))}
      </div>

      <div className="playlist-settings">
        {Object.values(playlistSettingOptions).map(
          ({ label, spotifyKey, decimal, ...rest }) => (
            <div className="setting" key={spotifyKey}>
              <Slider
                className="slider"
                value={playlistSettings[spotifyKey]}
                vertical
                included={false}
                {...rest}
                onChange={val =>
                  setPlaylistSettings({
                    ...playlistSettings,
                    [spotifyKey]: val
                  })
                }
                style={{ width: '20px' }}
                handleStyle={{
                  width: '36px',
                  height: '36px',
                  marginLeft: '-13px',
                  border: '6px solid var(--blue-primary)'
                }}
                railStyle={{ backgroundColor: 'var(--green-primary)', width: '10px' }}
              />
              <div className="slider-name">{label}</div>
            </div>
          )
        )}
      </div>
      <button
        style={{ visibility: `${selectedTracks.length ? 'visible' : 'hidden'}` }}
        onClick={createPlaylist}
      >
        Get your playlist
      </button>
    </>
  );
};

export default PlaylistCreation;
