import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ArtistHeader from './ArtistHeader';
import TopTracks from './TopTracks';
import Albums from './Albums';
import AlbumTracks from './AlbumTracks';
import UserTopTracks from '../Preload/UserTopTracks';
import RecentlyPlayed from '../Preload/RecentlyPlayed';
import NewReleases from '../Preload/NewReleases';
import RelatedArtists from './RelatedArtists';
import {connect} from 'react-redux';

class Cover extends React.Component {

  state = {
    artist: {},
    loading: false,
    tracks: [],
    albums: [],
    token: '',
    albumTracks: [],
    albumInfo: {},
    relatedArtists: []
  };

  componentWillReceiveProps(nextProps) {
     this.setState({ artist: nextProps.artist.artist, 
                    loading: nextProps.artist.loading,
                    tracks: nextProps.artist.tracks,
                    albums: nextProps.albums.albums,
                    token: nextProps.auth.token,
                    albumTracks: nextProps.albums.albumTracks,
                    albumInfo: nextProps.albums.albumInfo,
                    relatedArtists: nextProps.artist.relatedArtists
                  });
  }

	render() {

  const {artist, loading, tracks, albums, token, albumTracks, albumInfo, relatedArtists} = this.state;
  const {userTopTracks, recentlyPlayed, newReleases} = this.props;

		return (

<section className="content">
 	<Sidebar />
  <div className="content__middle">
    <div className="artist is-verified">
        <ArtistHeader artist={artist} loading={loading}/>
      <div className="artist__content">
        <div className="tab-content"> 
          <div role="tabpanel" className="tab-pane active" id="artist-overview">
            <div className="overview">
              <div className="overview__artist">     
                {(tracks && tracks.length > 0) ? <TopTracks tracks={tracks}/> : <UserTopTracks userTopTracks={userTopTracks}/> }
              </div>
                {albums && albums.length > 0 ? 
                  <Albums albums={albums} token={token}/> :
                 <NewReleases token={token} newReleases={newReleases}/>
               }
                {albumTracks && albumTracks.length > 0 ? <AlbumTracks albumTracks={albumTracks} albumInfo={albumInfo}/> : <RecentlyPlayed recentlyPlayed={recentlyPlayed}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <RelatedArtists relatedArtists={relatedArtists} token={token}/>
</section>

		);
	}
}

const mapStateToProps = state => ({
  auth: state.auth,
  artist: state.artist,
  albums: state.albums
});
export default connect(mapStateToProps)(Cover);