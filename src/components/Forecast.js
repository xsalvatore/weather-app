import React, { Component } from 'react';
import Grids from './Grids.js';

class Forecast extends Component {
    state = {
        dailyData: this.props.dailyData,
        weeklyData: this.props.weeklyData
    }

	render() {
		return (
            <article className="forecast">
                <Grids dailyData={this.state.dailyData} weeklyData={this.state.weeklyData} />
            </article>
		);
	}
}

export default Forecast;
