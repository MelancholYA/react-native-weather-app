import React from 'react';
import { Image, Text, View } from 'react-native';

const Error = ({ message }) => {
	return (
		<View
			style={{
				flex: 1,
				width: '100%',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#fbb',
				paddingHorizontal: 25,
				paddingVertical: 12,
			}}>
			<Image
				style={{ width: 120, height: 120 }}
				source={require('../assets/error.png')}
			/>
			<Text
				style={{
					color: '#500',
					fontSize: 16,
					fontWeight: '700',
					textAlign: 'center',
				}}>
				{message}
			</Text>
		</View>
	);
};

export default Error;
