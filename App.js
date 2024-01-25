import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./src/screens/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogIn from "./src/screens/LogIn/LogIn";
import Register from "./src/screens/Register/Register";
import Home from "./src/screens/Homescreen/Home";

const Stack = createStackNavigator();

export default function App() {
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const loadRegisteredUsers = async () => {
      try {
        const usersJson = await AsyncStorage.getItem("registeredUsers");
        if (usersJson) {
          const users = JSON.parse(usersJson);
          setRegisteredUsers(users);
        }
      } catch (error) {
        console.error("Error loading registered users:", error);
      }
    };

    loadRegisteredUsers();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" options={{ title: "Log In" }} component={LogIn} />
          <Stack.Screen name="Register" options={{ title: "Register" }} component={Register} />
          <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}