// Register.js
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { registerUser } from "../redux/store"
import { View, Text, StyleSheet, Image, useWindowDimensions } from "react-native";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import Logo from "../../../assets/images/logo.jpg";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ dispatch }) => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const { control, handleSubmit, watch } = useForm();

  const pass = watch("password");

  useEffect(() => {
    // Dispatch registerUser only once when the component mounts
    // dispatch(registerUser(newUser));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onBackToLogin = () => {
    navigation.navigate("Login");
  };

  const onRegisterPressed = async (data) => {
    const { username, password, firstName, lastName, confirmPassword } = data;
    const newUser = { username, password, firstName, lastName };

    // try {
    //   // Save user to AsyncStorage before dispatching the action
    //   await AsyncStorage.setItem("registeredUsers", JSON.stringify([...registeredUsers, newUser]));
    //   console.log("User registered and saved to AsyncStorage:", newUser);
    // } catch (error) {
    //   console.error("Error saving registered user:", error);
    // }

    // Dispatch the registerUser action
    dispatch(registerUser(newUser))
      .then(() => {
        // If the registration is successful, navigate to the Login screen
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={[styles.logo, { height: height * 0.1 }]}
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
        name="userName"
        placeholder="Username"
        control={control}
        rules={{
          required: "The Username is required",
        }}
      />

      <Input
        name="password"
        placeholder="Password"
        control={control}
        rules={{
          required: "The Password is required",
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

export default connect((state) => ({ registeredUsers: state.registeredUsers }))(Register);