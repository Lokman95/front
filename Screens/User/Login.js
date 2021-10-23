import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View, Button } from "react-native";
import Error from "../../components/Error";
import FormContainer from "../../components/form/FormContainer";
import Input from "../../components/form/Input";
import { login } from "../../Redux/Actions/auth.N";

//Context

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // useEffect(() => {
  //   if (context.stateUser.isAuthenticated === true) {
  //     props.navigation.navigate("Profile");
  //   }
  // }, [context.stateUser.isAuthenticated]);

  const handleSubmit = async () => {
    try {
      await dispatch(login(email, password, 3));
      props.navigation.navigate("Profile");
    } catch (err) {
      console.log(err);
      //setError("Please fill in your credentials");
    }
  };

  return (
    <FormContainer title={"Login"}>
      <Input
        placeholder={"Enter Email"}
        nmae={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={"Enter Password"}
        nmae={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <Button title="Login" onPress={() => handleSubmit()} />
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an account ?</Text>
        <Button
          title="Register"
          onPress={() => props.navigation.navigate("Registration")}
        />
      </View>
    </FormContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
});
