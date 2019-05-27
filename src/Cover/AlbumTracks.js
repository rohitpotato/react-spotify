import React from 'react';
import {connect} from 'react-redux';
import {playTrack, setCurrentTrack} from '../actions';

class AlbumTracks extends React.Component {

  playMedia = (url, name, image, explicit) => e => {
    e.preventDefault();
    this.props.playTrack(url);
    this.props.setCurrentTrack(name, image, explicit)
  }

	convertToMinutes = ms => {

	  var minutes = Math.floor(ms / 60000);
	  var seconds = ((ms % 60000) / 1000).toFixed(0);
	  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
	}

	render() {

		const {albumTracks, albumInfo} = this.props;
		let albumContent, albumInfoContent;
		if(albumTracks && albumTracks.length > 0) {

			albumContent = albumTracks.map((track, index) => {

				return (
					<a onClick={this.playMedia(track.preview_url, track.name, albumInfo.image.url ? albumInfo.image.url : {}, track.explicit)} key={track.id}>
                      <div className="track">
                        <div className="track__number">{index+1}</div>
                        <div className="track__title featured">
                          <span className="title">{track.name}</span>
                          {
                          	track.artists && track.artists.map(artist => (
                          		<span className="feature" key={artist.name}>{artist.name}</span>
                          	))
                          }
                        </div>
                        {track.explicit && 
	                        <div className="track__explicit">
	                          <span className="label">Explicit</span>
	                        </div>
	                    }
                        <div className="track__length">{this.convertToMinutes(track.duration_ms)}</div>
                      </div>
                    </a>
				)
			})
		}

		if(Object.entries(albumInfo).length === 0 && albumInfo.constructor === Object) {
			albumInfoContent = <div className="tracks__heading__title">YOUR ALBUM WILL BE DISPLAYED HERE</div>
		} else {


			albumInfoContent = (

				<div className="album__info">
                    <div className="album__info__art">
                      <img src={albumInfo.image.url} alt="When It's Dark Out" />
                    </div>
                    <div className="album__info__meta">
                      <div className="album__year">{new Date(albumInfo.release_date).getFullYear()}</div>
                      <div className="album__name">{albumInfo.name}</div>
                    </div>
                  </div>
				)
		}

		return (

			 <div className="overview__albums">
                {albumTracks.lenght > 0 && albumInfo && 
                  <div className="overview__albums__head">
                  <span className="section-title">TRACKS</span>
                </div>}
                <div className="album">
               		{albumTracks.length > 0 && albumInfoContent}
                  <div className="album__tracks">
                    <div className="tracks">
                      {albumTracks.length>0 && albumInfo && 
                        <div className="tracks__heading">
                          <div className="tracks__heading__number">#</div>
                          <div className="tracks__heading__title">Song</div>
                          <div className="tracks__heading__length">
                            <i className="ion-ios-stopwatch-outline" />
                          </div>
                      </div>}
                      	{albumContent}
                    </div>
                  </div>
                </div>
              </div>
		)
	}
}

export default connect(null, {playTrack, setCurrentTrack})(AlbumTracks);