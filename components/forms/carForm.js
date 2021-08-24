import React, { Component } from "react";
import Axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

// This is the aspect ratio of the background image
let aspectRatio = 238 / 273;

export class CarForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enteringVin: false,
      carName: "",
      vin: "",
      make: "",
      model: "",
      year: "",
      color: "Blue",
      miles: 10000,
      error: "",
    };
  }

  handleSwitch(vinView) {
    console.log(this.props.user.token);
    if (this.state.enteringVin !== vinView) {
      this.setState({
        vin: "",
        make: "",
        model: "",
        year: "",
        color: "",
        miles: "",
        enteringVin: vinView,
      });
    }
  }

  handleCreate = () => {
    let url = "https://strautoserver.herokuapp.com";
    if (this.state.enteringVin) {
      if (this.state.vin.length !== 17 || this.state.miles === "") {
        this.setState({
          error:
            "VIN number is incorrect length or miles is empty. Please verify your information and try again.",
        });
      } else {
        // Make axios call
        Axios.post(`${url}/cars/addCar`, {
          vin: this.state.vin,
          miles: this.state.miles,
        }).then((response) => {
          console.log(response);
          ///////////////////////////////////////////////////////
          // When we add VIN feature, add axios stuff here !!! //
          ///////////////////////////////////////////////////////
        });
      }
    } else {
      let state = this.state;
      if (
        state.make === "" ||
        state.model === "" ||
        state.year === "" ||
        state.color === "" ||
        state.miles === ""
      ) {
        this.setState({
          error:
            "One or more fields have not been entered. Please verify all information and try again.",
        });
      } else {
        // Make axios call
        Axios.post(`${url}/cars/addCar`, {
          make: this.state.make,
          model: this.state.model,
          year: this.state.year,
          color: this.state.color,
          miles: this.state.miles,
        }).then((response) => {
          let car = response.data;
          Axios.post(
            `${url}/users/updateCars/${this.props.user._id}`,
            {
              cars: [car._id],
            },
            {
              headers: {
                "Content-Type": "application/json",
                "x-access-token": this.props.user.token,
              },
            }
          ).then((response) => {
            // Updates the App View as well as Home View
            this.props.updateAppUser(response.data, car);
          });
        });
      }
    }
  };

  render() {
    return (
      <ImageBackground
        style={{
          width: Dimensions.get("window").width,
          aspectRatio: aspectRatio,
        }}
        source={require("../../assets/registerBackground.png")}>
        <View
          style={{
            marginTop: 150,
            backgroundColor: "#f3f3f3",
            paddingTop: 40,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            height: Dimensions.get("window").height - 150,
          }}>
          {/* <Button
          title='Enter VIN Number'
          onPress={() => {
            this.handleSwitch(true);
          }}></Button>
        <Button
          title='Enter Car Information'
          onPress={() => {
            this.handleSwitch(false);
          }}></Button>
        <Input
          type='text'
          placeholder="Car's Name"
          onChangeText={(carName) => {
            this.setState({ carName: carName });
          }}
        /> */}
          {this.state.enteringVin ? (
            <View>
              <Text>VIN Form</Text>
              <Input
                type='text'
                key='vin'
                placeholder='VIN Number'
                onChangeText={(vin) => {
                  this.setState({ vin: vin });
                }}
              />
              <Input
                type='text'
                key='milesVIN'
                placeholder='Miles'
                onChangeText={(miles) => {
                  this.setState({ miles: miles });
                }}
              />
            </View>
          ) : (
            <View>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 30,
                  textAlign: "center",
                  color: "#1f1f30",
                }}>
                Tell us about your car!
              </Text>
              <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                <Input
                  type='text'
                  key='year'
                  placeholder='Year'
                  onChangeText={(year) => {
                    this.setState({ year: year });
                  }}
                />
                <Input
                  type='text'
                  key='make'
                  placeholder='Make'
                  onChangeText={(make) => {
                    this.setState({ make: make });
                  }}
                />
                <Input
                  type='text'
                  key='model'
                  placeholder='Model'
                  onChangeText={(model) => {
                    this.setState({ model: model });
                  }}
                />
                {this.state.error !== "" && (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "red",
                      marginHorizontal: 10,
                    }}>
                    {this.state.error}
                  </Text>
                )}
              </View>
              {/* <TextInput
              type='text'
              key='color'
              placeholder='Color'
              onChangeText={(color) => {
                this.setState({ color: color });
              }}
            />
            <TextInput
              type='text'
              key='milesManual'
              placeholder='Miles'
              onChangeText={(miles) => {
                this.setState({ miles: miles });
              }}
            /> */}
            </View>
          )}

          <Button
            title=''
            icon={<Icon name='arrow-right' size={20} color='white' />}
            onPress={this.handleCreate}
            style={{
              paddingTop: 20,
              alignSelf: "flex-end",
              marginRight: 30,
              width: 100,
            }}></Button>
          {/* <Button title='Create Car' onPress={this.handleCreate}></Button> */}
        </View>
      </ImageBackground>
    );
  }
}
