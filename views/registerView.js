import React, { Component } from "react";
import Axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Pressable,
} from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import "../assets/registerBackground.png";
import { TouchableOpacity } from "react-native";

// This is the aspect ratio of the background image
let aspectRatio = 238 / 273;

export class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      city: "Chapel Hill",
      state: "NC",
      zipcode: "27514",
      error: "",
    };
  }

  onSubmit() {
    let url = "https://strautoserver.herokuapp.com";
    let state = this.state;
    // Add error handling later
    if (
      state.fullName === "" ||
      state.email === "" ||
      state.phone === "" ||
      state.password === ""
    ) {
      this.setState({
        error: "One or more fields are empty. Please fill out and try again.",
      });
    } else {
      Axios.post(`${url}/users/register`, {
        firstName: this.state.fullName.split(" ")[0],
        lastName: this.state.fullName.split(" ")[1],
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
      })
        .then((response) => {
          let user = response.data;
          this.props.logined(user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <ImageBackground
        style={{
          width: Dimensions.get("window").width,
          aspectRatio: aspectRatio,
        }}
        source={require("../assets/registerBackground.png")}>
        <View
          style={{
            marginTop: 150,
            backgroundColor: "#f3f3f3",
            paddingTop: 40,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            height: Dimensions.get("window").height - 150,
          }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: "500",
              color: "#1f1f30",
            }}>
            Create Account
          </Text>
          <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            <Input
              leftIcon={<Icon name='user' size={20} color='black' />}
              placeholder='Full Name'
              onChangeText={(fullName) => {
                this.setState({ fullName: fullName });
              }}
            />
            <Input
              leftIcon={<Icon name='envelope' size={16} color='black' />}
              placeholder='Email'
              onChangeText={(email) => {
                this.setState({ email: email });
              }}
            />
            <Input
              leftIcon={<Icon name='phone' size={20} color='black' />}
              placeholder='Phone'
              onChangeText={(phone) => {
                this.setState({ phone: phone });
              }}
            />
            <Input
              leftIcon={<Icon name='lock' size={24} color='black' />}
              placeholder='Password'
              onChangeText={(password) => {
                this.setState({ password: password });
              }}
            />
            {/* <Input
              placeholder='City'
              onChangeText={(city) => {
                this.setState({ city: city });
              }}
            />
            <Input
              placeholder='State'
              onChangeText={(state) => {
                this.setState({ state: state });
              }}
            />
            <Input
              placeholder='Zip Code'
              onChangeText={(zipcode) => {
                this.setState({ zipcode: zipcode });
              }}
            /> */}
            {this.state.error !== "" && (
              <Text
                style={{ fontSize: 10, color: "red", marginHorizontal: 10 }}>
                {this.state.error}
              </Text>
            )}
            <Button
              style={{ marginTop: 15 }}
              titleStyle={{ fontSize: 20 }}
              onPress={() => this.onSubmit()}
              title='Sign Up'></Button>
          </View>
          <Text
            style={{
              textAlign: "center",
              flexDirection: "row",
              height: 50,
              marginTop: 20,
            }}>
            <Text style={{ color: "#1f1f30" }}>I'm already a member. </Text>
            <Text
              style={{ color: "#0095ff" }}
              onPress={() => this.props.back()}>
              Sign In
            </Text>
          </Text>
          {/* <Button
            onPress={() => {
              this.props.back();
            }}
            title='Sign In'
            type='outline'
          /> */}
        </View>
      </ImageBackground>
    );
  }
}
