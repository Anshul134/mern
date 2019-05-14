import React from 'react';
import {Link} from 'react-router-dom';

const ProjectSummary = ({project}) => {
	return(
			<div className="card z-depth-1 project-summary">
					<div className="card-content grey-text text-darken-3">
						<span className="card-title">{project.title}</span>
						<p>Posted By : AA</p>
						<p className="grey-text">9th May, 3:00AM</p>
					</div>
					<Link to={"/project/"+project._id}><button className="btn btn-primary">More</button></Link>
					<Link to={"/project/delete/"+project._id}><button className="btn red">Delete</button></Link>
						
			</div>
		);
}

export default ProjectSummary;