import React, { Component } from 'react';
import Axios from 'axios';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button, SearchBar, Card } from 'react-native-elements';

import { BookView } from './bookView';

export class ShopsView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			zipcode: '27510', //need zip code from user
			shops: '',
			shopsLoaded: false,
			booking: false,
			bookView: '',
		};
	}

	handleSearch(autoshop) {
		if (autoshop !== '') {
			let url = 'https://strautoserver.herokuapp.com';
			Axios.get(`${url}/autoshops/find/byName/${autoshop}`)
				.then((response) => {
					this.setState({
						shops: response.data,
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	shopCards() {
		return (
			<ScrollView>
				{this.state.shops.map((shop) => {
					return (
						<Card key={shop._id}>
							{/* left side */}
							<View>
								<Image
									style={{ width: 250, height: 250 }}
									source={{
										uri: `data:image/jpeg;base64,${shop.image}`,
									}}
								/>
							</View>
							{/* ride side */}
							<View>
								<Text>{shop.name}</Text>
								<Text>{shop.locationName} Location</Text>
								<Text>{shop.phone}</Text>
								<Text>{shop.address}</Text>
								<Text>{shop.city}</Text>
								<Text>{shop.state}</Text>
								<Text>{shop.zipcode}</Text>
								<Button
									title="Book an appointment"
									onPress={() => {
										this.booking(shop);
									}}
								/>
							</View>
						</Card>
					);
				})}
			</ScrollView>
		);
	}

	booking(shop) {
		this.setState({ booking: true, bookView: shop });
	}

	backToScheduleView = () => {
		this.setState({ booking: false, bookView: '' });
	};

	componentDidMount() {
		let url = 'https://strautoserver.herokuapp.com';
		Axios.get(`${url}/autoshops/find/byZipcode/${this.state.zipcode}`)
			.then((response) => {
				this.setState({
					shops: response.data,
					shopsLoaded: true,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<View>
				{this.state.booking ? (
					<BookView
						shop={this.state.bookView}
						unrender={this.backToScheduleView}
					>
						Booking
					</BookView>
				) : (
					<View>
						<Button
							title="Back to Dashboard"
							onPress={() => {
								this.props.goBack();
							}}
						/>
						<Text>Find Local Shops</Text>
						<SearchBar
							placeholder="Search an autoshop"
							round="true"
							lightTheme="true"
							onChangeText={(search) => {
								this.setState({ search: search });
								this.handleSearch(search);
							}}
							value={this.state.search}
						/>
						<View>
							{this.state.shopsLoaded ? (
								<View>{this.shopCards()}</View>
							) : (
								<View>
									<Text>Loading Shops</Text>
								</View>
							)}
						</View>
					</View>
				)}
			</View>
		);
	}
}
