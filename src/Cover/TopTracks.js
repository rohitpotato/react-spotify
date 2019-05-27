import React from 'react';
import {connect} from 'react-redux';
import {playTrack, setCurrentTrack} from '../actions';
class TopTracks extends React.Component {

	playMedia = (url, name, image, explicit) => e => {
		e.preventDefault();
		this.props.playTrack(url);
		this.props.setCurrentTrack(name, image, explicit)
	}

	render() {

		const {tracks} = this.props;
		let topTracks;
		if(tracks && tracks.length > 0) {

			topTracks = tracks.map((track, index) => {
				return (

				<a onClick={this.playMedia(track.preview_url, track.name, track.album.images[0].url, track.explicit)} key={track.id}>
                  <div className="track" >
                    <div className="track__art">
                      <img src={track.album.images ? track.album.images[0].url : ''} alt="When It's Dark Out" />
                    </div>
                    <div className="track__number">{index+1}</div>
                    <div className="track__title">{track.name}</div>
                    {track.explicit && 
	                    <div className="track__explicit">
	                      <span className="label">Explicit</span>
	                    </div>
	               	}
                    <div className="track__plays">{track.duration_ms}</div>
                  </div>
                  </a>
				)
			})
		}

		return (
		<>
			{tracks && <div className="section-title">Top Tracks</div>}
				<div className="tracks">
				{topTracks}
			</div>
         </>
		);
	}
}

export default connect(null, {playTrack, setCurrentTrack})(TopTracks);