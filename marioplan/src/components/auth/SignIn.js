import React, {Component} from 'react';

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email : '',
			password : ""
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({[e.target.id]:e.target.value});
		//console.log("email : ", this.state.email);
	}


	onSubmit(e) {
		e.preventDefault();
		console.log("state : ", this.state);
	}

	render() {
		return(
			<div className="container">
				<form className="white" onSubmit={this.onSubmit}>
					<h5 className="grey-text text-darken-3">Sign In</h5>
					
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="text" id="email" onChange={this.onChange} value={this.state.email} />
					</div>

					<div className="input-field">
						<label>Password</label>
						<input type="password" id="password" onChange={this.onChange} value={this.state.password}/>
					</div>

					<div className="input-field">
						<button className="btn blue lighten-1 z-depth-1">Sign In</button>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;