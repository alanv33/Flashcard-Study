import { useState } from 'react';
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FlashcardView from "../components/FlashcardView"
import DeleteButton from "../components/DeleteButton";
import AddButton from '../components/AddButton';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DeletePopup from '../components/DeletePopup';
import AddPopup from '../components/AddPopup';
import { useDeck } from '../hooks/useDeck';
import { Flashcard } from '../models';

export default function StudyScreen() {
  const {deleteCard, addCard, cards, error, loading} = useDeck("1");
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

  function onCancelAddDialog(){
    setShowAddDialog(false);
  }

  function onConfirmAddDialog(card: Flashcard){
    addCard(card);
    setShowAddDialog(false);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.areaView}>
        <FlashcardView index={index} setIndex={setIndex} error={error} loading={loading} cards={cards}/>
        <DeleteButton setShowDialog={setShowDeleteDiaglog}/>
        <AddButton setShowDialog={setShowAddDialog}/>
      </SafeAreaView>

      {showDeleteDialog? <DeletePopup visible={showDeleteDialog} onCancel={onCancelDeleteDialog} onConfirm={onConfirmDeleteDialog}/> : null}

      {showAddDialog? <AddPopup visible={showAddDialog} onCancel={onCancelAddDialog} onConfirm={onConfirmAddDialog}/> : null}
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
