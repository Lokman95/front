import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { Item, Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import FormContainer from "../../../components/form/FormContainer";
import Input from "../../../components/form/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";

const countries = require("../../../assets/countries.json");

const Checkout = (props) => {
  const [orderItem, setOrderItem] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setOrderItem(props.cartItems);

    return () => {
      setOrderItem();
    };
  }, []);

  const checkOut = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItem,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      zip,
    };
    props.navigation.navigate("Payment", { order: order });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Shipping Address"}>
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Shipping Address One"}
          name={"shippingAddress1"}
          value={address}
          //keyboardType={"numeric"}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"Shipping Address Tow"}
          name={"shippingAddress2"}
          value={address2}
          //keyboardType={"numeric"}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={"City"}
          name={"city"}
          value={city}
          //keyboardType={"numeric"}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={"Zip Code"}
          name={"zip"}
          value={zip}
          keyboardType={"numeric"}
          onChangeText={(text) => setZip(text)}
        />
        <Input
          placeholder={"Country"}
          name={"country"}
          value={country}
          //keyboardType={"numeric"}
          onChangeText={(text) => setCountry(text)}
        />
        <Item picker>
          <Picker
            mode="dropdown"
            style={{ with: undefined }}
            selectedValue={country}
            placeholder={"Your Country"}
            placeholderStyle={{ color: "green" }}
            placeholderIconColor="white"
            onValueChange={(e) => setCountry(e)}
          >
            {countries.map((c) => {
              return <Picker.Item key={c.code} label={c.name} value={c.name} />;
            })}
          </Picker>
        </Item>
        <View style={{ width: "60%", alignItems: "center" }}>
          <Button title="Confirm" onPress={() => checkOut()} />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(Checkout);
