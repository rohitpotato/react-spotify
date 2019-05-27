import React from 'react';

class ArtistHeader extends React.Component {

	render() {

		const {artist} = this.props;
		let artistHeader;
		if(Object.entries(artist).length === 0 && artist.constructor === Object) {

			artistHeader = (

			<div className="artist__header">
		        <div className="artist__info">
		          <div className="artist__info__meta">
		            <div className="artist__info__type">Listen to thousands of Artists!</div>
		            <div className="artist__info__name">Just Like That...</div>
		          </div>
		        </div>
		     </div>
		)
		} else {

			artistHeader = (

	<div className="artist__header">
        <div className="artist__info">
          <div className="profile__img">
            <img src={artist.images ? artist.images[0].url : ''} alt={artist.name} />
          </div>
          <div className="artist__info__meta">
            <div className="artist__info__type">Artist</div>
            <div className="artist__info__name">{artist.name}</div>
            <div className="artist__info__actions">
              <button className="button-dark">
                <i className="ion-ios-play" />
                Play
              </button>
            </div>
          </div>
        </div>
        <div className="artist__listeners">
          <div className="artist__listeners__count">{artist.followers.total}</div>
          <div className="artist__listeners__label">Active Followers</div>
        </div>
        <div className="artist__navigation">
          <ul className="nav nav-tabs" role="tablist">
            <li role="presentation" className="active">
              <a href="#artist-overview" aria-controls="artist-overview" role="tab" data-toggle="tab">Overview</a>
            </li>
          </ul>
        </div>
     </div>
			)
		}

		return (
			<div>
			{artistHeader}
			</div>
		);
	}
}


export default ArtistHeader;