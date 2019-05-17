import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchProject} from '../../store/actions';



class ProjectDetails extends Component  {
	componentDidMount() {
		console.log(this.props)
		this.props.fetchProject(this.props.projId);
		console.log(this.props.projId);
	}
	render() {
		const {project} = this.props;
		return(
			<div className="container section project-details">
				<h3>hello</h3>
		</div>
		);
	 }
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProject : (id) => dispatch(fetchProject(id))
	}
}
const mapStateToProps = (state, ownState) => {
	return {
		projId : ownState.match.params.id,
		project : state.project
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ProjectDetails);