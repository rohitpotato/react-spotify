import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route, Switch, withRouter, Link } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';	
import rootReducer from './reducers';
import Login from './Login/Login';
import {setUserToken, getUser} from './actions';
import * as serviceWorker from './serviceWorker';

const store = compose(
	applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
)(createStore)(rootReducer);

class Root extends React.Component {

	componentDidMount() {

			let hashParams = {};
			let e, r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
			while ( e = r.exec(q)) {
				hashParams[e[1]] = decodeURIComponent(e[2]);
			}

			if(!hashParams.access_token) {
				this.props.history.push('/login');
				
			} else {
				this.props.setUserToken(hashParams.access_token);
			}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.auth.token != this.props.auth.token) {
			this.props.getUser(nextProps.auth.token);
		}
	}

	render() {

		return (
			<div>
			<Switch>
				<Route exact path='/login' component={Login} />
				<Route exact path='/' component={App} /> 
			</Switch>
			</div>
		)
	}
}

const mapStateToProps = state => ({

	auth: state.auth
});

const RootWithAuth = withRouter(connect(mapStateToProps, {setUserToken, getUser})(Root))

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<RootWithAuth />
		</Router>
	</Provider>
	, 
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
