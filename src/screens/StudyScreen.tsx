import { useState } from 'react';
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import AddCardButton from '../components/StudyScreen/AddCardButton';
import AddPopup from '../components/StudyScreen/AddCardPopup';
import DeleteButton from "../components/StudyScreen/DeleteButton";
import DeletePopup from '../components/StudyScreen/DeletePopup';
import FlashcardView from "../components/StudyScreen/FlashcardView";
import { useDeck } from '../hooks/useDeck';
import { Flashcard } from '../models/StudyScreen';

export default function StudyScreen({deckId} : {deckId: string}) {
  const { deleteCard, addCard, cards, error, loading } = useDeck(deckId);
  const [index, setIndex] = useState(0);
  const [showDeleteDialog, setShowDeleteDiaglog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  function onCancelDeleteDialog() {
    setShowDeleteDiaglog(false);
  }

  function onConfirmDeleteDialog() {
    deleteCard(cards[index]);
    setShowDeleteDiaglog(false);
  }

  function onCancelAddDialog() {
    setShowAddDialog(false);
  }

  function onConfirmAddDialog(card: Flashcard) {
    addCard(card);
    setShowAddDialog(false);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.areaView}>
        <FlashcardView index={index} setIndex={setIndex} error={error} loading={loading} cards={cards} />
        <DeleteButton setShowDialog={setShowDeleteDiaglog} />
        <AddCardButton setShowDialog={setShowAddDialog} />
      </SafeAreaView>

      {showDeleteDialog ? <DeletePopup visible={showDeleteDialog} onCancel={onCancelDeleteDialog} onConfirm={onConfirmDeleteDialog} /> : null}

      {showAddDialog ? <AddPopup visible={showAddDialog} onCancel={onCancelAddDialog} onConfirm={onConfirmAddDialog} /> : null}
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
