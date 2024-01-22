// Register.js

import React from "react";
import { View, Text, StyleSheet, Image, useWindowDimensions } from "react-native";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import Logo from "../../../assets/images/logo.jpg";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ registeredUsers, setRegisteredUsers }) => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const { control, handleSubmit, watch } = useForm();

  const pass = watch("password");

  const onBackToLogin = () => {
    navigation.navigate("Login");
  };

  const onRegisterPressed = async (data) => {
    console.log("Register form data:", data);

    const { username, password, firstName, lastName } = data;

    const newUser = { username, password, firstName, lastName };
    setRegisteredUsers([...registeredUsers, newUser]);

    try {
      await AsyncStorage.setItem("registeredUsers", JSON.stringify([...registeredUsers, newUser]));
      console.log("User registered and saved to AsyncStorage:", newUser);
    } catch (error) {
      console.error("Error saving registered user:", error);
    }

    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image
        style={[styles.logo, { height: height * 0.1}]}
        source={Logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Sign Up</Text>

      <Input
        name="firstName"
        placeholder="First Name"
        control={control}
        rules={{
          required: "The First Name is required",
        }}
      />

      <Input
        name="lastName"
        placeholder="Last Name"
        control={control}
        rules={{
          required: "The Last Name is required",
        }}
      />

      <Input
        name="username"
        placeholder="Email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email you enter is invalid" },
        }}
      />
      <Input
        name="password"
        placeholder="Password"
        control={control}
        secureTextEntry
        rules={{
          required: "Password is required",
          minLength: {
            value: 10,
            message: "Password should be at least 10 characters long",
          },
        }}
      />
      <Input
        name="confirmPassword"
        placeholder="Confirm Password"
        control={control}
        secureTextEntry
        rules={{
          validate: (value) => value === pass || "Password didn't match",
        }}
      />

      <Button
        text="Register"
        type="PRIMARY"
        onPress={handleSubmit(onRegisterPressed)}
      />
       <Text>
      <Text style={styles.word}>Already have an account?{" "}</Text>
      <Text style={styles.underlineText} onPress={onBackToLogin}>
        Log in here.
      </Text>
    </Text>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#000000",
    borderRadius: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },

  logo: {
    width: "70%",
    maxWidth: 300,
    height: 100,
  },
  input: {
    width: "100%", 
    marginTop: 900, 
  },
  button: {
    marginTop: 90, 
  },
  underlineText: {
    textDecorationLine: "underline",
    color: "white",
  },
  word: {
    color: "white"
  }
})

export default Register;
