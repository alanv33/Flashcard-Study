import { useState } from 'react';
import { StyleSheet, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddCardButton from '../components/StudyScreen/AddCardButton';
import DeleteButton from "../components/StudyScreen/DeleteButton";
import FlashcardView from "../components/StudyScreen/FlashcardView";
import { useDeck } from '../hooks/useDeck';
import { Flashcard } from '../models/StudyScreen';

export default function StudyScreen({ deckId }: { deckId: string }) {
  const { deleteCard, addCard, cards, error, loading } = useDeck(deckId);
  const [index, setIndex] = useState(0);

  // When user clicks confirm to delete a card
  function onConfirmDeleteDialog() {
    deleteCard(cards[index]);
  }
  // When user clicks confirm to add a card
  function onConfirmAddDialog(card: Flashcard) {
    addCard(card);
  }

  return (
    <SafeAreaView style={styles.areaView}>
      <View style={{ height: "70%", width: "100%", paddingTop: 130, alignItems: "center" }}>
        <FlatList
          style={{flex: 1}}
          data={cards}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <FlashcardView
              card={item}
              error={error}
              loading={loading}
            />
          )}
          ListEmptyComponent={
            <FlashcardView card={null} error={error} loading={loading} />
          }
          onMomentumScrollEnd={(e) => {
            const newIndex = Math.round(
              e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
            );
            setIndex(newIndex);
          }}
        />
      </View>
      <DeleteButton onConfirm={onConfirmDeleteDialog} />
      <AddCardButton onConfirm={onConfirmAddDialog} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },

})
