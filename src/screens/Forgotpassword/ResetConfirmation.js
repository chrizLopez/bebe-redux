import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller} from "react-hook-form";


const ResetConfirmation = () => {
  const { control, handleSubmit, watch } = useForm();

  const EMAIL_REGEX = /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/;

  const navigation = useNavigation();

  const pass = watch("new-pass");

  const code = 1234567890;

  const onResetPass = () => {
    navigation.navigate("Confirmation");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Account Password</Text>
      <Text style={styles.text}>
        Check email for reset link.
      </Text>
      <Input
        name="Email"
        placeholder="Email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
        }}
      />
      <Input
        name="new-pass"
        placeholder="New password"
        control={control}
        secureTextEntry
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password should be at least 8 characters long",
          },
        }}
      />
      <Input
        name="Confirm password"
        placeholder="Confirm password"
        control={control}
        secureTextEntry
        rules={{
          validate: (value) => value === pass || "Password didn't match",
        }}
      />
      <Button
        text="Reset Password"
        type="PRIMARY"
        onPress={handleSubmit(onResetPass)}
      />
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
  text: {
    marginVertical: 10,
    color: "white",
    fontSize: 15,
  },
});

export default ResetConfirmation;