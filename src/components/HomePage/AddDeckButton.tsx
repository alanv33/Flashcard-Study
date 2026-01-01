import { StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';



type Props={
    setShowDialog: (value: boolean) => void
}

export default function AddDeckButton({ setShowDialog }: Props) {
    const { width } = useWindowDimensions();
    const iconSize = width * 0.08

    return (
        <Pressable onPress={()=>setShowDialog(true)} style={styles.addButton} > 
             <Ionicons name="add-circle-outline" size={iconSize} color="black"/>
        </Pressable>
       
    )
}

const styles = StyleSheet.create({
    addButton: {
        position: "absolute",
        bottom: 10,
        right: 15,
    }
})