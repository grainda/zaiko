import Icon from "react-native-vector-icons/Feather";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import List from "./screens/List";
import Store from "./screens/Store";

const Tab = createMaterialTopTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: "#fff" },
          tabBarActiveTintColor: "#1DA1F2", // Xのブランドカラー
          tabBarIndicatorStyle: { backgroundColor: "#1DA1F2" },
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
          tabBarShowLabel: false, // ラベル非表示でアイコンのみ
        })}
      >
        <Tab.Screen name="List" component={List} />
        <Tab.Screen name="Store" component={Store} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
