import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

const Today = ({ data }) => {
	console.log({ hh: data });
	return (
		<>
			<ImageBackground
				style={{
					flex: 1,
					width: '100%',
					paddingTop: Constants.statusBarHeight + 15,
				}}
				source={require('../assets/bgNight.jpg')}
				resizeMode='cover'>
				<StatusBar style='light' />
				<Text style={styles.title}>{data.name}</Text>
				<View style={styles.container}>
					<View>
						<Text style={styles.text}>{data.weather[0].main}</Text>
						<Text style={styles.text}>{data.weather[0].description}</Text>
					</View>
					<Text style={{ color: 'white', fontSize: 40 }}>
						{data.main.temp} &#8451;
					</Text>
				</View>
				<View style={{ ...styles.tags }}>
					<View style={{ ...styles.smallContainer, backgroundColor: 'white' }}>
						<Image
							source={require('../assets/humidity.png')}
							style={styles.tagIcon}
						/>
						<Text>{data.main.humidity} %</Text>
					</View>
					<View style={{ ...styles.smallContainer, backgroundColor: 'white' }}>
						<Image
							source={require('../assets/barometer.png')}
							style={styles.tagIcon}
						/>
						<Text>{data.main.pressure} hPa</Text>
					</View>
					<View style={{ ...styles.smallContainer, backgroundColor: 'white' }}>
						<Image
							source={require('../assets/fresh-air.png')}
							style={styles.tagIcon}
						/>
						<Text>{data.wind.speed} m/s</Text>
					</View>
				</View>
			</ImageBackground>
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 45,
		color: 'white',
		textAlign: 'center',
		marginTop: 25,
	},
	text: {
		color: 'white',
	},

	container: {
		margin: 20,
		padding: 12,
		backgroundColor: '#ffffff55',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 5,
	},
	tags: {
		margin: 10,
		padding: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	smallContainer: {
		width: '30%',
		backgroundColor: 'white',
		borderRadius: 5,
		padding: 12,
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	tagIcon: { height: 25, width: 25, marginBottom: 10 },
});

export default Today;
