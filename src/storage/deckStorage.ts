import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Deck } from "../models/StudyScreen/Deck";

const DECK_INDEX_KEY = "decks:index";

export type DeckSummary = {
  id: string;
  name?: string;
  updatedAt?: number;
};

export async function getAllDecks(): Promise<DeckSummary[]> {
  const value = await AsyncStorage.getItem(DECK_INDEX_KEY);
  if (!value) return [];
  return JSON.parse(value);
}

async function saveDeckIndex(index: DeckSummary[]): Promise<void> {
  await AsyncStorage.setItem(DECK_INDEX_KEY, JSON.stringify(index));
}

export async function getDeck(id: string): Promise<Deck | null> {
  const value = await AsyncStorage.getItem(id);
  if (!value) return null;
  return JSON.parse(value);
}

export async function saveDeck(deck: Deck): Promise<void> {
  const index = await getAllDecks();

  const summary: DeckSummary = {
    id: deck.id,
    name: deck.name,
    updatedAt: Date.now(),
  };

  const nextIndex = [
    ...index.filter(d => d.id !== deck.id),
    summary,
  ];

  await Promise.all([
    AsyncStorage.setItem(deck.id, JSON.stringify(deck)),
    saveDeckIndex(nextIndex),
  ]);
}

export async function renameDeck(id: string, newName: string): Promise<void> {
  const value = await AsyncStorage.getItem(id);
  if (!value) return;
  const oldDeck = JSON.parse(value) as Deck;
  const newDeck: Deck = { ...oldDeck, name: newName };
  await saveDeck(newDeck);

}

export async function deleteDeck(id: string): Promise<void> {
  const index = await getAllDecks();
  const nextIndex = index.filter(d => d.id !== id);

  await Promise.all([
    AsyncStorage.removeItem(id),
    saveDeckIndex(nextIndex),
  ]);
}

export async function clearAllDecks(): Promise<void> {
  const index = await getAllDecks();
  const keys = index.map(d => d.id);
  await AsyncStorage.multiRemove([DECK_INDEX_KEY, ...keys]);
}
