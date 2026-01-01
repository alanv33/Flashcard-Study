import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import type { Deck, Flashcard } from "../models/StudyScreen";

export function useDeck(deckId: string) {
    const [deck, setDeck] = useState<Deck | null>(null);
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function loadDeck() {
        try {
            setLoading(true);
            setError(null);
            let resolvedDeck: Deck;
            const value = await AsyncStorage.getItem(deckId);
            if (value === null) {
                resolvedDeck = {
                    id: deckId,
                    cards: []
                };
            } else {
                resolvedDeck = JSON.parse(value!) as Deck;
            }

            setDeck(resolvedDeck);
            setCards(resolvedDeck.cards);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Unknown error");
            console.log(e instanceof Error ? e.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    }

    function addCard(card: Flashcard) {
        setCards(prev => {
            const nextCards = [...prev, card];

            const nextDeck: Deck = {
                id: deckId,
                cards: nextCards,
                name: deck?.name,
            };

            setDeck(nextDeck);

            void AsyncStorage.setItem(deckId, JSON.stringify(nextDeck));

            return nextCards;
        });
    }

    function updateCard(updated: Flashcard) {
        setCards(prev => {
            const nextCards = prev.map(c => (c.id === updated.id ? updated : c));

            const nextDeck: Deck = {
                id: deckId,
                cards: nextCards,
                name: deck?.name
            };

            setDeck(nextDeck);

            void AsyncStorage.setItem(deckId, JSON.stringify(nextDeck));
            return nextCards;
        });
    }

    function deleteCard(card: Flashcard) {
        let cardId: string = card.id;
        setCards(prev => {
            const nextCards = prev.filter(c => c.id !== cardId);
            const nextDeck: Deck = {
                id: deckId,
                cards: nextCards,
                name: deck?.name
            }
            setDeck(nextDeck);

            void AsyncStorage.setItem(deckId, JSON.stringify(nextDeck));
            return nextCards;
        });
    }

    function resetDeck() {
        setDeck(null);
        setCards([]);
        setLoading(false);
        setError(null);
        void AsyncStorage.removeItem(deckId);
    }

    useEffect(() => {
        loadDeck();
    }, [deckId]);

    return {
        deck,
        cards,
        loading,
        error,
        loadDeck,
        addCard,
        updateCard,
        deleteCard,
        resetDeck,
    };
}
