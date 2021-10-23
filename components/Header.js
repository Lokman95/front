import React from "react";
import { View, Image, SafeAreaView, StyleSheet } from "react-native";

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        resizeMode="contain"
        style={{ height: 30 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    //marginTop: 80,
    backgroundColor: "white",
  },
});

export default Header;
