import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

const Button = ({ type, onPress, text }) => {
  return (
    <Pressable
      style={[styles.container, styles[`container_${type}`]]}
      onPress={onPress}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginVertical: 5
  },

  container_PRIMARY: {
    backgroundColor: "#C69749",
    marginVertical: 10,
    padding: 10,
  },

  container_TERTIARY: {
    marginVertical: 5,
  },

  text_PRIMARY: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20
  },

  text_TERTIARY: {
    color: "white",
    fontSize: 17
  },
});

export default Button;