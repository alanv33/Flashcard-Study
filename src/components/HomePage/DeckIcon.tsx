import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import { Link } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import OptionsMenu from "./OptionsMenu"


type Props = {
    deckId: string;
    deckName?: string;
    onDelete: (deckId: string) => void;
    onRename: (deckId: string, deckName: string) => void;
}

export default function DeckIcon({ deckId, deckName, onDelete, onRename }: Props) {
    const { width } = useWindowDimensions();
    const iconSize = width * 0.1
    const fontSize = width * .06

    return (
        <View style={styles.container}>
            <Link href={`/study/${deckId}`} asChild>
                <Pressable style={styles.link}>
                    <MaterialCommunityIcons name="cards-outline" size={iconSize} color="black" style={styles.icon} />
                    <View style={styles.divder} />
                    <View style={styles.namePosition}>
                        <Text style={[styles.name, { fontSize: fontSize }]}>{deckName}</Text>
                    </View>
                </Pressable>
            </Link>
            <OptionsMenu deckId={deckId} onDelete={onDelete} onRename={onRename} />
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        borderRadius: 8,
        borderWidth: 2,
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
        marginBottom: 10
    },

    namePosition: {
        marginLeft: 5,
        width: "80%"
    },

    name: {
        fontWeight: "bold",
    },

    divder: {
        width: 2,
        height: "60%",
        backgroundColor: "#5e5e5eff",
        marginHorizontal: 8,
    },

    icon: {
        marginLeft: 5,
    },

    link: {
        height: "100%",
        width: "85%",
        flexDirection: "row",
        alignItems: "center",
    },

})