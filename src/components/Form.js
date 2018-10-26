import React, { Component } from 'react';

class Form extends Component {
	render() {
		return (
			<form onSubmit={this.props.onSubmit}>
				<input placeholder="Enter : City, Country" type="text" value={this.props.value} onChange={this.props.onChange}/>
			</form>
		);
	}
}

export default Form;
