// LogIn.js

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import Logo from "../../../assets/images/logo.jpg";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const LogIn = ({ registeredUsers, setRegisteredUsers }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onLoginPress = async (data) => {
    console.log("Login form data:", data);

    const { username, password } = data;

    const user = registeredUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setError("");
      navigation.navigate("Home");
    } else {
      setError("Wrong email and password.");
    }
  };

  const onForgotPasswordPressed = () => {
    // Define the function logic here if needed
  };

  const onDontHaveAccountPressed = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Image
        style={[styles.logo, { height: height * 0.2 }]}
        source={Logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>ACCOUNT LOG IN</Text>

      <Input
        name="username"
        placeholder="Email"
        control={control}
        rules={{ required: "Username is required" }}
      />
      <Input
        name="password"
        placeholder="Password"
        control={control}
        secureTextEntry={!showPassword}
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password should be at least 8 characters long",
          },
        }}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Button text="Log In" type="PRIMARY" onPress={handleSubmit(onLoginPress)} />
      <Button
        text="Forgot Password?"
        type="TERTIARY"
        onPress={onForgotPasswordPressed}
      />
      <Text>
        <Text style={styles.word}>Don't have an account yet?{" "}</Text>
        <Text style={styles.underlineText} onPress={onDontHaveAccountPressed}>
          Create one.
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

export default LogIn;
