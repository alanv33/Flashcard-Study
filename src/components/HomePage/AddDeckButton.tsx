import { StyleSheet, Pressable, useWindowDimensions, Modal, Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Crypto from "expo-crypto";
import { useState } from "react";
import { Deck } from "../../models/StudyScreen";

type Props = {
    onConfirm: (deck: Deck) => void;
}

export default function AddDeckButton({ onConfirm }: Props) {
    const { width } = useWindowDimensions();
    const iconSize = width * 0.08

    const [visible, setVisible] = useState(false);
    const [deckName, setDeckName] = useState("");
    const [height, setHeight] = useState(0);

    return (
        <View>
            {/*Add button*/}
            <Pressable onPress={() => setVisible(true)} style={styles.addButton} >
                <Ionicons name="add-circle-outline" size={iconSize} color="black" />
            </Pressable>

            {/*Add deck popup*/}
            <Modal transparent visible={visible} animationType="fade">
                <View style={styles.overlay}>
                    <Pressable style={StyleSheet.absoluteFill} onPress={() => { setVisible(false); setDeckName("") }} />

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
                                    name: deckName,
                                    cards: []
                                };
                                onConfirm(deck);
                                setVisible(false);
                                setDeckName("");
                            }}
                        >
                            <Text>Confirm</Text>
                        </Pressable>
                        <Pressable onPress={() => { setVisible(false); setDeckName("") }} style={styles.cancelButton}>
                            <Text>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal >
        </View>


    )
}

const styles = StyleSheet.create({
    //Add button style
    addButton: {
        position: "absolute",
        bottom: 10,
        right: 15,
    },

    //Popup Styles
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
})