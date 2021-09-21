import { getFromAPI } from '~/lib/utils';

export const getTracks = searchExpression =>
  getFromAPI(`/search?type=track&q=${searchExpression}`);

export const getTrackAudioFeatures = id =>
  getFromAPI(`/audio-features?ids=${id}`);
