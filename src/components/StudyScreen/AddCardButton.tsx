import { StyleSheet, Pressable, useWindowDimensions, View, Text, TextInput, Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Crypto from "expo-crypto";
import { useState } from "react";
import { Flashcard } from "../../models/StudyScreen";


type Props = {
    onConfirm: (card: Flashcard) => void;
}

export default function AddCardButton({ onConfirm }: Props) {
    const [visible, setVisible] = useState(false);
    const [frontText, setFrontText] = useState("");
    const [backText, setBackText] = useState("");
    const [frontHeight, setFrontHeight] = useState(60);
    const [backHeight, setBackHeight] = useState(80);

    const { width } = useWindowDimensions();
    const iconSize = width * 0.08

    function onRequestCloseAddCardPopup(){
        setVisible(false);
        setFrontText("");
        setBackText("");
        setBackHeight(80);
        setFrontHeight(60);
    }

    return (
        <View style={styles.container}>
            {/* Add Button*/}
            <Pressable onPress={() => setVisible(true)} style={styles.addButton} >
                <Ionicons name="add-circle-outline" size={iconSize} color="black" />
            </Pressable>

            {/* Add Card Popup*/}
            <Modal transparent visible={visible} animationType="fade">
                <View style={styles.overlay}>
                    <Pressable style={StyleSheet.absoluteFill} onPress={() => onRequestCloseAddCardPopup} />

                    <View style={styles.popup}>
                        <Text style={styles.headerText}>Add Card</Text>
                        <Text style={styles.questionText}> Question: </Text>
                        <TextInput
                            value={frontText}
                            onChangeText={setFrontText}
                            placeholder="Question"
                            multiline
                            onContentSizeChange={(e) =>
                                setFrontHeight(e.nativeEvent.contentSize.height)
                            }
                            maxLength={250}
                            style={[styles.questionTextBox, { height: frontHeight }]}
                        />
                        <Text style={styles.answerText}>Answer: </Text>
                        <TextInput
                            value={backText}
                            onChangeText={setBackText}
                            placeholder="Answer"
                            multiline
                            onContentSizeChange={(e) =>
                                setBackHeight(e.nativeEvent.contentSize.height)
                            }
                            maxLength={350}
                            style={[styles.answerTextBox, { height: backHeight }]}
                        />

                        <Pressable style={styles.confirmButton}
                            onPress={() => {
                                const card: Flashcard = {
                                    id: Crypto.randomUUID(),
                                    front: frontText,
                                    back: backText,
                                };
                                onConfirm(card);
                                onRequestCloseAddCardPopup();
                            }}
                        >
                            <Text>Confirm</Text>
                        </Pressable>
                        <Pressable onPress={() => onRequestCloseAddCardPopup()} style={styles.cancelButton}>
                            <Text>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal >
        </View>


    )
}

const styles = StyleSheet.create({
    //Container style
    container: {
        position: "absolute",
        bottom: 0,
        right: 0,
    },
    //Add button style
    addButton: {
        position: "absolute",
        bottom: 15,
        right: 15,
    },

    //Add card styles
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
        paddingBottom: 120,
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

    questionText: {
        marginTop: 40,
        textAlign: "left"
    },

    answerText: {
        marginTop: 12,
        textAlign: "left"
    },

    questionTextBox: {
        width: "100%",
        borderWidth: 2,
        borderRadius: 4,
        padding: 12,
        minHeight: 60,
        textAlignVertical: "top",
    },

    answerTextBox: {
        width: "100%",
        borderWidth: 2,
        borderRadius: 4,
        padding: 12,
        minHeight: 80,
        textAlignVertical: "top",
    },
})