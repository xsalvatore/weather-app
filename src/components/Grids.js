import React, { Component } from 'react';
import DailyGrid from './DailyGrid.js';
import WeeklyGrid from './WeeklyGrid.js';

class Grids extends Component {
    state = {
        dailyData: this.props.dailyData,
        weeklyData: this.props.weeklyData
    }

	render() {
		return (
			<div className="grids">
                <DailyGrid data={this.state.dailyData} />
                <WeeklyGrid data={this.state.weeklyData} />
			</div>
		);
	}
}

export default Grids;
