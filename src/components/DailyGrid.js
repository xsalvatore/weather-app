import React, { Component } from 'react';

class DailyGrid extends Component {
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
                            <p>{data.time}:00</p>
                            <img src={require(`../uploads/${data.icon}.svg`)} alt="weather-icon"/>
                            <p>{data.temperature}°</p>
                        </div>
					);
				})
			}
			</div>
		);
	}
}

export default DailyGrid;
