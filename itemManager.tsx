import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
// const reset = () => {　storeだけで使うのでここに書かない
//   setModalVisible(false);
//   setSelectedIcon(null);
//   setItemName("");
//   setItemPlace("");
//   setItemNumber(0);
// };
export async function saveItem(newItem) {
  //   if (!itemName.trim()) { ここもstoreのみ
  //     Alert.alert("商品名は必須です", "商品名を入力してください", {k
  //       text: "OK",
  //       style: "cancel",
  //     });
  //     return;

  try {
    const storedItems = await AsyncStorage.getItem("items");
    const items = storedItems ? JSON.parse(storedItems) : [];

    items.push(newItem);

    await AsyncStorage.setItem("items", JSON.stringify(items));
    fetchItems();

    console.log("保存成功:", newItem);
  } catch (error) {
    console.error("保存エラー:", error);
  }
}

export async function fetchItems() {
  try {
    const storedItems = await AsyncStorage.getItem("items");
    const parsedItems = storedItems ? JSON.parse(storedItems) : [];
    // setItems(parsedItems);　別で書く
  } catch (error) {
    console.log("データを取得できませんでした");
    return [];
  }
}

export async function removeItems(id) {
  Alert.alert("アイテムの削除", "このアイテムを削除しますか？", [
    {
      text: "いいえ",
      style: "cancel",
    },
    {
      text: "はい",
      onPress: async () => {
        try {
          const storedItems = await AsyncStorage.getItem("items");
          let items = storedItems ? JSON.parse(storedItems) : [];
          items = items.filter((item) => item.id !== id);
          await AsyncStorage.setItem("items", JSON.stringify(items));
          fetchItems();
          console.log("{item.name} が削除されました");
        } catch (error) {
          console.error("削除エラー:", error);
        }
        fetchItems();
      },
    },
  ]);
}
