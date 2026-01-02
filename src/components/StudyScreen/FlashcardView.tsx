import { useState, useEffect } from "react";
import { Pressable, View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Flashcard } from "../../models/StudyScreen";

type Props = {
  card: Flashcard | null,
  error: string | null,
  loading: boolean,
};

export default function FlashcardView({ card, error, loading }: Props) {
  const { width, height } = useWindowDimensions();
  const [showBack, setShowBack] = useState(false);

  // reset flip when card changes
  useEffect(() => setShowBack(false), [card?.id]);

  const displayText =
    error ? error :
      loading ? "Loading..." :
      card === null ? "This deck is empty" :
        showBack ? card.back : card.front;

  return (
    <View style={[styles.flashCard, {width: width}]}>
      <Pressable
        style={styles.pressArea}
        onPress={() => setShowBack(v => !v)}
      >
        <Text style={styles.text}>{displayText}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  flashCard: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  pressArea: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
    width: "85%",
    borderWidth: 2,
    height: "100%"
  },
  text: {
    fontWeight: 500,
    textAlign: "center",
    width: "85%"
  },
});
