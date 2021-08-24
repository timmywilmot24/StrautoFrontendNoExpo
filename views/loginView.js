import React, { Component } from "react";
import Axios from "axios";
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "twilmot@live.unc.edu",
      password: "TimmyW11!",
      error: "",
    };
  }

  handleSubmit() {
    let url = "https://strautoserver.herokuapp.com";
    Axios.post(`${url}/users/login`, {
      email: this.state.email.toLowerCase(),
      password: this.state.password,
    })
      .then((response) => {
        // if the user doesn't exist, add error message
        if (response.data == undefined) {
          this.setState({
            error:
              "Your email and/or password are incorrect. Please try again.",
          });
        } else {
          //if user exists, this data is passed to the App Component
          this.setState({ error: "" });
          console.log("Successfully logged in");
          this.props.logined(response.data);
        }
      })
      .catch((error) => {
        console.log("Failed to login");
        console.log(error);
      });
  }

  // Flesh out this later
  handleChangePassword = () => {
    console.log("Clicked password change");
  };

  render() {
    return (
      // Need to figure out how to add Lato font
      <View>
        <View style={{ marginTop: 50 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
              color: "#1f1f30",
            }}>
            Welcome to Strauto's
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 45,
              fontWeight: "bold",
              color: "#1f1f30",
            }}>
            DollarAutoClub
          </Text>
        </View>
        <View style={{ marginTop: 35, textAlign: "center", fontSize: 25 }}>
          <Text style={{ textAlign: "center", fontSize: 25, color: "#1f1f30" }}>
            Drive worry free for
          </Text>
          <Text style={{ textAlign: "center", fontSize: 25, color: "#1f1f30" }}>
            just $1 a week
          </Text>
        </View>
        <View style={{ marginTop: 35, marginHorizontal: 20 }}>
          <Input
            leftIcon={<Icon name='envelope' size={14} color='black' />}
            placeholder='Email'
            onChangeText={(email) => {
              this.setState({ email: email });
            }}
            style={{ fontSize: 15 }}
          />
          <Input
            leftIcon={<Icon name='lock' size={20} color='black' />}
            placeholder='Password'
            onChangeText={(password) => {
              this.setState({ password: password });
            }}
            style={{ fontSize: 15 }}
          />
          {this.state.error !== "" && (
            <Text style={{ color: "red" }}>{this.state.error}</Text>
          )}
          <Button
            onPress={() => {
              this.handleSubmit();
            }}
            title='Sign In'
            titleStyle={{ fontSize: 20 }}
          />
          <TouchableOpacity
            onPress={this.handleChangePassword}
            style={{ marginTop: 10 }}>
            <Text
              style={{ textAlign: "center", fontSize: 13, color: "#1f1f30" }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 40, marginHorizontal: 40 }}>
          <Text style={{ textAlign: "center", fontSize: 13, color: "#1f1f30" }}>
            Don't Have An Account?
          </Text>
          <Button
            onPress={() => {
              this.props.registering();
            }}
            title='Sign Up'
            titleStyle={{ fontSize: 25 }}
            style={{ marginTop: 10 }}
          />
        </View>
      </View>
    );
  }
}
