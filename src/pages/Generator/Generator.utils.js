import { getFromAPI } from '~/lib/utils';

export const getTracks = searchExpression =>
  getFromAPI(`/search?type=track&q=${searchExpression}`, 'tracks');

export const getTrackAudioFeatures = id =>
  getFromAPI(`/audio-features?ids=${id}`, 'track audio features');
