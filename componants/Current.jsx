import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import WeatherIcon from './WeatherIcon';
import { Text, useTheme } from 'react-native-paper';

const Switcher = ({ toggle, dark }) => {
	return (
		<View style={style.switchContainer}>
			<TouchableOpacity
				style={{
					...style.switchBall,
					transform: [{ translateX: dark ? 0 : 45 }],
				}}
				onPress={toggle}>
				<Image
					source={
						dark
							? require('../assets/icons/ClearDay.png')
							: require('../assets/icons/ClearNight.png')
					}
					style={{ height: 20, width: 20 }}
				/>
			</TouchableOpacity>
		</View>
	);
};

const Current = ({ data, toggle, dark }) => {
	return (
		<View>
			<View style={style.header}>
				<Text style={style.date}>
					{moment.unix(data.dt).format('DD/MMM/YYYY')}
				</Text>
				<Switcher toggle={toggle} dark={dark} />
			</View>
			<View style={style.weather}>
				<View>
					<Text style={style.temp}>{data.temp} &deg;</Text>
					<Text style={style.desc}>{data.weather[0].description}</Text>
				</View>
				<WeatherIcon code={data.weather[0].id} temp={moment.unix(data.dt)} />
			</View>
			<View style={style.miniDataContainer}>
				<View style={style.miniData}>
					<Text>{data.wind_speed} M/s</Text>
					<Image
						resizeMode='contain'
						style={{ width: 20, height: 20, marginLeft: 10 }}
						source={require('../assets/icons/wind.png')}
					/>
				</View>
				<View style={style.miniData}>
					<Text>{data.humidity} %</Text>
					<Image
						resizeMode='contain'
						style={{ width: 20, height: 20, marginLeft: 10 }}
						source={require('../assets/icons/humidity.png')}
					/>
				</View>
				<View style={style.miniData}>
					<Text>{data.pressure} hPa</Text>
					<Image
						resizeMode='contain'
						style={{ width: 20, height: 20, marginLeft: 10 }}
						source={require('../assets/icons/thermometer.png')}
					/>
				</View>
			</View>
			<Image
				style={{ width: '100%', height: 150 }}
				resizeMode='contain'
				source={
					dark
						? require('../assets/MountinWhite.png')
						: require('../assets/MountinBlack.png')
				}
			/>
		</View>
	);
};

const style = StyleSheet.create({
	switchContainer: {
		backgroundColor: '#DCB782',
		width: 80,
		borderRadius: 80,
		padding: 2,
	},
	switchBall: {
		backgroundColor: '#1C1826',
		height: 30,
		width: 30,
		borderRadius: 28,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 25,
		padding: 15,
	},
	date: {
		fontSize: 24,
		fontFamily: 'Roboto',
	},
	weather: {
		flexDirection: 'row',
		padding: 20,
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 30,
	},
	temp: {
		fontSize: 45,
	},
	desc: {
		fontSize: 20,
		textTransform: 'capitalize',
	},
	miniDataContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15,
	},
	miniData: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		minWidth: '20%',
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: '#707070',
		padding: 12,
		borderRadius: 3,
	},
});
export default Current;
