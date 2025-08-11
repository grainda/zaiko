import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
} from "react-native";
const icons = [
  { id: "1", source: require("../assets/png/001-soap.png") },
  { id: "2", source: require("../assets/png/002-vegetables.png") },
  { id: "3", source: require("../assets/png/003-meat.png") },
  { id: "4", source: require("../assets/png/004-cosmetics.png") },
  { id: "5", source: require("../assets/png/005-pet.png") },
  { id: "6", source: require("../assets/png/006-sauces.png") },
  { id: "7", source: require("../assets/png/007-paper.png") },
  { id: "8", source: require("../assets/png/008-toothpaste.png") },
];

const Store: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const renderIcon = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedIcon(item.source)}>
      <Image
        source={item.source}
        // style={[
        //   styles.icon,
        //   selectedIcon === item.source && styles.selectedIcon, // 選択時に枠線を追加
        // ]}
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
            {selectedIcon && (
              <View>
                <Text style={styles.modalText}>選択されたアイコン:</Text>
                <Image source={selectedIcon} style={styles.icon} />
              </View>
            )}
            <FlatList
              data={icons}
              renderItem={renderIcon}
              keyExtractor={(item) => item.id}
              numColumns={3}
              // contentContainerStyle={styles.iconList}
            />
            <Image
              source={require("../assets/png/001-soap.png")}
              style={[styles.icon]}
            ></Image>
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
  },
  modalContainer: {
    padding: 20,
  },
  icon: {
    height: 80,
    width: 80,
  },
});

export default Store;
