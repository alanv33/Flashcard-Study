import { Pressable, StyleSheet, useWindowDimensions, View, Modal, Text } from "react-native";
import { useState } from "react";
import EvilIcons from '@expo/vector-icons/EvilIcons';

type Props = {
    onConfirm: () => void;
    iconSize: number
};

export default function DeleteButton({ onConfirm, iconSize }: Props) {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            {/* Delete (trashcan) button*/}
            <Pressable onPress={() => setVisible(true)} style={styles.deleteButton}>
                <EvilIcons name="trash" size={Math.min(50, iconSize)} color="black" />
            </Pressable>

            {/* Delete card popup*/}
            <Modal transparent visible={visible} animationType="fade">
                <View style={styles.overlay}>
                    <Pressable style={StyleSheet.absoluteFill} onPress={() => setVisible(false)} />

                    <View style={styles.popup}>
                        <Text style={styles.popupText}>Delete this card?</Text>

                        <Pressable onPress={() => {onConfirm(); setVisible(false)}} style={styles.confirmButton}>
                            <Text>Confirm</Text>
                        </Pressable>

                        <Pressable onPress={() => setVisible(false)} style={styles.cancelButton}>
                            <Text>Cancel</Text>
                        </Pressable>

                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    //Container style
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
    },

    //Delete button style
    deleteButton: {
        position: "absolute",
        bottom: 10,
        left: 5,
    },

    //Overlay Style
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    //Popup styles
    popup: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 8,
        height: "20%",
        width: "70%",
        maxWidth: 400,
        position: "relative",
        alignItems: "center",
    },

    popupText: {
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
})
