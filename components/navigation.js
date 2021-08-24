import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

//the navigotor is only used in
//HomeView
//ScheduleView
//AccountView

export class Navigator extends Component {
  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "#f9f9fb",
          height: Dimensions.get("window").height,
          alignItems: "flex-end",
        }}>
        <Button
          style={{ marginRight: 20, marginTop: 10 }}
          type='clear'
          icon={<Icon name='close' size={18} color='black' />}
          onPress={() => {
            //unrender navigator
            this.props.unrender();
          }}
        />
        <View
          style={{ alignItems: "flex-end", marginRight: 30, marginTop: 30 }}>
          <TouchableOpacity
            style={{ paddingVertical: 20 }}
            onPress={() => {
              this.props.changeTo("home");
            }}>
            <Text style={{ fontSize: 20 }}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingVertical: 20 }}
            onPress={() => {
              this.props.changeTo("schedule");
            }}>
            <Text style={{ fontSize: 20 }}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingVertical: 20 }}
            onPress={() => {
              this.props.changeTo("account");
            }}>
            <Text style={{ fontSize: 20 }}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingVertical: 20 }}
            onPress={() => {
              this.props.logout();
            }}>
            <Text style={{ fontSize: 20 }}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
