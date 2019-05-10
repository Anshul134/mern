import React, {Component} from 'react';

class SignOn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email : '',
			password : "",
			firstName : '',
			lastName : ''
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
						<label>First Name</label>
						<input type="text" id="firstName" onChange={this.onChange} value={this.state.firstName}/>
					</div>

					<div className="input-field">
						<label>Last Name</label>
						<input type="text" id="lastName" onChange={this.onChange} value={this.state.lastName}/>
					</div>

					<div className="input-field">
						<button className="btn blue lighten-1 z-depth-1">Sign Up</button>
					</div>
				</form>
			</div>
		);
	}
}

export default SignOn;