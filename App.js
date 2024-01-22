// App.js

import React, { useState, useEffect } from "react";
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{ title: "Log In" }}
        >
          {(props) => (
            <LogIn
              {...props}
              registeredUsers={registeredUsers}
              setRegisteredUsers={setRegisteredUsers}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Register"
          options={{ title: "Register" }}
        >
          {(props) => (
            <Register
              {...props}
              registeredUsers={registeredUsers}
              setRegisteredUsers={setRegisteredUsers}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
