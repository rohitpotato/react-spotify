import React from 'react';
import {connect} from 'react-redux';
import {getAlbumTracks, setCurrentAlbum} from '../actions';
class NewReleases extends React.Component {

	handleAlbum = (id, token, name, image, release_date) => e => {
		e.preventDefault();
		this.props.getAlbumTracks(id, token);
		this.props.setCurrentAlbum(name, image, release_date);
	}		

/*	getUnique =(arr, comp) => {

		const unique = arr
		.map(e => e[comp])

		.map((e, i, final) => final.indexOf(e) === i && i)

		.filter(e => arr[e]).map(e => arr[e]);

		return unique;
	}*/

	render() {

		var {newReleases, token} = this.props;

		let newReleasesContent;
		if (newReleases && newReleases.length > 0) {	
			newReleasesContent = newReleases.slice(0,15).map(album => (		
                  
                  <a onClick={this.handleAlbum(album.id, token, album.name, album.images[0], album.release_date)} className="related-artist" key={album.id}>
                    <span className="related-artist__img">
                      <img src={album.images ? album.images[0].url : " "} alt={album.name} />
                    </span>
                    <span className="related-artist__name">{album.name}</span>
                  </a>
			))
		}

		return (

			<div className="overview__related">
				{newReleases ? <div className="section-title">New Releases</div>: ''}
				 <div className="related-artists">
					{newReleasesContent}
				</div>
			</div>
		);
	}
}

export default connect(null, {getAlbumTracks, setCurrentAlbum})(NewReleases);