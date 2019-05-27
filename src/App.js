import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import {getUserTopTracks, getRecentlyPlayed, getNewReleases} from './actions';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Cover from './Cover/Cover';
import Player from './Player/Player';

const style = {

	marginLeft: '20%', 
	display: 'block', 
  width: '50%'
};

class App extends React.Component  {

  state = {
  	url: '',
  	trackInfo: {},
  	token: '',
  	userTopTracks: [],
  	recentlyPlayed: [],
  	newReleases: []
  }


  componentWillReceiveProps(nextProps) {
  		if(Object.entries(nextProps.auth.user).length != Object.entries(this.props.auth.user).length) {
  			this.setState({ token: nextProps.auth.token }, () => {
          this.props.getNewReleases(this.state.token);
  				this.props.getUserTopTracks(this.state.token);
  				this.props.getRecentlyPlayed(this.state.token);
  			});
  		}
  		this.setState({ url: nextProps.track.url,
  						trackInfo: nextProps.track.trackInfo,
  						userTopTracks: nextProps.track.userTopTracks,
  						recentlyPlayed: nextProps.track.recentlyPlayed,
              newReleases: nextProps.albums.newReleases
  					 });
  }

  render() {

  const {trackInfo, userTopTracks, recentlyPlayed, newReleases} = this.state;

  return (

	    <div>
	        <Header />
	        <Cover 
          userTopTracks={userTopTracks} 
          recentlyPlayed={recentlyPlayed}
          newReleases={newReleases}
          />
          <Player 
            trackInfo={trackInfo}
            url={this.state.url}
            style={style}
          />
	    </div>
 	 );
  }
}

const mapStateToProps = state => ({

	auth: state.auth,
	track: state.track,
	albums: state.albums
})

export default connect(mapStateToProps, 
{
 getUserTopTracks,
 getRecentlyPlayed, 
 getNewReleases
})
(App);
