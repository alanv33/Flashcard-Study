import { View, Pressable, StyleSheet, Modal, Text } from "react-native";

type Props = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void; 
};

export default function DeletePopup({ visible, onCancel, onConfirm }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />

        <View style={styles.popup}>
          <Text style={styles.popupText}>Delete this card?</Text>

          <Pressable onPress={onConfirm} style={styles.confirmButton}>
            <Text>Confirm</Text>
          </Pressable>

          <Pressable onPress={onCancel} style={styles.cancelButton}>
            <Text>Cancel</Text>
          </Pressable>
          
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    height: "20%",
    width: "70%",
    position: "relative",
    alignItems: "center",
  },

  popupText:{
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    position: "absolute",
    top: 45
  },

  cancelButton: {
    position: "absolute",
    bottom: 8,
    left: 8,
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 8
  },

  confirmButton: {
    position: "absolute",
    bottom: 8,
    right: 8,
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 8
  }
});
