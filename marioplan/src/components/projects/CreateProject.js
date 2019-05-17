import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addProject} from '../../store/actions';

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title : '',
			content : ""
		}


		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		console.log("props>>>", this.props)
	}

	onChange(e) {
		this.setState({[e.target.id]:e.target.value});
	}


	onSubmit(e) {
		e.preventDefault();
		console.log("state : ", this.state);
		this.props.createProject(this.state);
		this.props.history.push('/');
	}

	render() {
		return(
			<div className="container">
				<form className="white" onSubmit={this.onSubmit}>
					<h5 className="grey-text text-darken-3">Create Project</h5>
					
					<div className="input-field">
						<label htmlFor="title">Title</label>
						<input type="text" id="title" onChange={this.onChange} value={this.state.title} />
					</div>

					<div className="input-field">
						<label>Content</label>
						<textarea id="content" className="materialize-textarea" onChange={this.onChange} value={this.state.content} />
					</div>

					<div className="input-field">
						<button className="btn blue lighten-1 z-depth-1">Create Project</button>
					</div>
				</form>
			</div>
		);
	}
}



const mapDispatchToProps = (dispatch) => {
	return {
		createProject : (project) => dispatch(addProject(project) ) 
	}
}

export default connect(null, mapDispatchToProps)(SignIn);
