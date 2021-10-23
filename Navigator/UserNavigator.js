import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../Screens/User/Login";
import Registration from "../Screens/User/Registration";
import UserProfile from "../Screens/User/UserProfile";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={UserProfile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function UserNavigator() {
  return <MyStack />;
}
