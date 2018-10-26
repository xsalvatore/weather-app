import React, { Component } from 'react';

class Current extends Component {
	state = {
		data: this.props.currentData
	}

	render() {
		return (
			<article className="current">
				<img src={require('../uploads/' + this.state.data.icon + '.svg')} alt="weather-icon"/>
				<h1>{this.state.data.temperature}°</h1>
			</article>
		);
	}
}

export default Current;
