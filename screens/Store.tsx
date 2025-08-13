import React, { use, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
  TextInput,
} from "react-native";
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
  const addNumber = () => {
    setItemNumber(itemNumber + 1);
  };

  const renderIcon = ({ item }) => (
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
  return (
    <View style={[styles.container]}>
      <View>
        <Text>a</Text>
      </View>
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
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={[styles.modalHeaderText]}>戻る</Text>
            </TouchableOpacity>
            <Text style={[styles.modalTitle, styles.modalHeaderText]}>
              商品の追加
            </Text>
            <TouchableOpacity>
              <Text style={[styles.modalHeaderText]}>保存</Text>
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
            <View style={[styles.modalItem]}>
              <Text style={[styles.modalText]}>商品名</Text>
              <TextInput
                style={styles.input}
                value={itemName}
                onChangeText={setItemName}
                placeholder="商品名を入力"
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.modalItem}>
              <Text style={[styles.modalText]}>在庫</Text>
              <TouchableOpacity onPress={() => addNumber()}>+</TouchableOpacity>
              <TouchableOpacity onPress={() => subNimber()}>-</TouchableOpacity>
              <Text>{itemNumber}</Text>
            </View>
          </View>
          <View></View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingTop: 20,
  },
  icon: {
    height: 80,
    width: 80,
  },
  selectedIcon: {
    backgroundColor: "#1DA1F2",
  },
  iconList: {},
});

export default Store;
