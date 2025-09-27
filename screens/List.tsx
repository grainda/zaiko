import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { fetchItems } from "../itemManager";
const List: React.FC = () => {
  const [listItem, setListItem] = useState<Item[]>([]);
  interface Item {
    id: string;
    icon: any;
    name: string;
    place: string;
    number: number;
  }
  const filterItems = async () => {
    const allItems = await fetchItems();
    const filtered = allItems.filter((item) => item.number == 0);
    setListItem(filtered);
  };
  useFocusEffect(
    React.useCallback(() => {
      filterItems();
    }, [])
  );
  const renderList = ({ item }: ListRenderItemInfo<Item>) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={listItem}
        renderItem={renderList}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
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
