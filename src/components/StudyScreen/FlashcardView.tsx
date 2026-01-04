import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import type { Flashcard } from "../../models/StudyScreen";

type Props = {
  card: Flashcard | null;
  error: string | null;
  loading: boolean;
  pageWidth: number;
};

export default function FlashcardView({ card, error, loading, pageWidth }: Props) {
  const { height } = useWindowDimensions();

  const rot = useSharedValue(0);

  useEffect(() => {
    // reset rotation when card changes
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
    rot.value = withTiming(rot.value === 0 ? 180 : 0, { duration: 350 });
  }

  // Display rules
  const frontText =
    error ? error : loading ? "Loading..." : card?.front ?? "This deck is empty";
  const backText = card?.back ?? "";

  // font sizing based on page width so it behaves on web too
  const fontSize = Math.min(pageWidth * 0.045, 28);

  return (
    <View style={[styles.page, { width: pageWidth }]}>
      <Pressable onPress={onPress} style={styles.pressArea}>
        {/* Card box */}
        <View style={[styles.card, { minHeight: Math.min(1000, height * 0.45) }]}>
          {/* Front face */}
          <Animated.View style={[styles.face, frontStyle]}>
            <Text style={[styles.text, { fontSize }]}>{frontText}</Text>
          </Animated.View>

          {/* Back face */}
          <Animated.View style={[styles.face, backStyle]}>
            <Text style={[styles.text, { fontSize }]}>{backText}</Text>
          </Animated.View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  pressArea: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  card: {
    width: "95%",
    maxWidth: 500,
  },
  face: {
    ...StyleSheet.absoluteFillObject,
    backfaceVisibility: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: "lightblue",
    padding: 16,
  },
  text: {
    fontWeight: "500",
    textAlign: "center",
    width: "100%",
  },
});
