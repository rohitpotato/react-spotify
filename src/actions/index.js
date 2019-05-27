import * as actionTypes from './types';
import axios from 'axios';

export const setUserToken = (token) => dispatch => {

	dispatch({
		type: actionTypes.SET_USER,
		payload: token
	});
};

export const getUser = (token) => dispatch => {

	axios.get("https://api.spotify.com/v1/me", {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}).then(res => {
		dispatch({
			type: actionTypes.GET_USER_DATA,
			payload: res.data
		});
	}).catch(e => {
		window.location.href='/login';
	})
}

export const getArtists = (query, token) => dispatch => {

	axios.get(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}).then(res => {
		dispatch({
			type: actionTypes.GET_ARTISTS,
			payload: res.data.artists.items
		});
	}).catch(e => {
		console.log(e);
	})
};

export const getArtist = (id, token) => dispatch => {

	axios.get(`https://api.spotify.com/v1/artists/${id}`, {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}).then(res => {
		dispatch({
			type: actionTypes.GET_ARTIST,
			payload: res.data
		});
	}).catch(e => {
		console.log(e);
	});
};

export const getAlbums = (id, token) => dispatch => {

	axios.get(`https://api.spotify.com/v1/artists/${id}/albums?market=ES`, {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}).then(res => {
		dispatch({
			type: actionTypes.GET_ALBUMS,
			payload: res.data.items
		});
	}).catch(e => {
		console.log(e);
	})
}

export const getTopTracks = (id, token) => dispatch => {

	axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=IN`, {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}).then(res => {
		dispatch({
			type: actionTypes.GET_TOP_TRACKS,
			payload: res.data.tracks
		});
	}).catch(e => {
		console.log(e);
	})
}

export const play = (url) => {

	return {
		type: actionTypes.PLAY_TRACK,
		payload: url
	}
}

export const playTrack = (url) => dispatch => {

	dispatch(play(url))
}

export const getAlbumTracks = (id, token) => dispatch => {

	axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}).then(res => {
		console.log(res.data.items);
		dispatch({
			type: actionTypes.GET_ALBUM_TRACKS,
			payload: res.data.items
		});
	}).catch(e => {
		console.log(e);
	})
}

export const setAlbum = (name, image, release_date) => {

	return {
		type: actionTypes.SET_CURRENT_ALBUM,
		payload: {
			name: name,
			image: image,
			release_date: release_date
		}
	}
}

export const setCurrentAlbum = (name, image, release_date) => dispatch => {
	dispatch(setAlbum(name, image, release_date));
}

export const setTrack = (name, image, explicit) => {

	return {
		type: actionTypes.SET_CURRENT_TRACK,	
		payload: {
			name: name,
			image: image,
			explicit: explicit
		}
	}
}

export const setCurrentTrack = (name, image, explicit) => dispatch => {
	dispatch(setTrack(name, image, explicit));
}

export const getUserTopTracks = (token) => dispatch => {
	axios.get(`https://api.spotify.com/v1/me/top/tracks`, {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}).then(res => {
		dispatch({
			type: actionTypes.GET_USER_TOP_TRACKS,
			payload: res.data.items
		});
	}).catch(e => {
		console.log(e);
	})
}

export const getRecentlyPlayed = (token) => dispatch => {

	axios.get(`https://api.spotify.com/v1/me/player/recently-played`, {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}).then(res => {
		dispatch({
			type: actionTypes.GET_RECENTLY_PLAYED,
			payload: res.data.items
		});
	}).catch(e => {
		console.log(e);
	})
}

export const getNewReleases = (token) => dispatch => {

	axios.get('https://api.spotify.com/v1/browse/new-releases?country=IN', {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}).then(res => {
		dispatch({
			type: actionTypes.GET_NEW_RELEASES,
			payload: res.data.albums.items
		});
	}).catch(e => {
		console.log(e);
	})
}

export const getRelatedArtists = (id, token) => dispatch => {

	axios.get(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
		headers: {
			"Authorization": `Bearer ${token}`
		}
	}).then(res => {
		dispatch({
			type: actionTypes.GET_RELATED_ARTISTS,
			payload: res.data.artists
		})
	}).catch(e => {
		console.log(e);
	})
}