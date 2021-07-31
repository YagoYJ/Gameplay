import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import AppRoutes from "./app.routes";

import SignIn from "../screens/SignIn";

import { useAuth } from "../hooks/auth";

export default function Routes() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user.id ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
