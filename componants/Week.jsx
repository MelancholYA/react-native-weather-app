import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import Day from './Day';

const Week = ({ data, dark }) => {
	return (
		<ScrollView>
			{data?.map((day, i) => i > 0 && <Day dark={dark} key={i} data={day} />)}
		</ScrollView>
	);
};

export default Week;
