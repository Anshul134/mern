import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getProject} from '../../store/actions';

class ProjectDetails extends Component {
	
	componentDidMount() {
		let projectId = this.props.projectId;
		
		this.props.getProject(projectId);
	}

	render() {
		let project = this.props.project
		
		return(
			<div className="container section project-details">
				<div className="card z-depth-0">
					<div className="card-content">
						<span className="card-title">{project.title}</span>
						<p>{project.content} </p>
					</div>
					<div className="card-action grey lighten-4 grey-text">
						<div>Posted by AA</div>
						<div>10th MAy, 1:00 AM</div>
						<div>Project Id {project.id}</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		getProject : (projectId) => dispatch(getProject(projectId) )
	}
}

const mapStateToProps = (state, ownState) => {
	
	return {projectId : ownState.match.params.id, project : state.project}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
