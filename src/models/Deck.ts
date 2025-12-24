import { Flashcard } from "./Flashcard";

export type Deck = {
    id : string;
    name? : string;
    cards : Flashcard [];
};