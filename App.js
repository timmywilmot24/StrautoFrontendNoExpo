import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import { LoginView } from "./views/loginView";
import { RegisterView } from "./views/registerView";
import { Navigator } from "./components/navigation";

import { HomeView } from "./views/homeView";
import { ScheduleView } from "./views/scheduleView";
import { AccountView } from "./views/accountView";

//the very first screen the user interacts with is the LoginView
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //if you add a state to the constructor; edit the logOut method also
      logined: false,
      registering: false,
      navigate: false,
      user: "",
      view: "home",
      previousView: "home",
    };
  }

  //this method will be used by the Navigator so that the user can log out
  logOut = () => {
    //reset all state to normal
    this.setState({
      logined: false,
      registering: false,
      navigate: false,
      user: "",
      view: "home",
      previousView: "home",
    });
  };

  //this method will use by RegisterView; so that user is able to go back to LoginView
  backToLoginView = () => {
    this.setState({ registering: false });
  };

  //this method will be used by LoginView so that user can login to their information
  logined = (user) => {
    this.setState({ logined: true, registering: false, user: user });
  };

  //this method will be used by LoginView so that user can register => RegisterView
  registering = () => {
    this.setState({ registering: true });
  };

  //this method will be used by every view that have the navigation button
  //tells App class to render the navigator
  navigate = () => {
    this.setState({ navigate: true });
  };

  //this method will be used by the Navigator so that user can closed the Navigotor
  //the navigotor is only accessible by a few views; not all
  unrenderNavigator = () => {
    this.setState({ navigate: false });
  };

  //this method will be used by AccountView so that user can update their info
  updateUser = (user) => {
    this.setState({ user: user });
  };

  //this method will be used by the Navigator so that the user can navigate to different views
  changeToView = (whichView) => {
    let previousView = this.state.view;
    this.setState({
      previousView: previousView,
      view: whichView,
      navigate: false,
    });
  };

  //this method will be used by this App component so that it can render the correct navigating view
  renderDifferentView(view) {
    if (view === "home") {
      return (
        <HomeView
          user={this.state.user}
          navigate={this.navigate}
          updateUser={this.updateUser}
        />
      );
    } else if (view === "schedule") {
      return (
        <ScheduleView
          user={this.state.user}
          //use to go back to the correct view
          previousView={this.state.previousView}
          navigate={this.navigate}
          changeToView={this.changeToView}
        />
      );
    } else if (view === "account") {
      return (
        <AccountView
          user={this.state.user}
          //use to go back to the correct view
          previousView={this.state.previousView}
          navigate={this.navigate}
          updateUser={this.updateUser}
          changeToView={this.changeToView}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.logined ? ( //user is either logined or not
          <View>
            {this.state.navigate ? ( //user is either navigating or viewing a view
              <Navigator
                unrender={this.unrenderNavigator}
                changeTo={this.changeToView}
                logout={this.logOut}
              />
            ) : (
              <View>{this.renderDifferentView(this.state.view)}</View>
            )}
          </View>
        ) : (
          // user is registering or logging in
          <View>
            {this.state.registering ? (
              //user is registering
              <RegisterView
                back={this.backToLoginView}
                logined={this.logined}
              />
            ) : (
              //user is loggin in
              <LoginView
                registering={this.registering}
                logined={this.logined}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}

//this style sheet will be to used to set the app background
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9FB",
  },
});
