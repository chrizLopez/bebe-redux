// Register.js
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, Image, useWindowDimensions } from "react-native";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import Logo from "../../../assets/images/logo.jpg";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerUser } from "../redux/actions";
import store from "../redux/store";

const Register = ({registeredUsers }) => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const { control, handleSubmit, watch } = useForm();

  useEffect(() => {
    console.log("registeredUsersregisteredUsers", registeredUsers)
  }, [registeredUsers]);

  const gotoRegister = () => {
    navigation.navigate("Register");
  };

  const onLoginPressed = async (data) => {
   store.dispatch(registerUser({data}))
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
        name="userName"
        placeholder="Username"
        control={control}
        rules={{
          required: "The Username is required",
        }}
      />

      <Input
        name="password"
        secureTextEntry
        placeholder="Password"
        control={control}
        rules={{
          required: "The Password is required",
        }}
      />

      <Button
        text="Login"
        type="PRIMARY"
        onPress={handleSubmit(onLoginPressed)}
      />

      <Text>
        <Text style={styles.word}>Don't have an account?{" "}</Text>
        <Text style={styles.underlineText} onPress={gotoRegister}>
          Register here.
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
    maxWidth: 900,
    height: 100,
    marginBottom: 50,
  },
  underlineText: {
    textDecorationLine: "underline",
    color: "white",
  },
  word: {
    color: "white",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  showPasswordIcon: {
    position: "absolute",
    top: 205, // Adjust the top position as needed
    right: 20,
  },
});

export default connect((state) => ({ registeredUsers: state.registeredUsers }))(Register);