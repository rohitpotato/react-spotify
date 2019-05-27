import * as actionTypes from '../actions/types';
import {combineReducers} from 'redux';

const initialAuthState = {

	user: {},
	isAuthenticated: false
}

const initialArtistState = {
	artists: null,
	artist: {},
	relatedArtists: [],
	loading: true,
	tracks: null
}

const initialAlbumState = {
	albums: {},
	albumTracks: [],
	newReleases: [],
	loading: true,
	albumInfo: {}
}

const initialTrackState = {
	url: '',
	loading: true,
	trackInfo: {},
	userTopTracks: []
}

//AUTHENTICATION REDUCER

const authReducer = (state=initialAuthState, action) => {

	switch(action.type) {

		case actionTypes.SET_USER:
			return {
				...state,
				isAuthenticated: true,
				token: action.payload
			}

		case actionTypes.GET_USER_DATA:
			return  {
				...state,
				user: action.payload
			}

		 default:
			return state;
	}
}

//ARTIST REDUCER

const artistReducer = (state = initialArtistState, action) => {

	switch(action.type) {

		case actionTypes.GET_ARTISTS:
			return {
				...state,
				artists: action.payload,
				loading: false
			}

		case actionTypes.GET_ARTIST:
			return {
				...state,
				artist: action.payload,
				loading: false,
			} 

		case actionTypes.GET_TOP_TRACKS:
			return {
				...state,
				tracks: action.payload,
				loading: false
			}

		case actionTypes.GET_RELATED_ARTISTS:
			return {
				...state,
				relatedArtists: action.payload,
				loading: false
			}

		default:
			return state;
	}
}

//ALBUM REDUCER

const albumReducer = (state = initialAlbumState, action) => {

	switch(action.type) {

		case actionTypes.GET_ALBUMS:
			return {
				...state,
				albums: action.payload,
				loading: false
			}

		case actionTypes.GET_ALBUM_TRACKS:
			return {
				...state,
				albumTracks: action.payload,
				loading: false
			}

		case actionTypes.SET_CURRENT_ALBUM:
			return {
				...state,
				albumInfo: action.payload
			}

		case actionTypes.GET_NEW_RELEASES:
			return {
				...state,
				newReleases: action.payload,
				loading: false 
			}

		default:
			return state;
	}
}

//TRACK REDUCER

const trackReducer = (state = initialTrackState, action) => {

	switch(action.type) {

		case actionTypes.PLAY_TRACK:
			return {
				...state,
				url: action.payload
			}

		case actionTypes.SET_CURRENT_TRACK:
			return {
				...state,
				trackInfo: action.payload
			}

		case actionTypes.GET_USER_TOP_TRACKS:
			return {
				...state,
				userTopTracks: action.payload,
				loading: false
			}

		case actionTypes.GET_RECENTLY_PLAYED:
			return  {
				...state,
				recentlyPlayed: action.payload,
				loading: false
			}

		default:
			return state;
	}
}

const rootReducer = combineReducers({

	auth: authReducer,
	artist: artistReducer,
	albums: albumReducer,
	track: trackReducer
});

export default rootReducer;