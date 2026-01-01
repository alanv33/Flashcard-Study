import * as Crypto from "expo-crypto";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Deck } from "../../models/StudyScreen";

type Props = {
    visible: boolean;
    onCancel: () => void;
    onConfirm: (deck: Deck) => void;
};

export default function AddCardPopup({ visible, onCancel, onConfirm }: Props) {
    const [deckName, setDeckName] = useState("");
    const [height, setHeight] = useState(0);

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />

                <View style={styles.popup}>
                    <Text style={styles.headerText}>Add New Flashcard Set</Text>
                    <Text style={styles.nameText}> Name: </Text>
                    <TextInput
                        value={deckName}
                        onChangeText={setDeckName}
                        placeholder="Name"
                        multiline
                        onContentSizeChange={(e) =>
                            setHeight(e.nativeEvent.contentSize.height)
                        }
                        maxLength={50}
                        style={[styles.inputTextBox, { height: height }]}
                    />

                    <Pressable style={styles.confirmButton}
                        onPress={() => {
                            const deck: Deck = {
                                id: Crypto.randomUUID(),
                                name : deckName,
                                cards: []
                            };
                            onConfirm(deck);
                        }}
                    >
                        <Text>Confirm</Text>
                    </Pressable>
                    <Pressable onPress={onCancel} style={styles.cancelButton}>
                        <Text>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </Modal >
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
        width: "90%",
        position: "relative",
        paddingBottom: 100,
    },

    headerText: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
        position: "absolute",
        top: 20,
        alignSelf: "center"
    },

    cancelButton: {
        position: "absolute",
        bottom: 8,
        left: 18,
        borderColor: "grey",
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 32,
        paddingVertical: 12
    },

    confirmButton: {
        position: "absolute",
        bottom: 8,
        right: 18,
        borderColor: "grey",
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 32,
        paddingVertical: 12
    },

    nameText: {
        marginTop: 40,
        textAlign: "left"
    },

    inputTextBox: {
        width: "100%",
        borderWidth: 2,
        borderRadius: 4,
        padding: 12,
        minHeight: 60,
        textAlignVertical: "top",
        marginTop: 5,
    },
});
