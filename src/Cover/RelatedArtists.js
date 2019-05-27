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

		const {relatedArtists, loading, token} = this.props;

		let relatedArtistsContent;

		if (loading) {
			relatedArtistsContent = <span className="related-artist__name">Results Will Appear Here</span>
		} else if (relatedArtists && relatedArtists.length > 0 && !loading) {

			relatedArtistsContent = relatedArtists.slice(0,6).map(artist => (
				<a className="related-artist" key={artist.id} onClick={this.getArtistInfo(artist.id, token)} style={{ width: '100%' }}>
			      <span className="related-artist__img">
			        <img src={artist.images[0] ? artist.images[0].url : 'https://www.freepnglogos.com/uploads/music-logo-black-and-white-png-21.png'} alt={artist.name} />
			      </span>
			      <span className="related-artist__name">{artist.name}</span>
			    </a>
			))
		}

		return (
		<>
			<div className="section__right">
			{relatedArtists.length > 0 && <div className="section-title">Related Artists</div>}
				<div className="related-artists">
				  	{relatedArtistsContent}
				</div>
			</div>
		</>
		);
	}
}

export default connect(null, {getArtist, getAlbums, getTopTracks, getRelatedArtists})(Results);