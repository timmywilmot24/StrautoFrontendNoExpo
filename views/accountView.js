import React, { Component } from "react";
import Axios from "axios";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export class AccountView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      phone: this.props.user.phone,
      city: this.props.user.city,
      state: this.props.user.state,
      zipcode: this.props.user.zipcode,
      userID: this.props.user._id,
    };
  }

  //sends them back to Dashboard
  onCancel() {
    this.props.changeToView(this.props.previousView);
  }

  onSubmit() {
    let url = "https://strautoserver.herokuapp.com";
    Axios.post(
      `${url}/users/update/${this.state.userID}`,
      {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phone: this.state.phone,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.props.user.token,
        },
      }
    )
      .then(() => {
        //this data is passed to the App Component via this.props.updateUser
        let user = this.props.user;
        user.firstName = this.state.firstName;
        user.lastName = this.state.lastName;
        user.phone = this.state.phone;
        user.city = this.state.city;
        user.state = this.state.state;
        user.zipcode = this.state.zipcode;
        this.props.updateUser(user);

        //sends them back to Dashboard after submitting
        this.onCancel();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <SafeAreaView>
        <Button
          style={{
            alignSelf: "flex-end",
            marginRight: 10,
            marginTop: 10,
          }}
          type='clear'
          icon={<Icon name='bars' size={30} color='black' />}
          onPress={() => {
            this.props.navigate();
          }}
        />
        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              color: "#1f1f30",
              textAlign: "center",
              fontSize: 30,
              fontWeight: "500",
              marginVertical: 20,
            }}>
            Edit Profile
          </Text>
          <Input
            placeholder={this.props.user.firstName}
            onChangeText={(firstName) => {
              this.setState({ firstName: firstName });
            }}></Input>
          <Input
            placeholder={this.props.user.lastName}
            onChangeText={(lastName) => {
              this.setState({ lastName: lastName });
            }}></Input>
          <Input
            placeholder={this.props.user.phone}
            onChangeText={(phone) => {
              this.setState({ phone: phone });
            }}></Input>
          <Input
            placeholder={this.props.user.city}
            onChangeText={(city) => {
              this.setState({ city: city });
            }}></Input>

          {/* make this a select with 50 state options */}
          <Input
            placeholder={this.props.user.state}
            onChangeText={(state) => {
              this.setState({ state: state });
            }}></Input>

          <Input
            placeholder={this.props.user.zipcode}
            onChangeText={(zipcode) => {
              this.setState({ zipcode: zipcode });
            }}></Input>
        </View>
        <View style={{ flexDirection: "row", marginHorizontal: 30 }}>
          <Button
            title='Submit'
            onPress={() => {
              this.onSubmit();
            }}
            style={{ width: (Dimensions.get("window").width - 80) / 2 }}
          />
          <View style={{ width: 20 }}></View>
          <Button
            style={{ width: (Dimensions.get("window").width - 80) / 2 }}
            title='Cancel'
            onPress={() => {
              this.onCancel();
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
