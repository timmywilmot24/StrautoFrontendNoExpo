import React, { Component } from 'react';
import Axios from 'axios';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button, SearchBar, Card, Input } from 'react-native-elements';

// Test git push.
export class BookView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shop: this.props.shop,
			confirming: false,
			month: '',
			day: '',
			time: '',
		};
	}

	//when the user finishes filling the form
	book() {
		this.setState({
			confirming: true,
		});
	}

	cancel() {
		this.setState({
			shop: this.props.shop,
			confirming: false,
			month: '',
			day: '',
			year: '',
			time: '',
		});
		this.props.unrender();
	}

	confirm() {
		//make axios call to set schedule into user database then
		this.cancel();
	}

	render() {
		return (
			<View>
				{this.state.confirming ? (
					<View>
						<Text>Please Confirm</Text>
						<Text>You are booking a car appointment with</Text>
						<Text>{this.state.shop.name} @</Text>
						<Text>{this.state.shop.address}</Text>
						<Text>
							{this.state.month}/{this.state.day}/{this.state.year}
						</Text>
						<Text>@ {this.state.time}</Text>
						<Button
							title="Confirm"
							onPress={() => {
								this.confirm();
							}}
						/>
						<Button
							title="Cancel"
							onPress={() => {
								this.cancel();
							}}
						/>
					</View>
				) : (
					<View>
						<Button
							title="Back"
							onPress={() => {
								this.setState({
									confirming: false,
									month: '',
									day: '',
									time: '',
								});
								this.props.unrender();
							}}
						/>
						<Card>
							<Image
								style={{ width: 250, height: 250 }}
								source={{
									uri: `data:image/jpeg;base64,${this.state.shop.image}`,
								}}
							/>
							<View>
								<Text>{this.state.shop.address}</Text>
								<Text>{this.state.shop.city}</Text>
								<Text>{this.state.shop.state}</Text>
								<Text>{this.state.shop.zipcode}</Text>
								<Text>{this.state.shop.phone}</Text>
							</View>
							<Text>{this.state.shop.name}</Text>
							<Input
								placeholder="Month"
								onChangeText={(month) => {
									this.setState({ month: month });
								}}
							/>
							<Input
								placeholder="Day"
								onChangeText={(day) => {
									this.setState({ day: day });
								}}
							/>
							<Input
								placeholder="Year"
								onChangeText={(year) => {
									this.setState({ year: year });
								}}
							/>
							<Input
								placeholder="Time"
								onChangeText={(time) => {
									this.setState({ time: time });
								}}
							/>
							<Button
								title="Book Now"
								onPress={() => {
									this.book();
								}}
							/>
						</Card>
					</View>
				)}
			</View>
		);
	}
}
