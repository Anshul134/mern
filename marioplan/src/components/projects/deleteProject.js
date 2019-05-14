import React, {Component} from 'react';

import {connect} from 'react-redux';
import {RemoveProject} from '../../store/actions';

class deleteProject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title : '',
			content : ''
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({[e.target.id]:e.target.value});	
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({
			title : this.state.title,
			content : this.state.content
		})
		this.props.RemoveProject(this.props.project);
		this.props.history.push('/');
	}

	render() {
		const {project} = this.props;
		
		return(
			<div className="container">
				<form className="white" onSubmit={this.onSubmit}>
					<h5 className="grey-text text-darken-3">Create Project</h5>
					
					<div className="input-field">
						<label htmlFor="title">Title</label>
						<input type="text" id="title" onBlur={this.onChange} value={project[0].title} readOnly/>
					</div>

					<div className="input-field">
						<label>Content</label>
						<textarea id="content" className="materialize-textarea" onBlur={this.onChange} value={project[0].content} readOnly/>
					</div>

					<div className="input-field">
						<button className="btn red lighten-1 z-depth-1">Delete Project</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = parseInt(ownProps.match.params.id);
	
	return {
		project :state.projects.filter( (project) => project.id === id)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		RemoveProject : (project) => dispatch( RemoveProject(project) )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(deleteProject);