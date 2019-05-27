import React from 'react';	
import {connect} from 'react-redux';
import {getArtist, getAlbums, getTopTracks, getRelatedArtists} from '../actions';
class Results extends React.Component {

	getArtistInfo = (id, token) => e => {
		e.preventDefault();
		this.props.getArtist(id, token);
		this.props.getAlbums(id, token);
		this.props.getTopTracks(id, token);
		this.props.getRelatedArtists(id, token);
	}

	render() {

		const {artists, loading, token} = this.props;

		let searchResults;

		if (loading) {
			searchResults = <span className="related-artist__name">Results Will Appear Here</span>
		} else if (artists && artists.length > 0 && !loading) {

			searchResults = artists.slice(0,6).map(artist => (
				<a className="related-artist" key={artist.id} onClick={this.getArtistInfo(artist.id, token)}>
			      <span className="related-artist__img">
			        <img src={artist.images[0] ? artist.images[0].url : 'https://www.freepnglogos.com/uploads/music-logo-black-and-white-png-21.png'} alt={artist.name} />
			      </span>
			      <span className="related-artist__name">{artist.name}</span>
			    </a>
			))
		}

		return (
		<>
		{artists && <div className="section-title">Search Results</div>}
			<div className="related-artists">
			  	{searchResults}
			</div>
			</>
		);
	}
}

export default connect(null, {getArtist, getAlbums, getTopTracks, getRelatedArtists})(Results);