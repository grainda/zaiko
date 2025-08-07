import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Store: React.FC = () => {
  return (
    <View>
      <View style={[styles.header]}>
        <Text>a</Text>
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "red",
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Store;
