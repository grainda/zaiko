import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Store: React.FC = () => {
  return (
    <View style={[styles.container]}>
      <View>
        <Text>a</Text>
      </View>
      <View style={[styles.addButtonPlace]}>
        <TouchableOpacity style={[styles.addButton]}>
          <Text style={[styles.addButtonText]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "red",
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonPlace: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
    padding: 40,
  },
  addButton: {
    backgroundColor: "#1DA1F2",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
    alignItems: "center",
  },
});

export default Store;
