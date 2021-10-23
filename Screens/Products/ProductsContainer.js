import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Header, Icon, Item, Input, Text, Container } from "native-base";

import baseURL from "../../assets/connection/url";
import axios from "axios";

import ProductList from "./ProductList";
import SearchProduct from "./SearchProduct";
import CategoryFilter from "./CategoryFilter";

//const data = require("../../assets/products.json");
//const categoryData = require("../../assets/categories.json");

var { height } = Dimensions.get("window");

const ProductsContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCategory, setProductsCategory] = useState([]);
  const [active, setActive] = useState();
  const [initialSate, setInitialSate] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      //Products
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProducts(res.data);
          setProductsFiltered(res.data);
          setProductsCategory(res.data);
          setInitialSate(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(" Product Api not found");
        });

      //Category

      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log("Category Api not found");
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialSate();
      };
    }, [])
  );

  //Methods
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };
  const openList = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  //CategoryFilter
  const changeCategories = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCategory(initialSate), setActive(true)]
        : [
            setProductsCategory(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <>
      {loading == false ? (
        <Container>
          <Header searchBar rounded style={{ backgroundColor: "green" }}>
            <Item>
              <Icon name="ios-search" />
              <Input
                placeholder="Search Here"
                onFocus={openList}
                onChangeText={(text) => searchProduct(text)}
              />
              {focus == true ? (
                <Icon onPress={onBlur} name="ios-close" />
              ) : null}
            </Item>
          </Header>
          {focus == true ? (
            <SearchProduct
              navigation={props.navigation}
              productsFiltered={productsFiltered}
            />
          ) : (
            <ScrollView>
              <View>
                <View>
                  <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCategories}
                    productsCategory={productsCategory}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {productsCategory.length > 0 ? (
                  <View style={styles.listContainer}>
                    {productsCategory.map((item) => {
                      return (
                        <ProductList
                          key={item.name} //name can be remove by _id
                          item={item}
                          navigation={props.navigation}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <View style={[styles.center, { height: height / 2 }]}>
                    <Text>No Products</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </Container>
      ) : (
        //loading
        <Container stylse={[styles.center, { backgroundColor: "gainsboro" }]}>
          <ActivityIndicator size="large" color="green" />
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    //padding: 20,
  },
});

export default ProductsContainer;
