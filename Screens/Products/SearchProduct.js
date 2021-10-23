import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Content, Left, Body, ListItem, Thumbnail, Text } from "native-base";

var { width } = Dimensions.get("window");

const SearchProduct = (props) => {
  const { productsFiltered } = props;

  return (
    <Content style={{ width: width }}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <ListItem
            onPress={() => {
              props.navigation.navigate("SingleProduct", { item: item });
            }}
            key={item._id.$oid}
            avatar
          >
            <Left>
              <Thumbnail
                source={{
                  uri: item.image
                    ? item.image
                    : "https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg",
                }}
              />
            </Left>
            <Body>
              <Text>{item.name}</Text>
              <Text note>{item.description}</Text>
            </Body>
          </ListItem>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>Not available</Text>
        </View>
      )}
    </Content>
  );
};

export default SearchProduct;

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
