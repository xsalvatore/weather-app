import React, { Component } from 'react';

import Current from './Current.js';
import Forecast from './Forecast.js';

class Data extends Component {
    state = {
       loaded : this.props.loaded,
       currentData: this.props.currentData,
       dailyData: this.props.dailyData,
       weeklyData: this.props.weeklyData
    }

	render() {
		return (
            <section className={this.state.loaded ? `visible` : `hidden`}>
                <Current currentData={this.state.currentData} />
                <Forecast dailyData={this.state.dailyData} weeklyData={this.state.weeklyData} />
            </section>
		);
	}
}

export default Data;