import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ProductContainer from "../Screens/Products/ProductsContainer";
import SingleProduct from "../Screens/Products/SingleProduct";
import Cart from "../Screens/Cart/Cart";

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductContainer"
        component={ProductContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SingleProduct"
        component={SingleProduct}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function HomeNavigators() {
  return <MyStack />;
}
