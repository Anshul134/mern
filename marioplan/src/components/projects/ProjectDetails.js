import React from 'react';
import {connect} from 'react-redux';

const ProjectDetails = ({project}) => {
	
	return(
		<div className="container section project-details">
			<div className="card z-depth-0">
				<div className="card-content">
					<span className="card-title">{project[0].title}</span>
					<p>{project[0].content} </p>
				</div>
				<div className="card-action grey lighten-4 grey-text">
					<div>Posted by AA</div>
					<div>10th MAy, 1:00 AM</div>
					<div>Project Id {project[0].id}</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state, ownProps) => {
	const id = parseInt(ownProps.match.params.id);
	return {
		project : state.projects.filter( (project) => project.id === id)
	}
}

export default connect(mapStateToProps)(ProjectDetails);