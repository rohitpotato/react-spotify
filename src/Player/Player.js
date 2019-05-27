import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

class Player extends React.Component {

	render() {

		const {trackInfo, url, style} = this.props;

		return (
			<section className="current-track">

				<div className="track" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="track__art">
                      {trackInfo.image && <img src={trackInfo.image} alt="" style={{ heigth:'40px', width:'50px'}}/>}
                    </div>
                    <div className="track__title" style={{ color: 'white'}}>{trackInfo.name}</div>
                    {trackInfo.explicit && 
	                    <div className="track__explicit">
	                      <span className="label">Explicit</span>
	                    </div>
	               	}
                  </div>
	    		<ReactAudioPlayer
				  src={url}
				  style={style}
				  autoPlay
				  controls
				  volume={0.2}
				/>
	        </section>
		);
	}
}

export default Player;