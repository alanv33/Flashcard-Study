import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';

type Props={
    setShowDialog: (value: boolean) => void
}

export default function DeleteButton({setShowDialog }:  Props ) {
    const { width } = useWindowDimensions();
    const iconSize = width * 0.1
    return (
        <Pressable onPress={() => setShowDialog(true)} style={styles.deleteButton}>
            <EvilIcons name="trash" size={iconSize} color="black"/>
        </Pressable>
        
    );
}

const styles = StyleSheet.create({
    deleteButton: {
        position: "absolute",
        bottom: 0,
        left: 1,
    }
})
