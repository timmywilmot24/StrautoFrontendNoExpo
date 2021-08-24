import React, { Component } from "react";
import Axios from "axios";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { Card, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { ShopsView } from "./shopsView";
import { CarForm } from "../components/forms/carForm";

//HomeView is the dashboard
export class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      cars: this.props.user.cars,
      carView: "",
      carLoaded: false,
      shopsView: false,
    };
  }

  //this method allow users to go to shopsView
  rendershopsView() {
    this.setState({ shopsView: true });
  }

  //this method will be used by shopsView so that the user can go back to HomeView
  goBackToHomeView = () => {
    this.setState({ shopsView: false });
  };

  updateAppUser = (user, car) => {
    // Updates Home View
    let cars = this.state.cars;
    cars.push(car._id);
    this.setState({
      user: user,
      cars: cars,
      carView: car,
    });
    // Updates App View
    this.props.updateUser(user);
  };

  //this method is called automatically after the everything is rendered first
  componentDidMount() {
    let url = "https://strautoserver.herokuapp.com";
    if (this.state.cars.length > 0) {
      Axios.get(`${url}/cars/${this.state.cars[0]}`)
        .then((response) => {
          this.setState({ carView: response.data, carLoaded: true });
        })
        .catch((error) => {
          console.log("Failed");
          // console.log(error);
        });
    } else {
      this.setState({ carLoaded: true });
    }
  }

  render() {
    return this.state.carLoaded ? (
      <View>
        {this.state.shopsView ? (
          <ShopsView goBack={this.goBackToHomeView} />
        ) : (
          <SafeAreaView>
            {/* If they have a car, render dashboard */}
            {this.state.cars.length > 0 ? (
              <View>
                <View>
                  {/*this is the nav button*/}
                  <Button
                    style={{
                      alignSelf: "flex-end",
                      marginRight: 10,
                      marginTop: 10,
                    }}
                    type='clear'
                    icon={<Icon name='bars' size={30} color='#1f1f30' />}
                    onPress={() => {
                      this.props.navigate();
                    }}
                  />

                  <View>
                    <Text
                      style={{
                        fontSize: 36,
                        marginLeft: 30,
                        marginTop: 10,
                        color: "#1f1f30",
                      }}>
                      Hi, {this.state.user.firstName}!
                    </Text>

                    <Image
                      style={{
                        width: 200,
                        height: 100,
                        alignSelf: "center",
                        marginTop: 20,
                      }}
                      source={require("../assets/carPNG.png")}
                    />
                    <Text
                      style={{
                        fontWeight: "500",
                        textAlign: "center",
                        fontSize: 30,
                        marginTop: 20,
                        color: "#1f1f30",
                      }}>
                      Your car is up to date!
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "white",
                      borderRadius: 10,
                      marginHorizontal: 55,
                      marginTop: 20,
                      shadowColor: "#1f1f30",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: "center",
                        padding: 10,
                        color: "#1f1f30",
                      }}>
                      Est. Miles Until Next Service
                    </Text>
                    <Text
                      style={{
                        fontSize: 50,
                        textAlign: "center",
                        paddingBottom: 10,
                        color: "#1f1f30",
                      }}>
                      {this.state.carView.tillNextService}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "white",
                      borderRadius: 10,
                      marginHorizontal: 55,
                      marginTop: 20,
                      shadowColor: "#1f1f30",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: "center",
                        padding: 10,
                        color: "#1f1f30",
                      }}>
                      Est. Miles
                    </Text>
                    <Text
                      style={{
                        fontSize: 50,
                        textAlign: "center",
                        paddingBottom: 10,
                        color: "#1f1f30",
                      }}>
                      {this.state.carView.miles}
                    </Text>
                  </View>
                  <View style={{ marginHorizontal: 55, marginTop: 30 }}>
                    {/* <Button
                      title='More'
                      onPress={() => {
                        console.log("TBD");
                      }}
                      type='outline'
                    /> */}
                    <Button
                      title='Schedule'
                      onPress={() => {
                        this.rendershopsView();
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : (
              // Otherwise, render add car form
              <CarForm
                user={this.state.user}
                updateAppUser={this.updateAppUser}></CarForm>
            )}
          </SafeAreaView>
        )}
      </View>
    ) : (
      <View>
        <Text>Car is being loaded</Text>
      </View>
    );
  }
}
