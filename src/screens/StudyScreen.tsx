import { useState } from 'react';
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.areaView}>
        <FlashcardView index={index} setIndex={setIndex} error={error} loading={loading} cards={cards} />
        <DeleteButton onConfirm={onConfirmDeleteDialog} />
        <AddCardButton onConfirm={onConfirmAddDialog} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  areaView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

})
