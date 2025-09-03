import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, Text, View, FlatList  } from "react-native";

const List: React.FC = () => {
  // const listItems =async () => {
  //   const storedItems = await AsyncStorage.getItem("items");
  //   const parsedItems = storedItems ? JSON.parse(storedItems) : [];
  //   const listItem = parsedItems.filter(listIn => itemNumber =< 1)
  // };
  const renderList
  return (
    <View>
         <FlatList
              data={items}
              renderItem={renderList}
              keyExtractor={(item) => item.id}
              numColumns={2}
            />
      <View>
      <Text>・買い物リスト</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default List;
