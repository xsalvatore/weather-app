import React, { Component } from 'react';

class WeeklyGrid extends Component {
    state = {
        data: this.props.data
	}

	render() {
		return (
			<div className="grid">
			{
				this.state.data.map((data, index) => {
					return(
						<div className="column" key={index}>
							<p>{data.day}</p>
							<img src={require(`../uploads/${data.icon}.svg`)} alt="weather-icon" />
							<p>{data.temperature}°</p>
						</div>
					);
				})
			}
			</div>
		);
	}
}

export default WeeklyGrid;
