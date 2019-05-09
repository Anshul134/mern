import React from 'react';
import {Link} from 'react-router-dom';

const ProjectSummary = ({project}) => {
	return(
			<div className="card z-depth-1 project-summary">
				<Link to={"/project/" + project.id}>
					<div className="card-content grey-text text-darken-3">
						<span className="card-title">{project.title}</span>
						<p>Posted By : AA</p>
						<p className="grey-text">9th May, 3:00AM</p>
					</div>
				</Link>	
			</div>
		);
}

export default ProjectSummary;