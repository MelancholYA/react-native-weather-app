import axios from 'axios';

import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	BackHandler,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import Current from './componants/Current';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Week from './componants/Week';

export default function App() {
	const key = '61fb027b0692cc2461af2c2f1a7da9dd';

	const [location, setLocation] = useState(null);
	const [weatherData, setWeatherData] = useState({
		error: null,
		message: 'fetching...',
		data: null,
	});
	const [dark, setDark] = useState(false);
	const [loaded] = useFonts({
		Montserrat: require('./assets/Roboto.ttf'),
	});

	const getLocation = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			Alert.alert(
				'No location provided',
				"Please allow the app to access your device's location ",
				[
					{
						text: 'Exit App',
						onPress: () => BackHandler.exitApp(),
						style: 'cancel',
					},
					{
						text: 'Give Permision',
						onPress: async () =>
							await Location.requestForegroundPermissionsAsync(),
					},
				],
			);
			return;
		}
		await Location.getCurrentPositionAsync({}).then((res) =>
			setLocation(res.coords),
		);
	};

	const getData = async () => {
		await axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=
		minutely,
		hourly,
		alerts&units=metric&appid=${key}`)
			.then((res) =>
				setWeatherData({
					error: false,
					data: res.data,
				}),
			)
			.catch((err) =>
				setWeatherData({
					error: true,
					message: err.message,
				}),
			);
	};
	useEffect(() => {
		getLocation();
	}, []);
	useEffect(() => {
		if (location) {
			getData();
		}
	}, [location]);
	const theme = {
		...DefaultTheme,
		roundness: 2,
		colors: {
			...DefaultTheme.colors,
			primaryDark: dark ? '#FFEBCF' : '#1C1826',
			primaryLight: dark ? '#1C1826' : '#FFEBCF',
			text: dark ? '#1C1826' : '#FFEBCF',
		},
	};

	return weatherData.error === null || !loaded ? (
		<View style={style.center}>
			<ActivityIndicator color='#000000' size={70} />
		</View>
	) : weatherData.error ? (
		<View style={style.center}>
			<Text style={style.error}>{weatherData.message}</Text>
		</View>
	) : (
		<PaperProvider theme={theme}>
			<View
				style={{
					...style.container,
					backgroundColor: dark ? '#FFEBCF' : '#1C1826',
				}}>
				<StatusBar style='light' />
				<Current
					data={weatherData.data.current}
					toggle={() => setDark(!dark)}
					dark={dark}
				/>
				<Week data={weatherData.data.daily} dark={dark} />
			</View>
		</PaperProvider>
	);
}

const style = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	error: {
		backgroundColor: '#faa',
		padding: 12,
		borderRadius: 3,
	},
	container: {
		flex: 1,

		paddingTop: Constants.statusBarHeight,
	},
});
