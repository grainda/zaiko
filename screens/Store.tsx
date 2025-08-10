import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";

const Store: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
              <Text style={[styles.modalHeaderText]}>キャンセル</Text>
            </TouchableOpacity>
            <Text style={[styles.modalTitle, styles.modalHeaderText]}>
              商品の追加
            </Text>
            <TouchableOpacity>
              <Text style={[styles.modalHeaderText]}>保存</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={[styles.modalText]}>アイコンを選択</Text>
            <Image
              source={require("../assets/png/001-soap.png")}
              style={[styles.icon]}
            ></Image>
          </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeaderText: {
    paddingTop: 20,
    color: "white",
  },
  modalTitle: {
    fontSize: 25,
  },
  modalText: {
    color: "#1DA1F2",
  },
  icon: {
    height: 80,
    width: 80,
  },
});

export default Store;
