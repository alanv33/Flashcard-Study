import StudyScreen from "@/src/screens/StudyScreen";
import { Stack, useLocalSearchParams } from "expo-router";
import { useDeck } from "@/src/hooks/useDeck";


export default function StudyRoute() {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  if (!deckId) return null;
  const { deck } = useDeck(deckId);

  return (
    <>
      <Stack.Screen options={{ title: deck?.name ?? deckId }}/>
      <StudyScreen deckId={deckId} />
    </>
  );
}