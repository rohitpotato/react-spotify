import React from 'react';
import {connect} from 'react-redux';
import {playTrack, setCurrentTrack} from '../actions';

class RecentlyPlayed extends React.Component {

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

		const {recentlyPlayed, albumInfo} = this.props;
		let recentlyPlayedContent;
		if(recentlyPlayed && recentlyPlayed.length > 0) {

			recentlyPlayedContent = recentlyPlayed.map((rcp, index) => {

				return (
					<a onClick={this.playMedia(rcp.track.preview_url, rcp.track.name, rcp.track.album.images ? rcp.track.album.images[0].url : {}, rcp.track.explicit)} key={index}>
                      <div className="track">
                        <div className="track__number">{index+1}</div>
                        <div className="track__title featured">
                          <span className="title">{rcp.track.name}</span>
                          {
                          	rcp.track.artists && rcp.track.artists.map(artist => (
                          		<span className="feature" key={artist.name}>{artist.name}</span>
                          	))
                          }
                        </div>
                        {rcp.track.explicit && 
	                        <div className="track__explicit">
	                          <span className="label">Explicit</span>
	                        </div>
	                    }
                        <div className="track__length">{this.convertToMinutes(rcp.track.duration_ms)}</div>
                      </div>
                    </a>
				      )
		    	})
		    }


		return (

			 <div className="overview__albums">
                  <div className="overview__albums__head">
                  <span className="section-title">RECENTLY PLAYED</span>
                </div>
                <div className="album">
                  <div className="album__tracks">
                    <div className="tracks">
                      {recentlyPlayed && recentlyPlayed.length>0 && 
                        <div className="tracks__heading">
                          <div className="tracks__heading__number">#</div>
                          <div className="tracks__heading__title">Song</div>
                          <div className="tracks__heading__length">
                            <i className="ion-ios-stopwatch-outline" />
                          </div>
                      </div>}
                      {recentlyPlayedContent}
                    </div>
                  </div>
                </div>
              </div>
		)
	}
}

export default connect(null, {playTrack, setCurrentTrack})(RecentlyPlayed);