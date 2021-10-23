export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/connection/url";

export const login = (email, password, type) => {
  return async (dispatch, getState) => {
    const token = getState().token;
    const userId = getState().userId;
    console.log(token);
    const response = await fetch(`${baseURL}users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
        type: type,
        method_type: "email",
      }),
    });
    if (!response.ok) {
      console.log("Wrong email or password");
    }

    const resData = await response.json();
    const userToken = resData.access_token;
    console.log(userToken);
    await AsyncStorage.setItem("userToken", userToken);

    dispatch({
      type: LOGIN,
      token: resData.access_token,
      userId: resData.user.id,
    });
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userToken");
  return { type: LOGOUT };
};
