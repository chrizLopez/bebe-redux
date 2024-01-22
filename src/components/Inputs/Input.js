// Input.js

import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";

const Input = ({ placeholder, rules = {}, control, name, secureTextEntry }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={styles.container}>
            <TextInput
              style={[
                styles.input,
                { borderColor: error ? "red" : "white" },
              ]}
              placeholder={placeholder}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              secureTextEntry={!showPassword && secureTextEntry}
              placeholderTextColor="white"
            />
            {secureTextEntry && (
              <TouchableOpacity
                style={styles.showPasswordIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            )}
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 5,
    position: "relative",
  },
  input: {
    width: "100%",
    backgroundColor: "gray",
    padding: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderColor: "white",
    fontSize: 20,
  },
  showPasswordIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    marginTop: 10,
  },
});

export default Input;
