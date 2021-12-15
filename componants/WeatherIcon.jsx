import moment from 'moment';
import React from 'react';
import { Image } from 'react-native';

const icons = {
	ClearDay: require('../assets/icons/ClearDay.png'),
	ClearNight: require('../assets/icons/ClearNight.png'),
	CloudDay: require('../assets/icons/CloudDay.png'),
	CloudNight: require('../assets/icons/CloudNight.png'),
	RainDay: require('../assets/icons/RainDay.png'),
	RainNight: require('../assets/icons/RainNight.png'),
	SnowDay: require('../assets/icons/SnowDay.png'),
	SnowNight: require('../assets/icons/SnowNight.png'),
	ThunderDay: require('../assets/icons/ThunderDay.png'),
	ThunderNight: require('../assets/icons/ThunderNight.png'),
};

const WeatherIcon = ({ code, temp, size }) => {
	code = Number(code);
	let format = 'hh';
	let time = moment(temp, format);
	let beforeTime = moment('6', format);
	let afterTime = moment('18', format);
	let period;

	if (time.isBetween(beforeTime, afterTime)) {
		period = 'Day';
	} else {
		period = 'Night';
	}

	const setIcon = () => {
		if (code >= 200 && code < 300) {
			return icons[`Rain${period}`];
		} else if (code >= 300 && code < 500) {
			return icons[`Rain${period}`];
		} else if (code >= 600 && code < 700) {
			return icons[`Snow${period}`];
		} else if (code > 800 && code < 900) {
			return icons[`Cloud${period}`];
		} else if (code === 800) {
			return icons[`Clear${period}`];
		} else {
			return icons[`Clear${period}`];
		}
	};

	return (
		<Image
			resizeMode='contain'
			source={setIcon()}
			style={{ height: size || 100, width: size || 100 }}
		/>
	);
};

export default WeatherIcon;
