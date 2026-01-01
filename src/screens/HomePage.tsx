import { SafeAreaView } from "react-native-safe-area-context";
import DeckIcon from "../components/HomePage/DeckIcon"
import { getAllDecks, DeckSummary, saveDeck } from "../storage/deckStorage";
import { FlatList } from "react-native";
import { useState, useEffect } from "react";
import AddDeckButton from "../components/HomePage/AddDeckButton"
import { Deck } from "../models/StudyScreen";
import { deleteDeck as deleteDeckFromStorage, renameDeck } from "@/src/storage/deckStorage";

export default function HomePage() {
    const [decks, setDecks] = useState<DeckSummary[]>([]);

    useEffect(() => {
        async function getDecks() {
            const value = await getAllDecks();
            setDecks(value);
        }
        getDecks();
    }, []);

    async function onConfirmAddDialog(deck: Deck) {
        await saveDeck(deck);
        const newDeckSummary: DeckSummary = {
            id: deck.id,
            name: deck.name,
            updatedAt: Date.now()
        };

        setDecks(prev => [...prev, newDeckSummary]);

    }

    async function onDeleteDeck(deckId: string) {
        await deleteDeckFromStorage(deckId);
        setDecks(prev => prev.filter(d => d.id !== deckId));
    }

    async function onRenameDeck(deckId: string, deckName: string) {
        await renameDeck(deckId, deckName);
        setDecks(prev => prev.map(d => (d.id === deckId ? { ...d, name: deckName } : d)));
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList data={decks} renderItem={({ item }) => (<DeckIcon deckId={item.id} deckName={item.name} onDelete={onDeleteDeck} onRename={onRenameDeck} />)} />
            <AddDeckButton onConfirm={onConfirmAddDialog} />
        </SafeAreaView>

    );
}