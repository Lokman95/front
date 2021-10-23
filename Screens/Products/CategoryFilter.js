import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ListItem, Badge, Text } from "native-base";

const CategoryFilter = (props) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: "gainsboro" }}
    >
      <ListItem style={{ margin: 0, padding: 0, borderRadius: 0 }}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.categoryFilter("All"), props.setActive(-1);
          }}
        >
          <Badge
            style={[
              styles.center,
              { margin: 5 },
              props.active == -1 ? styles.active : styles.inactive,
            ]}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                padding: 20,
                fontWeight: "bold",
              }}
            >
              All
            </Text>
          </Badge>
        </TouchableOpacity>
        {props.categories.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              props.categoryFilter(item._id),
                props.setActive(props.categories.indexOf(item));
            }}
          >
            <Badge
              style={[
                styles.center,
                { margin: 5 },
                props.active == props.categories.indexOf(item)
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  padding: 20,
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </Text>
            </Badge>
          </TouchableOpacity>
        ))}
      </ListItem>
    </ScrollView>
  );
};

export default CategoryFilter;

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    //padding: 20,
  },
  active: {
    backgroundColor: "green",
  },
  inactive: {
    backgroundColor: "blue",
  },
});
