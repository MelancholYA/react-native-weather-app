import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import WeatherIcon from './WeatherIcon';

const Day = ({ data, dark }) => {
	const style = StyleSheet.create({
		container: {
			padding: 10,
			backgroundColor: dark ? '#00000020' : '#FFFFFF16',
			margin: 10,
			marginTop: 0,
			flexDirection: 'row',
			justifyContent: 'space-between',
			borderRadius: 5,
		},
		RightContainer: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		day: {
			fontSize: 20,
			fontWeight: '700',
		},
	});
	return (
		<View style={style.container}>
			<View>
				<Text style={style.day}>{moment.unix(data.dt).format('dddd')}</Text>
				<Text>{data.weather[0].description}</Text>
			</View>
			<View style={style.RightContainer}>
				<View style={{ marginRight: 10 }}>
					<Text>Min : {data.temp.min}&deg;</Text>
					<Text>Max : {data.temp.max}&deg;</Text>
				</View>
				<WeatherIcon
					size={30}
					code={data.weather[0].id}
					temp={moment.unix(data.dt)}
				/>
			</View>
		</View>
	);
};

export default Day;
