import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { Snackbar } from 'react-native-paper';
import axios from 'axios';
import Error from './componants/Error.jsx';
import Today from './componants/Today.jsx';

export default function App() {
	const key = '61fb027b0692cc2461af2c2f1a7da9dd';

	const [error, setError] = useState({
		show: false,
	});
	const [loading, setLoading] = useState(false);
	const [location, setLocation] = useState(null);
	const [weatherData, setWeatherData] = useState({
		error: true,
		message: 'Nothing fetched',
	});

	const getLocation = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			setError({
				show: true,
				message: 'Permission to access location was denied',
			});
			await Location.requestForegroundPermissionsAsync();
			return;
		}
		await Location.getCurrentPositionAsync({})
			.then((res) => setLocation(res.coords))
			.catch((err) => setError({ show: true, message: err.message }));
	};
	const getData = async () => {
		setLoading(true);
		await axios(
			`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${key}&units=metric`,
		)
			.then((res) => {
				console.log(res.data);
				setWeatherData({
					error: false,
					data: res.data,
				});
			})
			.catch((err) => {
				console.log(err.message);
				setWeatherData({ error: true, message: err.message });
				setError({ show: true, message: err.message });
			});
		setLoading(false);
	};
	useEffect(() => {
		getLocation();
	}, []);
	useEffect(() => {
		if (location) {
			getData();
		}
	}, [location]);
	return (
		<View style={styles.container}>
			{loading ? (
				<ActivityIndicator color='#0090FF' size={70} />
			) : weatherData.error ? (
				<Error message={weatherData.mesage} />
			) : (
				<>
					<Today data={weatherData.data} />
				</>
			)}
			<Snackbar
				visible={error.show}
				onDismiss={() => setError({ show: false })}
				action={{
					label: 'Dismiss',
					onPress: () => {
						setError({ show: false });
					},
				}}>
				{error.message}
			</Snackbar>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
