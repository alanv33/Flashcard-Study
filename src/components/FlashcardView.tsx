import { useState } from "react";
import { useDeck } from "../hooks/useDeck";
import { SwipeableFlashcard } from "./SwipableFlashCard";
import { Flashcard } from "../models";

type Props = {
  cards: Flashcard [],
  error: string | null,
  loading: boolean,
  index: number;
  setIndex: (updater: (prev: number) => number) => void;
};

export default function FlashcardView({ cards, error, loading, index, setIndex }: Props) {
  const [showBack, setShowBack] = useState(false);

  let message: string | null = null;

  if (loading) {
    message = "Loading...";
  } else if (error) {
    message = "An error has occurred";
  } else if (cards.length === 0) {
    message = "No cards yet";
  } else if (index >= cards.length) {
    message = "No card at this index";
  }

  function goNext() {
    setIndex(prev => (prev >= cards.length - 1 ? prev : prev + 1));
    setShowBack(false);
  }

  function goPrev() {
    setIndex(prev => (prev <= 0 ? prev : prev - 1));
    setShowBack(false);
  }

  const currentCard = cards[index];
  const displayText =
    message !== null
      ? message
      : showBack
        ? currentCard.back
        : currentCard.front;

  return (
    <SwipeableFlashcard
      text={displayText}
      onPress={() => setShowBack(prev => !prev)}
      onSwipeLeft={goNext}
      onSwipeRight={goPrev}
    />
  );
}
