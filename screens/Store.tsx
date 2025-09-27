import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
  TextInput,
  Alert,
  ListRenderItemInfo,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveItem, fetchItems, removeItems } from "../itemManager";
const icons = [
  { id: "1", source: require("../assets/png/001-soap.png") },
  { id: "2", source: require("../assets/png/002-vegetables.png") },
  { id: "3", source: require("../assets/png/003-meat.png") },
  { id: "4", source: require("../assets/png/004-pet.png") },
  { id: "5", source: require("../assets/png/005-paper.png") },
  { id: "6", source: require("../assets/png/006-toothpaste.png") },
  { id: "7", source: require("../assets/png/007-cosmetics.png") },
  { id: "8", source: require("../assets/png/008-cleaner.png") },
  { id: "9", source: require("../assets/png/009-snacks.png") },
];

const Store: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemPlace, setItemPlace] = useState("");
  const [itemNumber, setItemNumber] = useState(0);
  const [items, setItems] = useState<Item[]>([]);
  const addNumber = () => {
    setItemNumber(itemNumber + 1);
    return itemNumber;
  };
  const subNumber = () => {
    if (itemNumber == 0) {
      return;
    } else {
      setItemNumber(itemNumber - 1);
    }
    return itemNumber;
  };

  interface Icon {
    id: string;
    source: any;
  }
  interface Item {
    id: string;
    icon: any;
    name: string;
    place: string;
    number: number;
  }

  const renderIcon = ({ item }: ListRenderItemInfo<Icon>) => (
    <TouchableOpacity onPress={() => setSelectedIcon(item.source)}>
      <Image
        source={item.source}
        style={[
          styles.icon,
          selectedIcon === item.source && styles.selectedIcon,
        ]}
      />
    </TouchableOpacity>
  );
  const renderItem = ({ item }: ListRenderItemInfo<Item>) => {
    return (
      <View style={styles.storeContainer}>
        <TouchableOpacity
          onPress={() => handleRemoveItems(item.id)}
          style={styles.storeRemoveButton}
        >
          <Text style={styles.storeButtonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateItemNumber(item.id, "sub")}
          style={styles.storeSButton}
        >
          <Text style={styles.storeButtonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateItemNumber(item.id, "add")}
          style={styles.storePButton}
        >
          <Text style={styles.storeButtonText}>+</Text>
        </TouchableOpacity>

        <View style={styles.flexdirection}>
          <Text style={[styles.storeText]}>・{item.name}</Text>
        </View>
        <Image source={item.icon} style={styles.storeImage} />
        <Text style={styles.storeText}>場所：{item.place}</Text>
        <View style={styles.flexdirection}>
          <Text style={styles.storeText}>在庫：{item.number}</Text>
        </View>
      </View>
    );
  };
  const reset = () => {
    setModalVisible(false);
    setSelectedIcon(null);
    setItemName("");
    setItemPlace("");
    setItemNumber(0);
  };
  const handleSaveItem = async () => {
    const newItem = {
      id: Date.now().toString(),
      icon: selectedIcon,
      name: itemName,
      place: itemPlace,
      number: itemNumber,
    };
    await saveItem(newItem);
    await loadItems();
    reset();
  };

  const loadItems = async () => {
    const loadedItems = await fetchItems();
    setItems(loadedItems);
  };

  const handleRemoveItems = async (id: string) => {
    Alert.alert("アイテムの削除", "このアイテムを削除しますか？", [
      {
        text: "いいえ",
        style: "cancel",
      },
      {
        text: "はい",
        onPress: async () => {
          await removeItems(id);
          await loadItems();
        },
      },
    ]);
  };

  const updateItemNumber = async (id: string, operation: string) => {
    try {
      const storedItems = await AsyncStorage.getItem("items");
      let items: Item[] = storedItems ? JSON.parse(storedItems) : [];
      const targetItem = items.findIndex((item) => item.id === id);
      if (targetItem === -1) {
        Alert.alert(
          "アイテムが存在しません",
          "指定されたアイテムを見つけられませんでした",
          { text: "OK", style: "cancel" }
        );
        return;
      }
      if (operation === "sub" && items[targetItem].number === 0) {
        return;
      }
      items[targetItem].number =
        (items[targetItem].number || 0) + (operation === "add" ? 1 : -1);
      await AsyncStorage.setItem("items", JSON.stringify(items));
      console.log("在庫を更新");
      loadItems();
    } catch (error) {
      console.error("在庫数を更新できませんでした");
    }
  };

  useEffect(() => {
    console.log(items);
    loadItems();
  }, []);

  return (
    <View style={[styles.container]}>
      <FlatList<Item>
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      <View style={[styles.addButtonPlace]}>
        <TouchableOpacity
          style={[styles.addButton]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[styles.addButtonText]}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalOverlay]}>
          <View style={[styles.modalHeader]}>
            <TouchableOpacity onPress={() => reset()}>
              <Text style={[styles.modalHeaderText]}>戻る</Text>
            </TouchableOpacity>
            <Text style={[styles.modalTitle, styles.modalHeaderText]}>
              商品の追加
            </Text>
            <TouchableOpacity>
              <Text
                style={[styles.modalHeaderText]}
                onPress={() => handleSaveItem()}
              >
                保存
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.modalContainer]}>
            <Text style={[styles.modalText]}>アイコンを選択</Text>

            <FlatList
              data={icons}
              renderItem={renderIcon}
              keyExtractor={(item) => item.id}
              numColumns={3}
              contentContainerStyle={[styles.iconList]}
            />
            <View style={[styles.modalItem]}>
              <Text style={[styles.modalText]}>置き場所</Text>
              <TextInput
                style={styles.input}
                value={itemPlace}
                onChangeText={setItemPlace}
                placeholder="必要な場合は置き場所を入力"
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.modalItem}>
              <Text style={styles.modalText}>商品名</Text>
              <TextInput
                style={styles.input}
                value={itemName}
                onChangeText={setItemName}
                placeholder="商品名を入力"
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.modalItem}>
              <Text style={styles.modalText}>在庫</Text>
              <View style={styles.ItemNumBox}>
                <TouchableOpacity
                  onPress={() => addNumber()}
                  style={styles.addSubButton}
                >
                  <Text style={styles.addSubButtonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => subNumber()}
                  style={styles.addSubButton}
                >
                  <Text style={styles.addSubButtonText}>-</Text>
                </TouchableOpacity>
                {itemNumber != 0 ? (
                  <Text style={styles.modalText}>{itemNumber}</Text>
                ) : (
                  <Text style={styles.modalText}>なし</Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  flexdirection: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
  },
  storeImage: {
    width: 150,
    height: 150,
    shadowColor: "#000",
  },
  storeContainer: {
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#1da1f2",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  storeText: {
    color: "#1DA1F2",
  },
  storePButton: {
    width: 18,
    height: 18,
    backgroundColor: "#1DA1F2",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    position: "absolute",
    bottom: 10,
    right: 60,
  },
  storeSButton: {
    width: 18,
    height: 18,
    backgroundColor: "#1DA1F2",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    position: "absolute",
    bottom: 10,
    right: 20,
  },
  storeRemoveButton: {
    width: 18,
    height: 18,
    backgroundColor: "#cb0b35ff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 70,
    position: "absolute",
    top: 7,
    right: 7,
  },
  storeButtonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    lineHeight: 20,
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
    paddingBottom: 3,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 30,
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "white",
  },
  modalHeader: {
    height: 85,
    backgroundColor: "#1DA1F2",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  modalHeaderText: {
    paddingTop: 35,
    color: "white",
  },
  ItemNumBox: {
    paddingTop: 20,
    flexDirection: "row",
  },
  addSubButton: {
    width: 25,
    height: 25,
    backgroundColor: "#1DA1F2",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 5,
  },
  addSubButtonText: {
    color: "white",
  },
  modalTitle: {
    fontSize: 25,
  },
  modalText: {
    color: "#1DA1F2",
    fontSize: 20,
  },
  modalContainer: {
    padding: 20,
  },
  modalItem: {
    paddingTop: 40,
  },
  input: {
    width: 200,
    height: 30,
    paddingTop: 30,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    borderRadius: 1,
    paddingBottom: 15,
  },
  icon: {
    height: 80,
    width: 80,
  },
  selectedIcon: {
    borderWidth: 2,
    borderRadius: 10,
  },
  iconList: {
    paddingTop: 30,
  },
});

export default Store;
