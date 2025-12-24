import { View, Pressable, StyleSheet, Modal, Text, TextInput } from "react-native";
import { useState } from "react";
import * as Crypto from "expo-crypto";
import { Flashcard } from "../models";

type Props = {
    visible: boolean;
    onCancel: () => void;
    onConfirm: (card: Flashcard) => void;
};

export default function AddPopup({ visible, onCancel, onConfirm }: Props) {
    const [frontText, setFrontText] = useState("");
    const [backText, setBackText] = useState("");
    const [frontHeight, setFrontHeight] = useState(60);
    const [backHeight, setBackHeight] = useState(80);

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />

                <View style={styles.popup}>
                    <Text style={styles.popupText}>Add Card</Text>

                    <TextInput
                        value={frontText}
                        onChangeText={setFrontText}
                        placeholder="Question"
                        multiline
                        onContentSizeChange={(e) =>
                            setFrontHeight(e.nativeEvent.contentSize.height)
                        }
                        maxLength={250}
                        style={[styles.questionTextInput, { height: frontHeight }]}
                    />

                    <TextInput
                        value={backText}
                        onChangeText={setBackText}
                        placeholder="Answer"
                        multiline
                        onContentSizeChange={(e) =>
                            setBackHeight(e.nativeEvent.contentSize.height)
                        }
                        maxLength={350}
                        style={[styles.answerTextInput, { height: backHeight }]}
                    />

                    <Pressable style={styles.confirmButton}
                        onPress={() => {
                            const card: Flashcard = {
                                id: Crypto.randomUUID(),
                                front: frontText,
                                back: backText,
                            };
                            onConfirm(card);
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
        alignItems: "center",
        paddingBottom: 120,
    },

    popupText: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
        position: "absolute",
        top: 20
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

    questionTextInput: {
        width: "100%",
        borderWidth: 2,
        borderRadius: 4,
        marginTop: 40,
        padding: 12,
        minHeight: 60,
        textAlignVertical: "top",
    },

    answerTextInput: {
        width: "100%",
        borderWidth: 2,
        borderRadius: 4,
        padding: 12,
        minHeight: 80,
        marginTop: 12,
        textAlignVertical: "top",
    },
});
