// Register.js
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { registerUser } from "../redux/store";
import { View, Text, StyleSheet, Image, useWindowDimensions } from "react-native";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import Logo from "../../../assets/images/logo.jpg";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ dispatch, registeredUsers }) => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const { control, handleSubmit, watch } = useForm();

  const pass = watch("password");
  const [newUser, setNewUser] = useState(null);

  useEffect(() => {
    if (newUser) {
      dispatch(registerUser(newUser));
    }
  }, [dispatch, newUser]);

  const onBackToLogin = () => {
    navigation.navigate("Login");
  };

  const onRegisterPressed = async (data) => {
    const { username, password, firstName, lastName, confirmPassword } = data;
    const newUser = { username, password, firstName, lastName };
    setNewUser(newUser);

    try {
      await AsyncStorage.setItem("registeredUsers", JSON.stringify([...registeredUsers, newUser]));
      console.log("User registered and saved to AsyncStorage:", newUser);
    } catch (error) {
      console.error("Error saving registered user:", error);
    }
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

      {/* ... other input components ... */}

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