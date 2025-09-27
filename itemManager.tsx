import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveItem(newItem) {
  try {
    console.log(newItem);
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
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.log("データを取得できませんでした");
    return [];
  }
}

export async function removeItems(id) {
  try {
    const storedItems = await AsyncStorage.getItem("items");
    let items = storedItems ? JSON.parse(storedItems) : [];
    items = items.filter((item) => item.id.toString() !== id.toString());
    await AsyncStorage.setItem("items", JSON.stringify(items));

    console.log("が削除されました");
  } catch (error) {
    console.error("削除エラー:", error);
  }
}
