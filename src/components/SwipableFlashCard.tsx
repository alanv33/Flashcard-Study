import { Pressable, Text, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from "react-native-reanimated";

type Props = {
    text: string;
    onPress: () => void;
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
};

export function SwipeableFlashcard({ text, onPress, onSwipeLeft, onSwipeRight }: Props) {
    const translateX = useSharedValue(0);

    const swipeThreshold = 80;

    const pan = Gesture.Pan()
        .onUpdate((e) => {
            translateX.value = e.translationX;
        })
        .onEnd(() => {
            const x = translateX.value;

            if (x <= -swipeThreshold) {
                runOnJS(onSwipeLeft)();
            } else if (x >= swipeThreshold) {
                runOnJS(onSwipeRight)();
            }

            translateX.value = withSpring(0);
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <GestureDetector gesture={pan}>
            <Animated.View style={[styles.flashCard, animatedStyle]}>
                <Pressable onPress={onPress} style={[styles.pressArea, StyleSheet.absoluteFill]}>
                    <Text style={styles.text}>{text}</Text>
                </Pressable>
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    flashCard: {
        alignItems: "center",
        justifyContent: "center",
        flex: .5,
        width: "80%",
        backgroundColor: "lightblue",
    },
    pressArea: {
        alignItems: "center",
        justifyContent: "center",
        flex:1
    },
    text: {
        fontWeight: "bold",
        textAlign: "center",
    },
});
