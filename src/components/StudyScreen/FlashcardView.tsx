import { useEffect } from "react";
import { Pressable, View, Text, StyleSheet, useWindowDimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Flashcard } from "../../models/StudyScreen";

type Props = {
  card: Flashcard | null;
  error: string | null;
  loading: boolean;
};

export default function FlashcardView({ card, error, loading }: Props) {
  const { width, height } = useWindowDimensions();
  const rot = useSharedValue(0);

  useEffect(() => {
    rot.value = 0;
  }, [card?.id]);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${rot.value}deg` }],
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${rot.value + 180}deg` }],
  }));

  function onPress() {
    if (!card || loading || error) return;
    rot.value = withTiming(rot.value === 0 ? 180 : 0, { duration: 220 });
  }

  return (
    <View style={[styles.container, { width}]}>
      <Pressable onPress={onPress} style={styles.pressArea}>
        <View style={[styles.card, {minHeight: height* 0.4}]}>
          <Animated.View style={[styles.face, frontStyle]}>
            <Text style={styles.text}>{card?.front ?? "This deck is empty"}</Text>
          </Animated.View>

          <Animated.View style={[styles.face, backStyle]}>
            <Text style={styles.text}>{card?.back ?? ""}</Text>
          </Animated.View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  pressArea: {
    flex: 1,
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: "100%",
    flex: 1,
    maxWidth: 500
  },

  face: {
    ...StyleSheet.absoluteFillObject,
    backfaceVisibility: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "lightblue",
  },

  text: {
    fontWeight: "500",
    textAlign: "center",
    width: "85%",
  },
});
