import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import SignIn from "../screens/SignIn";

const { Navigator, Screen } = createStackNavigator();
export default function AuthRoutes() {
  return (
    <Navigator
      initialRouteName="SignIn"
      headerMode="none"
      screenOptions={{ cardStyle: { backgroundColor: "transparent" } }}
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}
