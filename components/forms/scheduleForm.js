import React, { Component } from 'react';
import Axios from 'axios';
import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';

export class ScheduleForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			year: '',
			month: '',
			day: '',
			hour: '',
			minute: '',
		};
	}

	render() {
		return (
			<View>
				<Text>Schedule Form</Text>
				<TextInput type="text" placeholder="Year" />
				<TextInput type="text" placeholder="Month" />
				<TextInput type="text" placeholder="Day" />
				<TextInput type="text" placeholder="Hour" />
				<TextInput type="text" placeholder="Minute" />
			</View>
		);
	}
}
