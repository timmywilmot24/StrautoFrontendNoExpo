import React, { Component } from "react";
import Axios from "axios";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export class ScheduleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: "",
      user: this.props.user,
    };
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
        <Text>Your Appointments</Text>
      </SafeAreaView>
    );
  }
}
