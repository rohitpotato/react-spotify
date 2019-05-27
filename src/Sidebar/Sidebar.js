import React from 'react';
import {connect} from 'react-redux';
import Results from './Results';

class Header extends React.Component {

	state = {
		artists: [],
		loading: true,
		token: ''
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ artists: nextProps.artists.artists, loading: nextProps.artists.loading, token: nextProps.auth.token });
	}

	render() {

		const {artists, loading, token} = this.state;

	return (

	<div className="content__left">
	  <section className="navigation">
	    <div className="navigation__list">
	      <div className="overview__related">
				<Results artists={artists} loading={loading} token={token}/>
			</div>
	    </div>
	 
	  </section>
	</div>

		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	artists: state.artist
})

export default connect(mapStateToProps)(Header);