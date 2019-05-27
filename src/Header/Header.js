import React from 'react';
import {connect} from 'react-redux';
import {getArtists} from '../actions';

class Header extends React.Component {

	state = {
		name: '',
		displayImage: '',
		searchQuery: ''
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.auth.user != this.props.auth.user) {
			this.setState({ name: nextProps.auth.user.display_name, displayImage: nextProps.auth.user.images[0].url ? nextProps.auth.user.images[0].url : ''  });
		}
	}

	onSearchChange = (e) => {
		const {token} = this.props.auth;
		this.setState({ searchQuery: e.target.value }, () => {
			this.props.getArtists(this.state.searchQuery, token);
		});
	}

	render() {

		const {name, displayImage} = this.state;

  return (

	<section className="header">
	  <div className="search">
	    <input type="text" placeholder="Search" name="search" onChange={this.onSearchChange}/> 
	  </div>
	  <div className="user"> 
	    <div className="user__info"> 
	      <span className="user__info__img">
	        <img src={displayImage} alt="Profile Picture" className="img-responsive" />
	      </span>
	      <span className="user__info__name" style={{ marginLeft: '15px' }}>
	        <span className="first">{name}</span>
	        <span className="last"></span>
	      </span>
	    </div>
	  </div>
	</section>

		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, {getArtists})(Header);