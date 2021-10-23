import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import HomeNavigators from "./HomeNavigators";
import CartNavigator from "./CartNavigator";
import CartIcon from "../components/CartIcon";
import UserNavigator from "./UserNavigator";
//import AuthGlobal from "../Context/store/AuthGlobal";

const Tab = createBottomTabNavigator();

const Main = () => {
  //importconst context = useContext(AuthGlobal);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarShowLabel="false"
      screenOptions={{
        KeyboardHidesTabBar: true,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeNavigators}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="home"
              style={{ position: "relative" }}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="shopping-cart" color={color} size={30} />
              <CartIcon />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Admin"
        component={HomeNavigators}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
