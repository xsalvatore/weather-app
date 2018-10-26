import React, { Component } from 'react';
import axios from 'axios';
import key from '../config/keys.js';

import Form from './Form.js';
import Data from './Data.js'

class App extends Component {
	state = {
		text: "",
		currentData: [],
		dailyData: [],
		weeklyData: [],
		loaded: false,
	}

	handleInputOnChange = e => {
		this.setState({
			text: e.target.value
		});
	}

	handleFormOnSubmit = e => {
		e.preventDefault();

		this.handleWeatherFetch();
	}
	
	handleWeatherFetch = async (e) => {
		axios.all([
			axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.text}&appid=${key.openweathermap}&units=metric`),
			axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.text}&appid=${key.openweathermap}&units=metric&cnt=5`),
			axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${this.state.text}&appid=${key.openweathermap}&units=metric&cnt=6`)
		])
		.then(axios.spread((currentResponse, dailyResponse, weeklyResponse) => {
			/* ================================================== */
			
			let currentData = {};

			const date = new Date();
			const hour = date.getHours();

			currentData.hour = hour;
			currentData.temperature = Math.round(currentResponse.data.main.temp);

			if(currentData.hour >= 21 || currentData.hour <= 3)
				currentData.icon = `night/${currentResponse.data.weather[0].main.toLowerCase()}`;	

			else
				currentData.icon = `day/${currentResponse.data.weather[0].main.toLowerCase()}`;

			/* ================================================== */

			let dailyData = [];

			for(let i=0; i<dailyResponse.data.list.length; i++) {
				let object = {};
				
				let hour = dailyResponse.data.list[i].dt_txt.split(" ")[1];
				hour = hour.substring(0, 2);

				object.time = hour;

				if(object.time >= 21 || object.time <= 3)
					object.icon = `night/${dailyResponse.data.list[i].weather[0].main.toLowerCase()}`;

				else
					object.icon = `day/${dailyResponse.data.list[i].weather[0].main.toLowerCase()}`;

				object.temperature = Math.round(dailyResponse.data.list[i].main.temp);

				dailyData.push(object);
			}

			/* ================================================== */

			let weeklyData = [];

			const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			const now = date.getDay();

			let index = now + 1;

			for(let i=0; i<5; i++) {
				let object = {};

				if(index > 6)
					index = 0;

				object.day = days[index];
				object.temperature = Math.round(weeklyResponse.data.list[i+1].temp.day);
				object.icon = `day/${weeklyResponse.data.list[i+1].weather[0].main.toLowerCase()}`;

				weeklyData.push(object);
						
				index ++;
			}

			/* ================================================== */

			this.setState({
				currentData: currentData,
				dailyData: dailyData,
				weeklyData: weeklyData,
				loaded: true,
			})
		}));
	}

	

	render() {
		return (
			<div className="app">
				<Form onSubmit={this.handleFormOnSubmit} value={this.state.text} onChange={this.handleInputOnChange} />
				{ this.state.loaded 
					? <Data loaded={this.state.loaded} currentData={this.state.currentData} dailyData={this.state.dailyData} weeklyData={this.state.weeklyData} />
					: ""
				}

				<footer className={this.state.loaded ? `visible` : `hidden`}>
					<div className="daily-view circular-nav active"></div>
					<div className="weekly-view circular-nav"></div>
				</footer>	
			</div>
		);
	}
}

export default App;
