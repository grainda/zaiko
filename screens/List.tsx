import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function List() {
  return (
    <View>
      <View style={[styles.header]}>
        <Text>a</Text>
      </View>
      <View></View>
    </View>
  );
}

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
