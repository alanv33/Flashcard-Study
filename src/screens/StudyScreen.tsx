import { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, View, NativeScrollEvent, NativeSyntheticEvent, Pressable, useWindowDimensions, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from '@expo/vector-icons/EvilIcons';

import AddCardButton from "../components/StudyScreen/AddCardButton";
import DeleteButton from "../components/StudyScreen/DeleteButton";
import FlashcardView from "../components/StudyScreen/FlashcardView";
import { useDeck } from "../hooks/useDeck";
import type { Flashcard } from "../models/StudyScreen";

export default function StudyScreen({ deckId }: { deckId: string }) {
  const { deleteCard, addCard, cards, error, loading } = useDeck(deckId);

  const [index, setIndex] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);

  const { width } = useWindowDimensions();
  const iconSize = width * 0.1

  const currentLocation = `${cards.length === 0 ? 0 : index + 1} / ${cards.length}`;


  // Keep index valid when cards length changes (delete, add, load)
  useEffect(() => {
    setIndex((i) => Math.max(0, Math.min(i, Math.max(0, cards.length - 1))));
  }, [cards.length]);

  // Make a placeholder "page" when the deck is empty
  const data = useMemo<(Flashcard | null)[]>(
    () => (cards.length === 0 ? [null] : cards),
    [cards]
  );

  const listRef = useRef<FlatList<Flashcard | null>>(null);

  function onConfirmDeleteDialog() {
    const c = cards[index];
    if (!c) return;
    deleteCard(c);
  }

  function onConfirmAddDialog(card: Flashcard) {
    addCard(card);
  }

  function handleMomentumEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    if (pageWidth <= 0) return;
    const x = e.nativeEvent.contentOffset.x;
    setIndex(Math.round(x / pageWidth));
  }

  function goTo(i: number) {
    const clamped = Math.max(0, Math.min(i, data.length - 1));
    setIndex(clamped);
    listRef.current?.scrollToOffset({ offset: clamped * pageWidth, animated: true });
  }

  return (
    <SafeAreaView style={styles.areaView}>
      <View
        style={styles.pagerContainer}
        onLayout={(e) => setPageWidth(e.nativeEvent.layout.width)}
      >
        {pageWidth > 0 && (
          <FlatList
            ref={listRef}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={data}
            keyExtractor={(item, i) => (item ? item.id : `empty-${i}`)}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={pageWidth}
            snapToAlignment="start"
            decelerationRate="fast"
            disableIntervalMomentum
            renderItem={({ item }) => (
              <FlashcardView
                card={item}
                error={error}
                loading={loading}
                pageWidth={pageWidth}
              />
            )}
            onMomentumScrollEnd={handleMomentumEnd}
          />
        )}
        <View style={styles.cardCount}>
          <Pressable onPress={() => goTo(index - 1)} style={{marginRight: 1}}>
            <EvilIcons name="arrow-left" size={Math.min(iconSize, 40)} color="black" />
          </Pressable>
          <Text> {currentLocation}</Text>
          <Pressable onPress={() => goTo(index + 1)} style={{marginLeft: 1}}>
            <EvilIcons name="arrow-right" size={Math.min(iconSize, 40)} color="black" />
          </Pressable>
        </View>
      </View>
      <DeleteButton onConfirm={onConfirmDeleteDialog} iconSize={iconSize} />
      <AddCardButton onConfirm={onConfirmAddDialog} iconSize={iconSize} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaView: {
    flex: 1,
    width: "100%",
  },
  pagerContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 100,
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },

  cardCount: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: -100
  }
});
