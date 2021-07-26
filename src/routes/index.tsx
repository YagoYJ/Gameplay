import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import AuthRoutes from "./auth.routes";

import SignIn from "../screens/SignIn";

import { useAuth } from "../hooks/auth";

export default function Routes() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user.token ? <AuthRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
