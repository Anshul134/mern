import React from 'react';

import ProjectSummary from './ProjectSummary';

const generateProjSummary = (projects) => {
	const projectSum =  projects && projects.map( (project) => {
		return <ProjectSummary key={project.id} project={project}/>
	});

	return projectSum ? projectSum : "Loading project..."
}

const ProjectList = ({projects}) => {
	
	return(
		<div className="project-list section">

			{generateProjSummary(projects)}
		</div>
	);
}

export default ProjectList;