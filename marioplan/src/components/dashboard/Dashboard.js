import React, {Component} from 'react';

import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';

import {getItems} from '../../store/actions';
 
import {connect} from 'react-redux';

class Dashboard extends Component {
	
	componentDidMount() {
		
		this.props.getItems();
	}

	render() {
		const projects = this.props.projects;
		
		return(
			<div className="dashboard container">
				<div className="row">
					<div className="col s12 m6">
						<ProjectList projects={projects}/>
					</div>

					<div className="col s12 m5 offset-m1">
						<Notifications/>
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => {

	return {
		projects : state.projects
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getItems : () => dispatch(getItems() ) 
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);