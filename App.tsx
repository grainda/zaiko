import Icon from "react-native-vector-icons/Feather";
import { StyleSheet } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import List from "./screens/List";
import Store from "./screens/Store";
import { TabBarIndicator } from "react-native-tab-view";

const Tab = createMaterialTopTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: [styles.tabBar],
          tabBarActiveTintColor: "#1DA1F2",
          tabBarIndicatorStyle: [styles.TabBarIndicator],
          swipeEnabled: true,
          tabBarIcon: ({ color }: { color: string }) => {
            let iconName: string;
            if (route.name === "Home") {
              iconName = "home";
            } else {
              iconName = "user";
            }
            return <Icon name={iconName} size={24} color={color} />;
          },
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="List" component={List} />
        <Tab.Screen name="Store" component={Store} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    height: 85,
    justifyContent: "center",
    paddingTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  TabBarIndicator: {
    backgroundColor: "#1DA1F2",
    height: 5,
    borderRadius: 10,
  },
});
export default App;
